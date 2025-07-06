import { makeTodaysScramble } from '@/services/scramble'
import { TopTodayScrambleSection } from '../organisms/TopTodayScrambleSection'
import Image from 'next/image'
import imageCharacter from '../atoms/imageCharacter.png'

export const TopTemplate = async () => {
  const todayScramble = await makeTodaysScramble()

  return (
    <>
      <div className="flex justify-center">
        <div className="relative">
          <Image src={imageCharacter} alt="Character" width={400} />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
        </div>
      </div>
      <TopTodayScrambleSection linkUrl={`/scramble/${todayScramble.id}`} />
    </>
  )
}
