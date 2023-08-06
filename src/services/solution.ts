import { PrismaClient } from '@prisma/client'

export const makeSolution = async (
  userEmail: string,
  scrambleId: number,
  userSolution: string,
  comment?: string,
) => {
  if (!scrambleId) return null

  const prisma = new PrismaClient()
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
