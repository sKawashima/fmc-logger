import { SolutionAnswerInput } from '@/components/organisms/SolutionAnswerInput'
import { authOptions } from '@/resources/options'
import { getScramble } from '@/services/scramble'
import { getSolution, scoreToText } from '@/services/solution'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: number }
}

export default async function ScramblePage(props: Props) {
  const scramble = await getScramble(props.params.id)
  if (!scramble) notFound()

  const session = await getServerSession(authOptions)
  const user = session?.user

  const solution =
    user && user.email && (await getSolution(props.params.id, user.email))

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
        <SolutionAnswerInput scrambleId={props.params.id} />
      )}
    </>
  )
}
