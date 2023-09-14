'use client'

import { Button } from '@nextui-org/react'
import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <Button color="primary" onClick={() => signIn()}>
      Sign in
    </Button>
  )
}

export const LogoutButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
