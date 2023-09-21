'use client'

import { Button, Card, Heading, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/navigation'

type Props = {
  linkUrl: string
}

export const TopTodayScrambleSection = (props: Props) => {
  const router = useRouter()

  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={majorScale(2)}
      marginTop={majorScale(2)}
    >
      <Heading size={700}>
        Let&rsquo;s Challenge Today&rsquo;s Scramble!
      </Heading>
      <Button
        onClick={() => router.push(props.linkUrl)}
        size="large"
        appearance="primary"
      >
        Challenge Today&rsquo;s Scramble
      </Button>
    </Card>
  )
}
