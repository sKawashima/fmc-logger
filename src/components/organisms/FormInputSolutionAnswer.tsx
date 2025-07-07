'use client'
import cubeNotationNormalizer from 'cube-notation-normalizer'
import { createSolutionFromData } from '@/app/actions/solution'
import { Button, Chip, Textarea } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'

type Props = {
  scrambleId: number
}

function SubmitButton() {
  const { pending } = useFormStatus()
  const t = useTranslations('forms.solution.button')

  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      isDisabled={pending}
    >
      {pending ? t('loading') : t('submit')}
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
  const t = useTranslations('forms.solution')

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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
          solution: t('error.invalidNotation'),
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
        message: t('error.submit'),
        errors: {
          solution: null,
          comment: null,
        },
      }
    }
  }

  const [state, formAction] = useFormState(createSolutionWithId, initialState)

  return (
    <div className="space-y-4">
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
            placeholder={t('comment.placeholder')}
            minRows={isMobile ? 6 : 12}
            className="font-mono resize-y"
            autoComplete="off"
          />

          <Textarea
            id="solution"
            name="solution"
            label="Solution"
            placeholder={t('solution.placeholder')}
            minRows={4}
            className="font-mono"
            isRequired
            isInvalid={!!state.errors.solution}
            autoComplete="off"
            aria-describedby={
              state.errors.solution ? 'solution-error' : undefined
            }
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
