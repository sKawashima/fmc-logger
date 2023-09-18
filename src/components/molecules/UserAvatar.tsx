'use client'

import { User } from '@/services/user'
import { Avatar, Menu, Popover, Position } from 'evergreen-ui'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
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
      <Avatar
        name={props.user?.name}
        src={props.user?.image}
        size={32}
        cursor="pointer"
      />
    </Popover>
  )
}
