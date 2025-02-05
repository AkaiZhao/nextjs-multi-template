import { createInstance, t } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

export const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`@/locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))

  return i18nInstance
}

export const getTranslation = async (lng: string, ns: string) => {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    ...i18nextInstance,
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
  }
}
