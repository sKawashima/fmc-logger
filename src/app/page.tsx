import { TopTemplate } from '@/components/templates/TopTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description:
    "FMC Logger home page - Check today's scramble and latest records",
  openGraph: {
    title: 'FMC Logger - Home',
    description:
      "FMC Logger home page - Check today's scramble and latest records",
  },
}

export default async function Home() {
  return <TopTemplate />
}
