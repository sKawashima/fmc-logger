'use client'

import { useEffect } from 'react'

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
    <div className="p-major-4">
      <div className="alert-danger mb-major-3">
        <h3 className="font-medium text-danger-700 mb-2">
          ユーザーID設定でエラーが発生しました
        </h3>
        <p className="text-danger-600">
          ユーザーID設定の処理中にエラーが発生しました。
          再度お試しいただくか、しばらく時間をおいてからアクセスしてください。
        </p>
      </div>
      <button className="btn-danger" onClick={() => reset()}>
        再試行
      </button>
    </div>
  )
}
