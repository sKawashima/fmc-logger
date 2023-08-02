import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

type ClientType = {
  clientId: string
  clientSecret: string
}

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  // @ts-ignore-next-line
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
