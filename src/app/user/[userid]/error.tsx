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
    console.error('User page error:', error)
  }, [error])

  return (
    <div className="p-8">
      <Alert
        color="danger"
        variant="solid"
        title="ユーザー情報の読み込みに失敗しました"
        description="ユーザーデータの取得中にエラーが発生しました。ユーザーが存在しないか、アクセス権限がない可能性があります。"
        className="mb-6"
      />
      <div className="flex gap-4">
        <Button color="danger" variant="solid" onClick={() => reset()}>
          再試行
        </Button>
        <Button
          color="default"
          variant="bordered"
          onClick={() => (window.location.href = '/')}
        >
          ホームに戻る
        </Button>
      </div>
    </div>
  )
}
