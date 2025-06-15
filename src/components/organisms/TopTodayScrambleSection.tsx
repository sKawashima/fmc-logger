'use client'

import { useRouter } from 'next/navigation'

type Props = {
  linkUrl: string
}

export const TopTodayScrambleSection = (props: Props) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center gap-major-2 mt-major-2 bg-white rounded-lg shadow-sm border border-gray-200 p-major-4">
      <h2 className="text-3xl font-bold text-gray-900">
        Let&rsquo;s Challenge Today&rsquo;s Scramble!
      </h2>
      <button
        onClick={() => router.push(props.linkUrl)}
        className="btn-primary text-lg px-6 py-3"
      >
        Challenge Today&rsquo;s Scramble
      </button>
    </div>
  )
}
