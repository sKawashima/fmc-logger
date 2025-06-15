import { Pane, majorScale } from 'evergreen-ui'

type Props = {
  children: React.ReactNode
}

export const GlobalBodyWrapper = (props: Props) => {
  return (
    <Pane
      maxWidth={majorScale(160)}
      marginX="auto"
      padding={majorScale(2)}
      minHeight="calc(100vh - 48px - 56px - 36px)"
    >
      {props.children}
    </Pane>
  )
}
