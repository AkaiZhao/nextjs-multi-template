import { createInstance } from 'i18next'
import type en from './locales/en-US'
import type { Locale } from '@/templates/types'
export type Dictionary = typeof en
const loaders = {
  'en-US': () => import('./locales/en-US'),
  'zh-TW': () => import('./locales/zh-TW'),
}
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await loaders[locale]()).default
}
/** A fresh instance for each call, never a process-wide mutable server language. */
export async function getTranslation(locale: Locale) {
  const dictionary = await getDictionary(locale)
  const instance = createInstance()
  await instance.init({
    lng: locale,
    fallbackLng: 'zh-TW',
    resources: { [locale]: { common: dictionary } },
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })
  return { t: instance.getFixedT(locale, 'common'), dictionary }
}
