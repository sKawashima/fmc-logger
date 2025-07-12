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
    console.error('Scramble page error:', error)
  }, [error])

  return (
    <div className="p-8">
      <Alert
        color="danger"
        variant="solid"
        title="Failed to Load Scramble"
        description="An error occurred while retrieving scramble data. Please check your network connection and try again."
        className="mb-6"
      />
      <div className="flex gap-4">
        <Button color="danger" variant="solid" onClick={() => reset()}>
          Try Again
        </Button>
        <Button
          color="default"
          variant="bordered"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}
