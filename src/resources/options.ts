import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

type ClientType = {
  clientId: string
  clientSecret: string
}

export const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
