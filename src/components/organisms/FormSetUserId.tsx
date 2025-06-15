'use client'

import { setUserShowIdFromData } from '@/app/actions/user'
import { useState, useTransition } from 'react'

export const FormUpdateUserShowId = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const onSubmit = async (formData: FormData) => {
    const showId = formData.get('showId') as string

    if (!showId) {
      setError('ユーザーIDを入力してください')
      return
    }

    setError(null)

    startTransition(async () => {
      try {
        await setUserShowIdFromData(showId)
        // リダイレクトはServer Action内で行われる
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('送信に失敗しました')
        }
      }
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <form action={onSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="showId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ユーザーID
            </label>
            <input
              id="showId"
              name="showId"
              type="text"
              placeholder="ユーザーIDを入力"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                error ? 'border-danger-500' : 'border-gray-300'
              }`}
              required
            />
            {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '設定中...' : '設定'}
          </button>
        </div>
      </form>
    </div>
  )
}
