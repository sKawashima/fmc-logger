'use client'

import { Button } from 'evergreen-ui'
import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <Button appearance="primary" onClick={() => signIn()}>
      Sign in
    </Button>
  )
}

// TODO: Remove this component
export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}
