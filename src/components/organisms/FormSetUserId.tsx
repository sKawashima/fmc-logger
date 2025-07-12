'use client'

import { setUserShowIdFromData } from '@/app/actions/user'
import { Button, Input } from '@heroui/react'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export const FormUpdateUserShowId = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    const showId = formData.get('showId') as string

    if (!showId) {
      setError('Please enter a user ID')
      return
    }

    setError(null)

    startTransition(async () => {
      try {
        await setUserShowIdFromData(showId)
        // Redirect to home page on success
        router.push('/')
        router.refresh()
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Submission failed')
        }
      }
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <form action={onSubmit}>
        <div className="space-y-4">
          <Input
            id="showId"
            name="showId"
            type="text"
            label="User ID"
            placeholder="Enter user ID"
            isRequired
            isInvalid={!!error}
            errorMessage={error}
          />

          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={isPending}
            isDisabled={isPending}
          >
            {isPending ? 'Setting...' : 'Set'}
          </Button>
        </div>
      </form>
    </div>
  )
}
