import { makeTodaysScramble } from '@/services/scramble'
import Link from 'next/link'

export const TopTemplate = async () => {
  const todayScramble = await makeTodaysScramble()

  return (
    <div>
      <Link href={`/scramble/${todayScramble.id}`}>
        Challenge Today&rsquo;s Scramble
      </Link>
    </div>
  )
}
