import NextAuth, { Session, NextAuthOptions } from 'next-auth'
import { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { IProfile } from '@/interfaces/profile.interface'

declare module 'next-auth' {
  interface Session {
    user: User
    access_token: string
  }

  interface User {
    id?: string
    email: string
    profile?: IProfile
    access_token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials)
        if (!credentials) {
          throw new Error('Credentials not provided')
        }
        const { email, password } = credentials
        try {
          const params = new URLSearchParams({
            username: email,
            password: password,
            service: 'react-moodle',
          })
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_MOODLE_LOGIN_TOKEN_URL}?${params}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (res.ok) {
            const data = await res.json()
            if (data.token) {
              const user: User = {
                email: email,
                access_token: data.token,
              }
              return user
            } else {
              return null
            }
          } else {
            throw new Error(res.statusText)
          }
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        const { access_token } = user
        token.user = user
        token.access_token = access_token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        const params = new URLSearchParams({
          wstoken: `${process.env.NEXT_PUBLIC_MOODLE_TOKEN}`,
          wsfunction: 'core_user_get_users_by_field',
          moodlewsrestformat: 'json',
          field: 'email',
          'values[0]': session.user.email,
        })
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MOODLE_WEBSERVICE_URL}?${params}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await res.json()
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        session.access_token = token.access_token
        session.user.profile = data[0]
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
