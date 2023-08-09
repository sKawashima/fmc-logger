import { authOptions } from '@/resources/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type CustomUser = {
  email?: string
  name?: string
  image?: string
  idForShow?: string
}

type User = {
  email: string
  name: string
  image?: string
  idForShow: string
}

export const getUser = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user as CustomUser

  if (!user) return null

  if (!user.email || !user.name) return null

  if (!user.idForShow) redirect('/user/setId')

  return user as User
}
