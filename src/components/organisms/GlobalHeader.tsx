'use client'

import { Heading, Pane, majorScale } from 'evergreen-ui'
import { LoginButton, LogoutButton } from '../molecules/LoginButton'

type Props = {
  isLogin?: boolean
}

export const GlobalHeader = (props: Props) => {
  return (
    <header>
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="default"
        paddingX={majorScale(2)}
        paddingY={majorScale(1)}
      >
        <Heading size={600}>FMC Logger</Heading>
        {props.isLogin ? <LogoutButton /> : <LoginButton />}
      </Pane>
    </header>
  )
}
