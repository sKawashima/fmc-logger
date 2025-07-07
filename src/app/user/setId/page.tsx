import { FormUpdateUserShowId } from '@/components/organisms/FormSetUserId'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.user.setId')

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: `FMC Logger - ${t('title')}`,
      description: t('description'),
    },
  }
}

export default function UpdateUserShowIdPage() {
  return <FormUpdateUserShowId />
}
