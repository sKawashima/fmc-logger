import { authOptions } from '@/resources/options'
import { getServerSession } from 'next-auth'

type User = {
  email: string
  name: string
  image: string
  idForShow: string
}

export const getUser = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  if (!user.email || !user.name) return null

  return user as User
}
