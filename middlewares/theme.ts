import { NextResponse, NextRequest } from 'next/server'

export const themeMiddleware = async (response: NextResponse) => {
  // TODO: Fetch theme from backend
  const theme = 'dark'
  response.cookies.set('theme', theme)
  return response
}
