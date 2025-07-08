import { getScramble } from '@/services/scramble'
import { getSolutionsFromUserShowId, scoreToText } from '@/services/solution'
import { getUserFromShowId } from '@/services/user'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ userid: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userid } = await params
  const t = await getTranslations('pages.user.profile')

  try {
    const user = await getUserFromShowId(userid)

    return {
      title: `${user.name} (@${user.showId})`,
      description: t('description', { userName: user.name }),
      openGraph: {
        title: `FMC Logger - ${user.name} (@${user.showId})`,
        description: t('description', { userName: user.name }),
      },
    }
  } catch {
    return {
      title: t('notFound.title'),
      description: t('notFound.description'),
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
          solutions.map(async (solution: any) => {
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
