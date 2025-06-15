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
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-[50vh] p-major-4">
      <div className="max-w-major-60">
        <div className="alert-danger mb-major-2">
          <h3 className="font-medium text-red-700 mb-2">
            エラーが発生しました
          </h3>
          <p className="text-red-700">
            申し訳ございませんが、予期しないエラーが発生しました。
            しばらくしてから再度お試しください。
          </p>
        </div>
        <button className="btn-danger" onClick={() => reset()}>
          再試行
        </button>
      </div>
    </div>
  )
}
