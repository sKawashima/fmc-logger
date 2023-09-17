'use client'

import { Button, Pane, TextInputField } from 'evergreen-ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const UpdateUserShowIdForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    const userIdForShowInputElement = document.getElementById(
      'userIdForShow',
    ) as HTMLInputElement
    if (!userIdForShowInputElement) return

    const responce = await fetch('/api/user/setId', {
      method: 'POST',
      body: JSON.stringify({
        showId: userIdForShowInputElement.value,
      }),
    })

    if (responce.status === 200) {
      router.push('/')
    } else if (responce.status === 409) {
      setError('そのIDは既に使われています')
    } else {
      setError('送信に失敗しました')
    }
  }

  return (
    <Pane>
      <TextInputField
        id="userIdForShow"
        label="UserId"
        isInvalid={Boolean(error)}
        validationMessage={error}
      />
      <Button appearance="primary" onClick={onSubmit}>
        submit
      </Button>
    </Pane>
  )
}
