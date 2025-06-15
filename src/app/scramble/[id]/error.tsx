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
    console.error('Scramble page error:', error)
  }, [error])

  return (
    <Pane padding={majorScale(4)}>
      <Alert
        intent="danger"
        title="スクランブルの読み込みに失敗しました"
        marginBottom={majorScale(3)}
      >
        スクランブルデータの取得中にエラーが発生しました。
        ネットワーク接続を確認して、再度お試しください。
      </Alert>
      <Button
        appearance="primary"
        intent="danger"
        onClick={() => reset()}
        marginRight={majorScale(2)}
      >
        再試行
      </Button>
      <Button appearance="minimal" onClick={() => window.history.back()}>
        戻る
      </Button>
    </Pane>
  )
}
