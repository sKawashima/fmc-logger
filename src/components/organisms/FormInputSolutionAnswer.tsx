'use client'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { createSolutionFromData } from '@/app/actions/solution'
import { useState, useTransition } from 'react'

type Props = {
  scrambleId: number
}

export const FormInputSolutionAnswer = (props: Props) => {
  const [solutionError, setSolutionError] = useState<string | null>(null)
  const [pushError, setPushError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const onSubmit = async (formData: FormData) => {
    const solution = formData.get('solution') as string
    const comment = formData.get('comment') as string

    try {
      cubeNotationNormalizer(solution)
    } catch (e) {
      setSolutionError('回転記号が正しくありません')
      return
    }

    setSolutionError(null)
    setPushError(null)

    startTransition(async () => {
      try {
        await createSolutionFromData(props.scrambleId, solution, comment)
      } catch (error) {
        setPushError('送信に失敗しました')
      }
    })
  }

  return (
    <div className="space-y-4">
      {solutionError && (
        <div className="alert-danger">
          <p className="text-red-700 font-medium">{solutionError}</p>
        </div>
      )}

      <form action={onSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="solution"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Solution
            </label>
            <textarea
              id="solution"
              name="solution"
              placeholder="解法を入力してください"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                solutionError ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              required
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="コメント (任意)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={2}
            />
          </div>

          {pushError && (
            <div className="alert-danger">
              <p className="text-red-700 font-medium">{pushError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '送信中...' : '提出'}
          </button>
        </div>
      </form>
    </div>
  )
}
