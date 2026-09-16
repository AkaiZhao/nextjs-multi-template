import type { Locale, SiteConfig } from '@/templates/types'
import { fallbackLng, languages } from './settings'

function browserLocale(header: string | null): Locale {
  const candidates = (header ?? '')
    .split(',')
    .map((part) => {
      const [language, ...parameters] = part.trim().split(';')
      const quality = parameters.find((value) => value.trim().startsWith('q='))
      return {
        language: language.toLowerCase(),
        quality: quality ? Number(quality.trim().slice(2)) : 1,
      }
    })
    .filter((item) => Number.isFinite(item.quality) && item.quality > 0 && item.quality <= 1)
    .sort((a, b) => b.quality - a.quality)
  for (const { language } of candidates) {
    if (language === 'en' || language.startsWith('en-')) return 'en-US'
    if (language === 'zh' || language.startsWith('zh-')) return 'zh-TW'
  }
  return fallbackLng
}
export function resolveLocaleRedirect(
  pathname: string,
  config: SiteConfig | null,
  acceptLanguage: string | null,
): string | null {
  const segment = pathname.split('/')[1]
  const normalized = segment.toLowerCase()
  const supported = languages.find((locale) => locale.toLowerCase() === normalized)
  if (supported)
    return segment === supported ? null : pathname.replace(`/${segment}`, `/${supported}`)
  if (normalized === 'zh-hk' || normalized === 'zh-cn')
    return pathname.replace(`/${segment}`, '/zh-TW')
  // A locale-shaped but unsupported segment reaches the layout's 404 boundary.
  if (/^[a-z]{2}(?:-[a-z]{2})?$/i.test(segment)) return null
  const locale = config?.defaultLocale ?? browserLocale(acceptLanguage)
  return `/${locale}${pathname === '/' ? '' : pathname}`
}
