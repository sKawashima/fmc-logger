'use client'

import { Pane, Alert, Button, majorScale } from 'evergreen-ui'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      padding={majorScale(4)}
    >
      <Pane maxWidth={majorScale(60)}>
        <Alert
          intent="danger"
          title="エラーが発生しました"
          marginBottom={majorScale(2)}
        >
          申し訳ございませんが、予期しないエラーが発生しました。
          しばらくしてから再度お試しください。
        </Alert>
        <Button appearance="primary" intent="danger" onClick={() => reset()}>
          再試行
        </Button>
      </Pane>
    </Pane>
  )
}
