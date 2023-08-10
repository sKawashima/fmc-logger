'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const UpdateUserShowIdForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <label htmlFor="userIdForShow">UserId</label>
      <input id="userIdForShow" />
      <p>{error}</p>
      <button
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

          console.log(responce)

          if (responce.status === 200) {
            setError(null)
            // router.push('/')
          } else {
            setError('送信に失敗しました')
          }
        }}
      >
        submit
      </button>
    </>
  )
}
