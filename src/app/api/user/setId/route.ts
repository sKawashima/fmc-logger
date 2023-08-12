import { updateUserShowId } from '@/services/user'
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper'
import { NextRequest, NextResponse } from 'next/server'

type UserSetIdForShowPostBody = {
  showId: string
}

export const POST = async (req: NextRequest) => {
  if (!req.body)
    return NextResponse.json({ message: 'No body' }, { status: 400 })
  const reqBody = JSON.parse(
    await streamToString(req.body),
  ) as UserSetIdForShowPostBody

  const updatedUser = await updateUserShowId(reqBody.showId)

  if (updatedUser === 'already exists')
    return NextResponse.json({ message: 'already id exists' }, { status: 409 })

  return NextResponse.json({ user: updatedUser })
}
