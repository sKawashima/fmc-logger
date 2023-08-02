import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'

export async function GET() {
  const session = await getServerSession()

  return NextResponse.json({ message: session?.user })
}
