'use client'

import { Button } from 'evergreen-ui'
import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <Button appearance="primary" onClick={() => signIn()} size="large">
      Sign in
    </Button>
  )
}
