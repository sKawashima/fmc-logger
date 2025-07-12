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
    title: `Scramble ${id}`,
    description: scramble
      ? `Scramble ${id} details page`
      : 'Scramble not found',
    openGraph: {
      title: `FMC Logger - Scramble ${id}`,
      description: scramble
        ? `Scramble ${id} details page`
        : 'Scramble not found',
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

  // Find user's solution with full data from allSolutions
  const userSolutionWithUser = userSolution
    ? allSolutions.find((s) => s.userId === userSolution.userId)
    : undefined

  return (
    <ScrambleResultsSection
      scramble={scramble.scramble}
      userSolution={userSolutionWithUser}
      allSolutions={allSolutions}
      currentUserEmail={user?.email}
    />
  )
}
