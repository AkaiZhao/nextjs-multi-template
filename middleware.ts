import { NextResponse, NextRequest } from 'next/server'
import { i18nMiddleware } from '@/middlewares/i18n'
import { themeMiddleware } from '@/middlewares/theme'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const middlewares = [i18nMiddleware, themeMiddleware]

  // 將middlewares透過遞迴呼叫，並傳回NextResponse
  const runner = async (middlewares: Function[], response: NextResponse, request: NextRequest) => {
    if (!middlewares.length) return response
    const middleware = middlewares.shift()
    if (middleware) {
      await middleware(response, request)
      return runner(middlewares, response, request)
    }
  }

  return runner(middlewares, response, request)
}
