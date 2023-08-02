import { NextResponse } from 'next/server';

import { getServerSession } from "next-auth/next"

export async function GET() {
  const session = await getServerSession() // セッション情報を取得

  console.log(session?.user) // ユーザ情報を取得

  return NextResponse.json({ message: session?.user });
}
