import { LoginButton, LogoutButton } from '@/components/molecules/LoginButton'
import { authOptions } from '@/resources/options'
import { makeTodaysScramble } from '@/services/scramble'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  const todayScramble = await makeTodaysScramble()

  return (
    <div>
      <p>hello {user ? user?.name : 'world'}</p>
      {user ? <LogoutButton /> : <LoginButton />}
      <p>Todays Scramble: {todayScramble.scramble}</p>
      <Link href={`/scramble/${todayScramble.id}`}>Todays Scramble</Link>
    </div>
  )
}
