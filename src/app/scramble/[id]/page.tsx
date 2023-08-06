import { SolutionAnswerInput } from '@/components/organisms/SolutionAnswerInput'
import { getScramble } from '@/services/scramble'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: number }
}

export default async function ScramblePage(props: Props) {
  const scramble = await getScramble(props.params.id)
  if (!scramble) notFound()

  return (
    <>
      <p>scramble:</p>
      <p>{scramble?.scramble}</p>
      <SolutionAnswerInput scrambleId={props.params.id} />
    </>
  )
}
