import { authOptions } from '@/resources/options'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export type CustomUser = {
  email?: string
  name?: string
  image?: string
  showId?: string
}

type User = {
  email: string
  name: string
  image?: string
  showId: string
}

export const getUser = async () => {
  const prisma = new PrismaClient()

  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.email) return null
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  return user as User
}

export const updateUserShowId = async (showId: string) => {
  const session = await getServerSession(authOptions)
  const user = session?.user as CustomUser
  if (!user) return null

  if (!user) redirect('/error')

  if (!user.email || !user.name) return null

  const prisma = new PrismaClient()
  const userForUpdate = (await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      showId,
    },
  })) as User

  if (!userForUpdate) return 'already exists'

  return userForUpdate
}
