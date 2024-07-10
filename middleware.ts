import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TODO: Fetch theme from backend
  const theme = 'golden'
  const response = NextResponse.next()
  response.cookies.set('theme', theme)

  return response
}
