'use client'

import { Button } from '@heroui/react'

export default function Error({
  errorInfo,
  reset,
}: {
  errorInfo: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
      <h2 className="text-xl font-semibold text-red-600">
        エラーが発生しました
      </h2>
      <p className="text-gray-600">
        チャレンジページの読み込み中にエラーが発生しました。
      </p>
      <Button variant="solid" color="primary" onClick={reset}>
        再試行
      </Button>
    </div>
  )
}