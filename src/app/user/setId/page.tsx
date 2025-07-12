import { FormUpdateUserShowId } from '@/components/organisms/FormSetUserId'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set User ID',
  description: 'Set your user ID for FMC Logger',
  openGraph: {
    title: 'FMC Logger - Set User ID',
    description: 'Set your user ID for FMC Logger',
  },
}

export default function UpdateUserShowIdPage() {
  return <FormUpdateUserShowId />
}
