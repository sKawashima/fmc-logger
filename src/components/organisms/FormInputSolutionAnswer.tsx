'use client'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { createSolutionFromData } from '@/app/actions/solution'
import { Button, Chip, Textarea } from '@heroui/react'
import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { User } from '@/services/user'

type Props = {
  scrambleId: number
  user: User | null
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      isDisabled={pending}
    >
      {pending ? '送信中...' : '提出'}
    </Button>
  )
}

type FormState = {
  message: string | null
  errors: {
    solution: string | null
    comment: string | null
  }
}

export const FormInputSolutionAnswer = (props: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [hasSubmittedAnonymously, setHasSubmittedAnonymously] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    // Check if anonymous user has already submitted for this scramble
    if (!props.user) {
      const submittedScrambles = JSON.parse(localStorage.getItem('anonymousSubmissions') || '[]')
      setHasSubmittedAnonymously(submittedScrambles.includes(props.scrambleId))
    }
  }, [props.user, props.scrambleId])

  const initialState: FormState = {
    message: null,
    errors: {
      solution: null,
      comment: null,
    },
  }

  const createSolutionWithId = async (
    _prevState: FormState,
    formData: FormData,
  ): Promise<FormState> => {
    const solution = formData.get('solution') as string
    const comment = formData.get('comment') as string

    try {
      cubeNotationNormalizer(solution)
    } catch (e) {
      return {
        message: null,
        errors: {
          solution: '回転記号が正しくありません',
          comment: null,
        },
      }
    }

    try {
      await createSolutionFromData(props.scrambleId, solution, comment)
      
      return {
        message: 'success',
        errors: {
          solution: null,
          comment: null,
        },
      }
    } catch (error) {
      return {
        message: '送信に失敗しました',
        errors: {
          solution: null,
          comment: null,
        },
      }
    }
  }

  const [state, formAction] = useFormState(createSolutionWithId, initialState)

  // Update localStorage when form submission succeeds
  useEffect(() => {
    if (state.message === 'success' && !props.user) {
      const submittedScrambles = JSON.parse(localStorage.getItem('anonymousSubmissions') || '[]')
      if (!submittedScrambles.includes(props.scrambleId)) {
        submittedScrambles.push(props.scrambleId)
        localStorage.setItem('anonymousSubmissions', JSON.stringify(submittedScrambles))
      }
      setHasSubmittedAnonymously(true)
    }
  }, [state.message, props.user, props.scrambleId])

  // Show success message for anonymous users who have already submitted
  if (!props.user && hasSubmittedAnonymously) {
    return (
      <div className="space-y-4">
        <Chip color="success" variant="flat">
          匿名ユーザーとして解答を送信しました
        </Chip>
        <p>匿名での投稿が完了しています。</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!props.user && (
        <Chip color="warning" variant="flat">
          匿名ユーザーとして投稿します
        </Chip>
      )}
      
      {state.errors.solution && (
        <Chip id="solution-error" color="danger" variant="flat">
          {state.errors.solution}
        </Chip>
      )}

      <form action={formAction}>
        <div className="space-y-4">
          <Textarea
            id="comment"
            name="comment"
            label="Comment"
            placeholder="コメント (任意)"
            minRows={isMobile ? 4 : 8}
            autoComplete="off"
          />

          <Textarea
            id="solution"
            name="solution"
            label="Solution"
            placeholder="解法を入力してください"
            minRows={4}
            isRequired
            isInvalid={!!state.errors.solution}
            autoComplete="off"
            aria-describedby={state.errors.solution ? "solution-error" : undefined}
          />

          {state.message && state.message !== 'success' && (
            <Chip id="form-error" color="danger" variant="flat">
              {state.message}
            </Chip>
          )}

          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
