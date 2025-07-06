import { FormInputSolutionAnswer } from '@/components/organisms/FormInputSolutionAnswer'
import { getScramble } from '@/services/scramble'
import { getSolution, scoreToText } from '@/services/solution'
import { getUser } from '@/services/user'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Card, CardBody, CardHeader, Chip, Divider } from '@heroui/react'

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Today's Scramble</h2>
        </CardHeader>
        <CardBody>
          <p className="font-mono text-lg bg-gray-50 p-4 rounded-lg">
            {scramble?.scramble}
          </p>
        </CardBody>
      </Card>

      {solution ? (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Your Results</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Score</h3>
              <Chip
                color={solution.score ? "success" : "danger"}
                variant="solid"
                size="lg"
                className="text-lg font-bold"
              >
                {scoreToText(solution.score)}
              </Chip>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Solution</h3>
              <p className="font-mono text-base bg-gray-50 p-4 rounded-lg">
                {solution.solution}
              </p>
            </div>
            
            {solution.comment && (
              <>
                <Divider />
                <div>
                  <h3 className="text-lg font-medium mb-2">Comment</h3>
                  <p className="text-base bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {solution.comment}
                  </p>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      ) : (
        <FormInputSolutionAnswer scrambleId={scrambleId} />
      )}
    </div>
  )
}
