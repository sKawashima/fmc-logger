'use client'

import { Pane, majorScale } from 'evergreen-ui'

type Props = {
  children: React.ReactNode
}

export const GlobalBodyWrapper = (props: Props) => {
  return (
    <Pane maxWidth={majorScale(160)} marginX="auto" padding={majorScale(2)}>
      {props.children}
    </Pane>
  )
}
