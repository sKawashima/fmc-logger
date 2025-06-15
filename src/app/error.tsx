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
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-[50vh] p-8">
      <div className="max-w-lg">
        <Alert
          color="danger"
          variant="solid"
          title="エラーが発生しました"
          description="申し訳ございませんが、予期しないエラーが発生しました。しばらくしてから再度お試しください。"
          className="mb-4"
        />
        <Button color="danger" variant="solid" onClick={() => reset()}>
          再試行
        </Button>
      </div>
    </div>
  )
}
