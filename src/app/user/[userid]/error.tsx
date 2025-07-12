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
    console.error('User page error:', error)
  }, [error])

  return (
    <div className="p-8">
      <Alert
        color="danger"
        variant="solid"
        title="Failed to Load User Information"
        description="An error occurred while retrieving user data. The user may not exist or you may not have access permissions."
        className="mb-6"
      />
      <div className="flex gap-4">
        <Button color="danger" variant="solid" onClick={() => reset()}>
          Try Again
        </Button>
        <Button
          color="default"
          variant="bordered"
          onClick={() => (window.location.href = '/')}
        >
          Return to Home
        </Button>
      </div>
    </div>
  )
}
