import { LoginButton, LogoutButton } from '@/components/molecules/LoginButton'
import { authOptions } from '@/resources/options'
import { createFmcScrambleToNormalScramble } from '@/services/makeScramble'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div>
      <p>hello {user ? user?.name : 'world'}</p>
      {user ? <LogoutButton /> : <LoginButton />}
      <p>Scramble: {createFmcScrambleToNormalScramble()}</p>
    </div>
  )
}
