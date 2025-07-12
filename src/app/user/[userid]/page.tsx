import { getScramble } from '@/services/scramble'
import { getSolutionsFromUserShowId, scoreToText } from '@/services/solution'
import { getUserFromShowId } from '@/services/user'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ userid: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userid } = await params

  try {
    const user = await getUserFromShowId(userid)

    return {
      title: `${user.name} (@${user.showId})`,
      description: `${user.name}'s FMC records and solutions`,
      openGraph: {
        title: `FMC Logger - ${user.name} (@${user.showId})`,
        description: `${user.name}'s FMC records and solutions`,
      },
    }
  } catch {
    return {
      title: 'User Not Found',
      description: 'The specified user does not exist',
    }
  }
}

export default async function UserPage(props: Props) {
  const { userid } = await props.params

  try {
    const user = await getUserFromShowId(userid)
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
  } catch {
    notFound()
  }
}
