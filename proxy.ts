import { NextRequest, NextResponse } from 'next/server'
import { configCookieName } from '@/templates/configs'
import { readConfigCookie } from '@/templates/config'
import { resolveLocaleRedirect } from '@/i18n/routing'

export function proxy(request: NextRequest) {
  const saved = readConfigCookie(request.cookies.get(configCookieName)?.value)
  const pathname = resolveLocaleRedirect(
    request.nextUrl.pathname,
    saved,
    request.headers.get('accept-language'),
  )
  if (!pathname) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url)
}
export const config = { matcher: ['/((?!api|_next|assets|.*\\..*).*)'] }
