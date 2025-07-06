'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { FormInputSolutionAnswer } from './FormInputSolutionAnswer'

export function ShowScrambleSection({
  scramble,
  scrambleId,
}: {
  scramble: string
  scrambleId: number
}) {
  const [showScramble, setShowScramble] = useState(false)

  if (!showScramble) {
    return (
      <div className="text-center py-8">
        <Button
          color="primary"
          variant="solid"
          size="lg"
          onPress={() => setShowScramble(true)}
        >
          スクランブルを表示
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          ボタンを押すとスクランブルが表示され、挑戦を開始できます
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">スクランブル</h3>
        <p className="font-mono text-lg bg-gray-50 p-4 rounded-lg">
          {scramble}
        </p>
      </div>
      <FormInputSolutionAnswer scrambleId={scrambleId} />
    </div>
  )
}
