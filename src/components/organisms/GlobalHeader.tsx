'use client'

import { Heading, Pane, majorScale } from 'evergreen-ui'
import { LoginButton } from '../molecules/LoginButton'
import { UserAvatar } from '../molecules/UserAvatar'
import { User } from '@/services/user'
import { useRouter } from 'next/navigation'

type Props = {
  user: User | null
}

export const GlobalHeader = (props: Props) => {
  const isLogin = Boolean(props.user)
  const router = useRouter()

  return (
    <header>
      <Pane borderBottom="default">
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          maxWidth={majorScale(160)}
          marginX="auto"
          paddingX={majorScale(2)}
          paddingY={majorScale(1)}
        >
          <Heading
            size={600}
            cursor="pointer"
            onClick={() => {
              router.push('/')
            }}
          >
            FMC Logger
          </Heading>
          {isLogin ? <UserAvatar user={props.user} /> : <LoginButton />}
        </Pane>
      </Pane>
    </header>
  )
}
