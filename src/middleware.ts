import { routing } from '@/i18n/routing'
import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { LANGUAGE } from './constants'

const intlMiddleware = createMiddleware(routing)

export const middleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  if (request.nextUrl.pathname === '/') {
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value

    // savedLocaleが有効な値の場合はそれを使用、そうでない場合はaccept-languageヘッダーから判定
    const locale =
      savedLocale && (savedLocale === LANGUAGE.FR || savedLocale === LANGUAGE.EN)
        ? savedLocale
        : /fr/i.test(request.headers.get('accept-language') || '')
          ? LANGUAGE.FR
          : LANGUAGE.EN

    const newUrl = new URL(`/${locale}`, request.url)

    return NextResponse.redirect(newUrl, {
      headers: requestHeaders
    })
  }

  const response = intlMiddleware(request)

  Object.entries(requestHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  // Match only internationalized pathnames using values from LANGUAGE enum (FR='fr', EN='en')
  matcher: ['/', '/(fr|en)/:path*']
}

export default middleware
