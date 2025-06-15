'use client'

import { useEffect } from 'react'
import { Button, Alert } from '@heroui/react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Scramble page error:', error)
  }, [error])

  return (
    <div className="p-8">
      <Alert
        color="danger"
        variant="solid"
        title="スクランブルの読み込みに失敗しました"
        description="スクランブルデータの取得中にエラーが発生しました。ネットワーク接続を確認して、再度お試しください。"
        className="mb-6"
      />
      <div className="flex gap-4">
        <Button color="danger" variant="solid" onClick={() => reset()}>
          再試行
        </Button>
        <Button
          color="default"
          variant="bordered"
          onClick={() => window.history.back()}
        >
          戻る
        </Button>
      </div>
    </div>
  )
}
