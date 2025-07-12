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
    console.error('Set ID page error:', error)
  }, [error])

  return (
    <div className="p-8">
      <Alert
        color="danger"
        variant="solid"
        title="Error in User ID Settings"
        description="An error occurred while processing the user ID settings. Please try again or wait a while before accessing."
        className="mb-6"
      />
      <Button color="danger" variant="solid" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  )
}
