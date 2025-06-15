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
    console.error('Scramble page error:', error)
  }, [error])

  return (
    <div className="p-major-4">
      <div className="alert-danger mb-major-3">
        <h3 className="font-medium text-danger-700 mb-2">
          スクランブルの読み込みに失敗しました
        </h3>
        <p className="text-danger-600">
          スクランブルデータの取得中にエラーが発生しました。
          ネットワーク接続を確認して、再度お試しください。
        </p>
      </div>
      <button className="btn-danger mr-major-2" onClick={() => reset()}>
        再試行
      </button>
      <button className="btn-secondary" onClick={() => window.history.back()}>
        戻る
      </button>
    </div>
  )
}
