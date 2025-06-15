import { FormInputSolutionAnswer } from '@/components/organisms/FormInputSolutionAnswer'
import { getScramble } from '@/services/scramble'
import { getSolution, scoreToText } from '@/services/solution'
import { getUser } from '@/services/user'
import { notFound } from 'next/navigation'
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

  const solution = user && (await getSolution(scrambleId, user.email))

  return (
    <>
      <p>scramble:</p>
      <p>{scramble?.scramble}</p>
      {solution ? (
        <>
          <p>Your Score: {scoreToText(solution.score)}</p>
          <p>Your Solution: {solution.solution}</p>
          <p>Your Comment: {solution.comment}</p>
        </>
      ) : (
        <FormInputSolutionAnswer scrambleId={scrambleId} />
      )}
    </>
  )
}
