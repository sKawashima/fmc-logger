import { LoginButton, LogoutButton } from '@/components/molecules/LoginButton'
import { makeTodaysScramble } from '@/services/scramble'
import { getUser } from '@/services/user'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUser()
  if (user && !user.showId) redirect('/user/setId')

  const todayScramble = await makeTodaysScramble()

  return (
    <div>
      <p className="text-3xl font-bold underline">
        hello{' '}
        {user ? (
          <Link href={`/user/${user.showId}`}>{user.name}</Link>
        ) : (
          'world'
        )}
      </p>
      <Button>Test</Button>
      {user ? <LogoutButton /> : <LoginButton />}
      <Link href={`/scramble/${todayScramble.id}`}>Todays Scramble</Link>
    </div>
  )
}
