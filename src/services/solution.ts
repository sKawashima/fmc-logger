import { PrismaClient } from '@prisma/client'
//@ts-ignore
import cubejs from 'cubejs'
import cubeNotationNormalizer from 'cube-notation-normalizer'

export const makeSolution = async (
  userEmail: string,
  scrambleId: number,
  userSolution: string,
  comment?: string,
) => {
  if (!scrambleId) return null

  const prisma = new PrismaClient()
  const scramble = await prisma.scramble.findFirst({
    where: {
      id: Number(scrambleId),
    },
  })
  if (!scramble) return { message: 'No scramble' }

  const score = jadgeScore(userSolution, scramble.scramble)

  const solution = await prisma.solution.create({
    data: {
      scramble: {
        connect: {
          id: Number(scrambleId),
        },
      },
      user: {
        connect: {
          email: userEmail,
        },
      },
      solution: userSolution,
      comment,
      score,
    },
  })
  return solution
}

const jadgeScore = (userSolution: string, scramble: string) => {
  const cube = new cubejs()
  cube.move(scramble)
  cube.move(userSolution)

  const isSolved = cube.isSolved()
  if (!isSolved) return null

  const userSolutionCount =
    cubeNotationNormalizer(userSolution).split(' ').length
  return userSolutionCount
}