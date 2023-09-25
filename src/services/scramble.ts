import Scrambo from 'scrambo'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
const threeByThree = new Scrambo().type('333')
const createFmcScrambleToNormalScramble = () => {
  let scramble = threeByThree.get(1)[0]
  while (
    `R' U' F ${scramble} R' U' F`.length !==
    cubeNotationNormalizer(`R' U' F ${scramble} R' U' F`).length
  ) {
    scramble = threeByThree.get(1)[0]
  }
  return `R' U' F ${scramble} R' U' F`
}
export const makeTodaysScramble = async () => {
  const prisma = new PrismaClient()
  const todayScramble =
    (await prisma.scramble.findFirst({
      where: {
        createdAt: {
          gte: dayjs().startOf('day').toDate(),
          lt: dayjs().endOf('day').toDate(),
        },
      },
    })) ||
    (await prisma.scramble.create({
      data: {
        scramble: createFmcScrambleToNormalScramble(),
      },
    }))
  return todayScramble
}
export const getScramble = async (id: number) => {
  if (!id) return null
  const prisma = new PrismaClient()
  const scramble = await prisma.scramble.findFirst({
    where: {
      id: Number(id),
    },
  })
  return scramble
}
