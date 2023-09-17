'use client'

import { Button, Pane, TextInputField } from 'evergreen-ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const UpdateUserShowIdForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  return (
    <Pane>
      <TextInputField id="userIdForShow" label="UserId" />
      <p>{error}</p>
      <Button
        appearance="primary"
        // TODO: Refactor Method
        onClick={async () => {
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
        }}
      >
        submit
      </Button>
    </Pane>
  )
}
