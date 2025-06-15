import { Pane, Alert, Button, majorScale } from 'evergreen-ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      padding={majorScale(4)}
    >
      <Pane maxWidth={majorScale(60)} textAlign="center">
        <Alert
          intent="warning"
          title="ページが見つかりません"
          marginBottom={majorScale(3)}
        >
          お探しのページは存在しないか、移動された可能性があります。
          URLをご確認いただくか、ホームページから再度アクセスしてください。
        </Alert>
        <Link href="/" passHref>
          <Button appearance="primary">ホームに戻る</Button>
        </Link>
      </Pane>
    </Pane>
  )
}
