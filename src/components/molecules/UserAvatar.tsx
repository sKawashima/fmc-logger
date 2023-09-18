'use client'

import { User } from '@/services/user'
import {
  Avatar,
  Button,
  Menu,
  Pane,
  Popover,
  Position,
  Text,
  majorScale,
} from 'evergreen-ui'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
  user: User | null
}

export const UserAvatar = (props: Props) => {
  const router = useRouter()

  return (
    <Popover
      position={Position.BOTTOM_RIGHT}
      shouldCloseOnExternalClick
      shouldCloseOnEscapePress
      content={({ close }) => (
        <Menu>
          <Menu.Group>
            <Menu.Item
              onClick={() => {
                router.push(`/user/${props.user?.showId}`)
                close()
              }}
            >
              Profile
            </Menu.Item>
            {/* TODO: Make setting page */}
            {/* <Menu.Item>Settings</Menu.Item> */}
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item
              intent="danger"
              onClick={() => {
                signOut()
                close()
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Group>
        </Menu>
      )}
    >
      <Button appearance="minimal" size="large">
        <Avatar
          name={props.user?.name}
          src={props.user?.image}
          size={32}
          cursor="pointer"
        />
        <Pane
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          marginLeft={majorScale(1)}
        >
          <Text>{props.user?.name}</Text>
          <Text color="muted" size={300}>
            @{props.user?.showId}
          </Text>
        </Pane>
      </Button>
    </Popover>
  )
}
