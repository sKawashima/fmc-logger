import { authOptions } from '@/resources/options'
import { makeSolution } from '@/services/solution'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper'

type SolutionPostBody = {
  scrambleId: number
  solution: string
  comment?: string
}

export const POST = async (req: NextApiRequest) => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  const reqBody = JSON.parse(await streamToString(req.body)) as SolutionPostBody
  if (!user || !user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const solution = await makeSolution(
    user.email,
    reqBody.scrambleId,
    reqBody.solution,
    reqBody.comment,
  )

  return NextResponse.json({ solution: solution })
}
