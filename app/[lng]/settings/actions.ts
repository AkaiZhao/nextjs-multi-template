'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { configCookieName, maxCookieLength } from '@/templates/configs'
import { serializeConfigCookie, validateSiteConfig } from '@/templates/config'
export type SettingsActionState = { error: 'invalidConfig' | 'saveError' | null }
export async function saveSiteConfig(
  _previous: SettingsActionState,
  form: FormData,
): Promise<SettingsActionState> {
  const raw = form.get('config')
  if (typeof raw !== 'string' || raw.length > maxCookieLength) return { error: 'invalidConfig' }
  let candidate: unknown
  try {
    candidate = JSON.parse(raw)
  } catch {
    return { error: 'invalidConfig' }
  }
  const config = validateSiteConfig(candidate)
  if (!config) return { error: 'invalidConfig' }
  try {
    const jar = await cookies()
    jar.set(configCookieName, serializeConfigCookie(config), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  } catch {
    return { error: 'saveError' }
  }
  revalidatePath('/', 'layout')
  redirect(`/${config.defaultLocale}/settings?saved=1`)
}
export async function resetSiteConfig() {
  const jar = await cookies()
  jar.set(configCookieName, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  revalidatePath('/', 'layout')
  redirect('/zh-TW/settings?reset=1')
}
