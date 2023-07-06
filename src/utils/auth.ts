import { JWT, decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { IProfile } from '@/interfaces/profile.interface'

export async function getUser() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.profile) {
    throw new Error('User profile not found in session')
  }
  return session.user.profile as IProfile
}

export async function getAccessToken() {
  const cookieStore = await cookies()
  const cookie = await cookieStore.get(
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  )
  if (!cookie) {
    console.error('Cookie not found')
    return null
  }
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET not found')

  try {
    const decodedCookie = (await decode({
      token: cookie.value,
      secret: secret,
    })) as JWT

    return decodedCookie.access_token
  } catch (error: any) {
    throw new Error(error)
  }
}
