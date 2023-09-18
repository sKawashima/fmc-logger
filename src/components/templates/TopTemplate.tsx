import { makeTodaysScramble } from '@/services/scramble'
import { TopTodayScrambleSection } from '../organisms/TopTodayScrambleSection'

export const TopTemplate = async () => {
  const todayScramble = await makeTodaysScramble()

  return (
    <>
      <TopTodayScrambleSection linkUrl={`/scramble/${todayScramble.id}`} />
    </>
  )
}
