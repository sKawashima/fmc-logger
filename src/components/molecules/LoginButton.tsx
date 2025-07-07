'use client'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  const t = useTranslations('auth')

  return (
    <Button color="primary" variant="solid" size="lg" onClick={() => signIn()}>
      {t('signIn')}
    </Button>
  )
}
