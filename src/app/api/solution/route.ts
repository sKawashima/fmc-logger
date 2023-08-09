import { makeSolution } from '@/services/solution'
import { NextRequest, NextResponse } from 'next/server'
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper'
import { getUser } from '@/services/user'

type SolutionPostBody = {
  scrambleId: number
  solution: string
  comment?: string
}

export const POST = async (req: NextRequest) => {
  const user = await getUser()
  if (!req.body)
    return NextResponse.json({ message: 'No body' }, { status: 400 })

  const reqBody = JSON.parse(await streamToString(req.body)) as SolutionPostBody
  if (!user) {
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
