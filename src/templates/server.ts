import { cache } from 'react'
import { cookies } from 'next/headers'
import { configCookieName } from './configs'
import { parseConfigCookie } from './config'
export const fetchTemplateConfig = cache(async () =>
  parseConfigCookie((await cookies()).get(configCookieName)?.value),
)
