import { getScramble } from '@/services/scramble'
import { getSolutionsFromUserShowId, scoreToText } from '@/services/solution'
import { getUserFromShowId } from '@/services/user'

type Props = {
  params: { userid: string }
}

export default async function UserPage(props: Props) {
  const user = await getUserFromShowId(props.params.userid)
  const solutions = await getSolutionsFromUserShowId(user.showId)
  const solutionWithScramble = solutions
    ? await Promise.all(
        solutions.map(async (solution) => {
          const scramble = await getScramble(solution.scrambleId)
          return { solution, scramble }
        }),
      )
    : []

  return (
    <div>
      <p>
        {user.name}(@{user.showId})
      </p>
      {solutionWithScramble.map(({ solution, scramble }) => {
        if (!scramble) return <div key={solution.id}>error</div>
        return (
          <div key={solution.id}>
            <p>{scramble.scramble}</p>
            <p>{scoreToText(solution.score)}</p>
          </div>
        )
      })}
    </div>
  )
}
