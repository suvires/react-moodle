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
        if (!credentials) {
          throw new Error('Credentials not provided')
        }
        const { email, password } = credentials
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_MOODLE_LOGIN_TOKEN_URL}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                username: email,
                password: password,
                service: 'react-moodle',
              }),
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
  pages: {
    signIn: '/auth',
    error: '/not-found',
  },
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
          wstoken: '8b4e9bb3c1a2e37378fe92e892a1695e',
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
  events: {
    async signOut(message) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signOut`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + message.token.access_token,
          },
        }
      )
      await res.json()
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
