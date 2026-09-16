import type { Locale } from '@/templates/types'
export const languages = ['zh-TW', 'en-US'] as const
export const fallbackLng: Locale = 'zh-TW'
export function isLocale(value: string): value is Locale {
  return languages.some((language) => language === value)
}
