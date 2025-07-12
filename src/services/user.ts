import { authOptions } from '@/resources/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

type CustomUser = {
  email?: string
  name?: string
  image?: string
  showId?: string
}

export type User = {
  email: string
  name: string
  image?: string
  showId: string
}

export const getUser = async () => {
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

export const getUserFromShowId = async (showId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      showId,
    },
  })
  if (!user) {
    throw new Error(`User with showId ${showId} not found`)
  }
  return user as User
}
