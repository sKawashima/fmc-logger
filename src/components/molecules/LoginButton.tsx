'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <button className="btn btn-primary" onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export const LogoutButton = () => {
  return (
    <button className="btn btn-primary" onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
