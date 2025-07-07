import { TopTemplate } from '@/components/templates/TopTemplate'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.home')

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: `FMC Logger - ${t('title')}`,
      description: t('description'),
    },
  }
}

export default async function Home() {
  return <TopTemplate />
}
