import { makeTodaysScramble } from '@/services/scramble'
import { TopTodayScrambleSection } from '../organisms/TopTodayScrambleSection'
import Image from 'next/image'
import imageCharacter from '../atoms/imageCharacter.png'

export const TopTemplate = async () => {
  const todayScramble = await makeTodaysScramble()

  return (
    <>
      <div className="flex justify-center">
        <Image src={imageCharacter} alt="Character" width={400} />
      </div>
      <TopTodayScrambleSection linkUrl={`/scramble/${todayScramble.id}`} />
    </>
  )
}
