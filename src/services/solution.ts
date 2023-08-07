import { PrismaClient } from '@prisma/client'

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
    },
  })
  return solution
}
