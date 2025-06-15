import { FormUpdateUserShowId } from '@/components/organisms/FormSetUserId'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ユーザーID設定',
  description: 'FMC Loggerで使用するユーザーIDを設定します',
  openGraph: {
    title: 'FMC Logger - ユーザーID設定',
    description: 'FMC Loggerで使用するユーザーIDを設定します',
  },
}

export default function UpdateUserShowIdPage() {
  return <FormUpdateUserShowId />
}
