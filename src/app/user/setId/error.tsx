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
    console.error('Set ID page error:', error)
  }, [error])

  return (
    <Pane padding={majorScale(4)}>
      <Alert
        intent="danger"
        title="ユーザーID設定でエラーが発生しました"
        marginBottom={majorScale(3)}
      >
        ユーザーID設定の処理中にエラーが発生しました。
        再度お試しいただくか、しばらく時間をおいてからアクセスしてください。
      </Alert>
      <Button appearance="primary" intent="danger" onClick={() => reset()}>
        再試行
      </Button>
    </Pane>
  )
}
