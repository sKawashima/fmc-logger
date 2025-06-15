'use client'

import { User } from '@/services/user'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type Props = {
  user: User | null
}

export const UserAvatar = (props: Props) => {
  const router = useRouter()

  const getInitials = (name?: string) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
        <div className="flex items-center space-x-major-1">
          {props.user?.image ? (
            <img
              src={props.user.image}
              alt={props.user.name || 'User'}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {getInitials(props.user?.name)}
            </div>
          )}
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">
              {props.user?.name}
            </span>
            <span className="text-xs text-gray-500">@{props.user?.showId}</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => router.push(`/user/${props.user?.showId}`)}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
              >
                Profile
              </button>
            )}
          </MenuItem>
          <hr className="my-1 border-gray-200" />
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-sm text-danger-600`}
              >
                Logout
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
