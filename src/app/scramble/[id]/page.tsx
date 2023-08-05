import { getScramble } from '@/services/scramble'
import { notFound } from 'next/navigation'

type ScramblePageParams = {
  params: { id: number }
  searchParams: {}
}

export default async function ScramblePage(props: ScramblePageParams) {
  console.log(props)
  const scramble = await getScramble(props.params.id)
  if (!scramble) notFound()

  return (
    <>
      <p>scramble:</p>
      <p>{scramble?.scramble}</p>
    </>
  )
}
