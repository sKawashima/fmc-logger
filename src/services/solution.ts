//@ts-ignore
import cubejs from 'cubejs'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import prisma from '@/lib/prisma'

export const makeSolution = async (
  userEmail: string,
  scrambleId: number,
  userSolution: string,
  comment?: string,
) => {
  if (!scrambleId) return null

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
  const normalizedSolution = cubeNotationNormalizer(userSolution)

  cube.move(scramble)
  cube.move(normalizedSolution)

  const isSolved = cube.isSolved()
  if (!isSolved) return null

  const userSolutionCount = normalizedSolution.split(' ').length
  return userSolutionCount
}

export const getSolution = async (scrambleId: number, userEmail: string) => {
  const solution = await prisma.solution.findFirst({
    where: {
      scrambleId: Number(scrambleId),
      user: {
        email: userEmail,
      },
    },
  })

  return solution
}

export const scoreToText = (score: number | null) => {
  return score ? score : 'DNF'
}

export const getSolutionsFromUserShowId = async (showId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      showId,
    },
  })
  if (!user) return null

  const solutions = await prisma.solution.findMany({
    where: {
      userId: user.id,
    },
  })
  return solutions
}

export const getAllSolutionsForScramble = async (scrambleId: number) => {
  const solutions = await prisma.solution.findMany({
    where: {
      scrambleId: Number(scrambleId),
    },
    include: {
      user: {
        select: {
          showId: true,
          email: true,
        },
      },
    },
    orderBy: [{ score: 'asc' }, { createdAt: 'asc' }],
  })
  return solutions
}
