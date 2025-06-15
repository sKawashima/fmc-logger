'use client'

import { Button, Card, CardBody } from '@heroui/react'
import { useRouter } from 'next/navigation'

type Props = {
  linkUrl: string
}

export const TopTodayScrambleSection = (props: Props) => {
  const router = useRouter()

  return (
    <Card className="mt-4">
      <CardBody className="flex flex-col items-center gap-4 p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Let&rsquo;s Challenge Today&rsquo;s Scramble!
        </h2>
        <Button
          color="primary"
          variant="solid"
          size="lg"
          onClick={() => router.push(props.linkUrl)}
        >
          Challenge Today&rsquo;s Scramble
        </Button>
      </CardBody>
    </Card>
  )
}
