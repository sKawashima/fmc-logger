'use client'

import { Button } from '@heroui/react'
import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <Button color="primary" variant="solid" size="lg" onClick={() => signIn()}>
      Sign in
    </Button>
  )
}
