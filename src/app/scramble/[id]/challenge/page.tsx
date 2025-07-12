import { ShowScrambleSection } from '@/components/organisms/ShowScrambleSection'
import { getScramble } from '@/services/scramble'
import { getSolution } from '@/services/solution'
import { getUser } from '@/services/user'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Card, CardBody, CardHeader, Button } from '@heroui/react'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const scramble = await getScramble(Number(id))

  return {
    title: `Challenge - Scramble ${id}`,
    description: scramble ? `Challenge scramble ${id}` : 'Scramble not found',
    openGraph: {
      title: `FMC Logger - Challenge - Scramble ${id}`,
      description: scramble ? `Challenge scramble ${id}` : 'Scramble not found',
    },
  }
}

export default async function ScrambleChallengePage(props: Props) {
  const { id } = await props.params
  const scrambleId = Number(id)

  const scramble = await getScramble(scrambleId)
  if (!scramble) notFound()

  const user = await getUser()
  const solution = user && (await getSolution(scrambleId, user.email))

  // If already solved, redirect to results page
  if (solution) {
    redirect(`/scramble/${id}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Challenge Scramble {id}</h2>
          <Link href={`/scramble/${id}`}>
            <Button color="default" variant="flat">
              Skip Challenge
            </Button>
          </Link>
        </CardHeader>
        <CardBody>
          <ShowScrambleSection
            scramble={scramble.scramble}
            scrambleId={scrambleId}
          />
        </CardBody>
      </Card>
    </div>
  )
}
