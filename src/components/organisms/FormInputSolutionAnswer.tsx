'use client'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { createSolutionFromData } from '@/app/actions/solution'
import { Button, Chip, Textarea } from '@heroui/react'
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
        <Chip color="danger" variant="flat">
          {solutionError}
        </Chip>
      )}

      <form action={onSubmit}>
        <div className="space-y-4">
          <Textarea
            id="solution"
            name="solution"
            label="Solution"
            placeholder="解法を入力してください"
            minRows={4}
            isRequired
            isInvalid={!!solutionError}
          />

          <Textarea
            id="comment"
            name="comment"
            label="Comment"
            placeholder="コメント (任意)"
            minRows={2}
          />

          {pushError && (
            <Chip color="danger" variant="flat">
              {pushError}
            </Chip>
          )}

          <Button
            type="submit"
            color="primary"
            isLoading={isPending}
            isDisabled={isPending}
          >
            {isPending ? '送信中...' : '提出'}
          </Button>
        </div>
      </form>
    </div>
  )
}
