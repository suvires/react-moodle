import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/sign-in')
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    } else if (!isAuthPage && !isAuth) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    } else {
      return NextResponse.next()
    }
  },
  {
    callbacks: {
      authorized() {
        return true
      },
    },
    pages: {
      signIn: '/sign-in',
      error: '/not-found',
    },
  }
)

export const config = {
  matcher: ['/', '/sign-in'],
}
