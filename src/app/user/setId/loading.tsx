import { Pane, Spinner, majorScale } from 'evergreen-ui'

export default function Loading() {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="40vh"
      flexDirection="column"
      gap={majorScale(2)}
    >
      <Spinner size={majorScale(4)} />
      <Pane fontSize={majorScale(2)} color="muted">
        設定を読み込み中...
      </Pane>
    </Pane>
  )
}
