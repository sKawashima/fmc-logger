'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { FormInputSolutionAnswer } from './FormInputSolutionAnswer'

export function ShowScrambleSection({
  scramble,
  scrambleId,
}: {
  scramble: string
  scrambleId: number
}) {
  const [showScramble, setShowScramble] = useState(false)
  const t = useTranslations('challenge')

  if (!showScramble) {
    return (
      <div className="text-center py-8">
        <Button
          color="primary"
          variant="solid"
          size="lg"
          onPress={() => setShowScramble(true)}
        >
          {t('showScrambleButton')}
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          {t('showScrambleInstruction')}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">{t('scrambleTitle')}</h3>
        <p className="font-mono text-lg bg-gray-50 p-4 rounded-lg">
          {scramble}
        </p>
      </div>
      <FormInputSolutionAnswer scrambleId={scrambleId} />
    </div>
  )
}
