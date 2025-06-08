import { authOptions } from '@/lib/auth/authOptions'
import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

// Route Handlersの形式でハンドラーを作成
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
