import { ScrambleResultsSection } from '@/components/organisms/ScrambleResultsSection'
import { getScramble } from '@/services/scramble'
import { getSolution, getAllSolutionsForScramble } from '@/services/solution'
import { getUser } from '@/services/user'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const scramble = await getScramble(Number(id))

  return {
    title: `スクランブル ${id}`,
    description: scramble
      ? `スクランブル ${id} の詳細ページ`
      : 'スクランブルが見つかりません',
    openGraph: {
      title: `FMC Logger - スクランブル ${id}`,
      description: scramble
        ? `スクランブル ${id} の詳細ページ`
        : 'スクランブルが見つかりません',
    },
  }
}

export default async function ScramblePage(props: Props) {
  const { id } = await props.params
  const scrambleId = Number(id)

  const scramble = await getScramble(scrambleId)
  if (!scramble) notFound()

  const user = await getUser()
  const userSolution = user && (await getSolution(scrambleId, user.email))

  // If not solved and authenticated, redirect to challenge page
  if (user && !userSolution) {
    redirect(`/scramble/${id}/challenge`)
  }

  // Get all solutions for this scramble
  const allSolutions = await getAllSolutionsForScramble(scrambleId)

  return (
    <ScrambleResultsSection
      scramble={scramble.scramble}
      userSolution={userSolution || undefined}
      allSolutions={allSolutions}
      currentUserEmail={user?.email}
    />
  )
}
