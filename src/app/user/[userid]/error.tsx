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
    console.error('User page error:', error)
  }, [error])

  return (
    <div className="p-major-4">
      <div className="alert-danger mb-major-3">
        <h3 className="font-medium text-danger-700 mb-2">
          ユーザー情報の読み込みに失敗しました
        </h3>
        <p className="text-danger-600">
          ユーザーデータの取得中にエラーが発生しました。
          ユーザーが存在しないか、アクセス権限がない可能性があります。
        </p>
      </div>
      <button className="btn-danger mr-major-2" onClick={() => reset()}>
        再試行
      </button>
      <button
        className="btn-secondary"
        onClick={() => (window.location.href = '/')}
      >
        ホームに戻る
      </button>
    </div>
  )
}
