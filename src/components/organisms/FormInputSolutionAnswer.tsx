'use client'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { createSolutionFromData } from '@/app/actions/solution'
import { Button, Chip, Textarea } from '@heroui/react'
import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { User } from '@/services/user'
import { scoreToText } from '@/services/solution'

const ANONYMOUS_SUBMISSIONS_KEY = 'anonymousSubmissions'

type AnonymousSolution = {
  id: number
  solution: string
  comment: string | null
  score: number | null
  scrambleId: number
  createdAt: string
}

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
  const [anonymousSolution, setAnonymousSolution] = useState<AnonymousSolution | null>(null)

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
      try {
        const anonymousSubmissions: AnonymousSolution[] = JSON.parse(
          localStorage.getItem(ANONYMOUS_SUBMISSIONS_KEY) || '[]'
        )
        const existingSolution = anonymousSubmissions.find(
          solution => solution.scrambleId === props.scrambleId
        )
        setAnonymousSolution(existingSolution || null)
      } catch (error) {
        console.warn('Failed to parse anonymous submissions from localStorage:', error)
        setAnonymousSolution(null)
      }
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
      const result = await createSolutionFromData(props.scrambleId, solution, comment)
      
      // Store solution details in localStorage for anonymous users
      if (result.solutionDetails && !props.user) {
        try {
          const anonymousSubmissions: AnonymousSolution[] = JSON.parse(
            localStorage.getItem(ANONYMOUS_SUBMISSIONS_KEY) || '[]'
          )
          
          // Remove any existing submission for this scramble
          const filteredSubmissions = anonymousSubmissions.filter(
            s => s.scrambleId !== props.scrambleId
          )
          
          // Add the new submission
          filteredSubmissions.push(result.solutionDetails as AnonymousSolution)
          
          localStorage.setItem(
            ANONYMOUS_SUBMISSIONS_KEY, 
            JSON.stringify(filteredSubmissions)
          )
        } catch (storageError) {
          console.warn('Failed to store anonymous submission in localStorage:', storageError)
        }
      }
      
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

  // Update anonymous solution state when form submission succeeds
  useEffect(() => {
    if (state.message === 'success' && !props.user) {
      try {
        const anonymousSubmissions: AnonymousSolution[] = JSON.parse(
          localStorage.getItem(ANONYMOUS_SUBMISSIONS_KEY) || '[]'
        )
        const submittedSolution = anonymousSubmissions.find(
          solution => solution.scrambleId === props.scrambleId
        )
        setAnonymousSolution(submittedSolution || null)
      } catch (error) {
        console.warn('Failed to update anonymous solution state:', error)
      }
    }
  }, [state.message, props.user, props.scrambleId])

  // Show solution results for anonymous users who have already submitted
  if (!props.user && anonymousSolution) {
    return (
      <div className="space-y-4">
        <Chip color="success" variant="flat">
          匿名ユーザーとして解答を送信しました
        </Chip>
        <div className="space-y-2">
          <p><strong>Your Score:</strong> {scoreToText(anonymousSolution.score)}</p>
          <p><strong>Your Solution:</strong> {anonymousSolution.solution}</p>
          {anonymousSolution.comment && (
            <p><strong>Your Comment:</strong> {anonymousSolution.comment}</p>
          )}
          <p className="text-small text-default-500">
            送信日時: {new Date(anonymousSolution.createdAt).toLocaleString()}
          </p>
        </div>
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
