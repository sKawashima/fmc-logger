'use client'

import { setUserShowIdFromData } from '@/app/actions/user'
import { Button, Input } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export const FormUpdateUserShowId = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const t = useTranslations('forms.setUserId')

  const onSubmit = async (formData: FormData) => {
    const showId = formData.get('showId') as string

    if (!showId) {
      setError(t('error.empty'))
      return
    }

    setError(null)

    startTransition(async () => {
      try {
        await setUserShowIdFromData(showId)
        // 成功時にホームページにリダイレクト
        router.push('/')
        router.refresh()
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(t('error.submit'))
        }
      }
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <form action={onSubmit}>
        <div className="space-y-4">
          <Input
            id="showId"
            name="showId"
            type="text"
            label={t('label')}
            placeholder={t('placeholder')}
            isRequired
            isInvalid={!!error}
            errorMessage={error}
          />

          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={isPending}
            isDisabled={isPending}
          >
            {isPending ? t('button.loading') : t('button.submit')}
          </Button>
        </div>
      </form>
    </div>
  )
}
