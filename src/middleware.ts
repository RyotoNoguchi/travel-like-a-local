import { routing } from '@/i18n/routing'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*']
}

export const middleware = (request: Request) => {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}
