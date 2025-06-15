'use client'

import { User } from '@/services/user'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  User as HeroUIUser,
} from '@heroui/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
  user: User | null
}

export const UserAvatar = (props: Props) => {
  const router = useRouter()

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="cursor-pointer">
          <HeroUIUser
            as="button"
            avatarProps={{
              src: props.user?.image || undefined,
              name: props.user?.name || '?',
              size: 'sm',
              color: 'primary',
              isBordered: true,
            }}
            classNames={{
              base: 'gap-3 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition-colors',
              name: 'text-sm font-medium text-gray-900',
              description: 'text-xs text-gray-500',
            }}
            description={
              props.user?.showId ? `@${props.user.showId}` : undefined
            }
            name={props.user?.name}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            onPress={() => router.push(`/user/${props.user?.showId}`)}
          >
            Profile
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
