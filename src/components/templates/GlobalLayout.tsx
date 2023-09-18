import { getUser } from '@/services/user'
import { GlobalHeader } from '../organisms/GlobalHeader'
import { redirect } from 'next/navigation'
import { GlobalFooter } from '../organisms/GlobalFooter'
import { GlobalBodyWrapper } from '../organisms/GlobalBodyWrapper'

type Props = {
  children: React.ReactNode
}

export const GlobalLayout = async (porps: Props) => {
  const user = await getUser()
  if (user && !user.showId) redirect('/user/setId')

  return (
    <>
      <GlobalHeader user={user} />
      <GlobalBodyWrapper>{porps.children}</GlobalBodyWrapper>
      <GlobalFooter />
    </>
  )
}
