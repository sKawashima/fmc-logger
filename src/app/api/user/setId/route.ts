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

  return NextResponse.json({ user: updatedUser })
}
