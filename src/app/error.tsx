'use client'

import { useEffect } from 'react'
import { Button, Alert } from '@heroui/react'

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
    <div className="flex items-center justify-center h-[50vh] p-8">
      <div className="max-w-lg">
        <Alert
          color="danger"
          variant="solid"
          title="An Error Occurred"
          description="We apologize, but an unexpected error has occurred. Please try again later."
          className="mb-4"
        />
        <Button color="danger" variant="solid" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
