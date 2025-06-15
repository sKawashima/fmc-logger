'use client'

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
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 py-2">
          <h1
            className="text-2xl font-bold cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() => {
              router.push('/')
            }}
          >
            FMC Logger
          </h1>
          {isLogin ? <UserAvatar user={props.user} /> : <LoginButton />}
        </div>
      </div>
    </header>
  )
}
