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
    console.error('Set ID page error:', error)
  }, [error])

  return (
    <div className="p-8">
      <Alert
        color="danger"
        variant="solid"
        title="ユーザーID設定でエラーが発生しました"
        description="ユーザーID設定の処理中にエラーが発生しました。再度お試しいただくか、しばらく時間をおいてからアクセスしてください。"
        className="mb-6"
      />
      <Button color="danger" variant="solid" onClick={() => reset()}>
        再試行
      </Button>
    </div>
  )
}
