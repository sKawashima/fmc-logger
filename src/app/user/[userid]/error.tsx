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
    console.error('User page error:', error)
  }, [error])

  return (
    <Pane padding={majorScale(4)}>
      <Alert
        intent="danger"
        title="ユーザー情報の読み込みに失敗しました"
        marginBottom={majorScale(3)}
      >
        ユーザーデータの取得中にエラーが発生しました。
        ユーザーが存在しないか、アクセス権限がない可能性があります。
      </Alert>
      <Button
        appearance="primary"
        intent="danger"
        onClick={() => reset()}
        marginRight={majorScale(2)}
      >
        再試行
      </Button>
      <Button appearance="minimal" onClick={() => (window.location.href = '/')}>
        ホームに戻る
      </Button>
    </Pane>
  )
}
