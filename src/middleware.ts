import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    console.log('hola')
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/sign-in')
    console.log(isAuth)
    console.log(isAuthPage)
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
  }
)

export const config = {
  matcher: ['/sign-in', '/'],
}
