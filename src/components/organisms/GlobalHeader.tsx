'use client'

import { Heading, Pane, majorScale } from 'evergreen-ui'
import { LoginButton } from '../molecules/LoginButton'
import { UserAvatar } from '../molecules/UserAvatar'
import { User } from '@/services/user'

type Props = {
  user: User | null
}

export const GlobalHeader = (props: Props) => {
  const isLogin = Boolean(props.user)

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
        {isLogin ? <UserAvatar user={props.user} /> : <LoginButton />}
      </Pane>
    </header>
  )
}
