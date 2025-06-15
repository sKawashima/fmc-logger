'use client'

import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <button onClick={() => signIn()} className="btn-primary text-lg px-6 py-3">
      Sign in
    </button>
  )
}
