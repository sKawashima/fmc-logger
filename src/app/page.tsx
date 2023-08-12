import { LoginButton, LogoutButton } from '@/components/molecules/LoginButton'
import { makeTodaysScramble } from '@/services/scramble'
import { getUser } from '@/services/user'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUser()
  if (user && !user.showId) redirect('/user/setId')

  const todayScramble = await makeTodaysScramble()

  return (
    <div>
      <p>hello {user ? user?.name : 'world'}</p>
      {user ? <LogoutButton /> : <LoginButton />}
      <Link href={`/scramble/${todayScramble.id}`}>Todays Scramble</Link>
    </div>
  )
}
