import { getUser } from '@/services/user'
import { GlobalHeader } from '../organisms/GlobalHeader'
import { redirect } from 'next/navigation'
import { GlobalFooter } from '../organisms/GlobalFooter'
import { GlobalBodyWrapper } from '../organisms/GlobalBodyWrapper'
import { headers } from 'next/headers'

type Props = {
  children: React.ReactNode
}

export const GlobalLayout = async (props: Props) => {
  const user = await getUser()
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  // /user/setId ページではリダイレクトをスキップ
  if (user && !user.showId && pathname !== '/user/setId') {
    redirect('/user/setId')
  }

  return (
    <>
      <GlobalHeader user={user} />
      <GlobalBodyWrapper>{props.children}</GlobalBodyWrapper>
      <GlobalFooter />
    </>
  )
}
