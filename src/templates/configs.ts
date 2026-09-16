import type { SiteConfig, TemplateName, ThemeName } from './types'

export const templates = {
  default: { name: 'default', theme: 'ocean', mode: 'light', navigationPosition: 'top' },
  studio: { name: 'studio', theme: 'plum', mode: 'light', navigationPosition: 'sidebar' },
} satisfies Record<
  TemplateName,
  {
    name: TemplateName
    theme: ThemeName
    mode: SiteConfig['mode']
    navigationPosition: SiteConfig['navigation']['position']
  }
>

export const defaultConfig: SiteConfig = {
  version: 1,
  name: 'default',
  theme: 'ocean',
  mode: 'light',
  accent: '',
  defaultLocale: 'zh-TW',
  homeSections: ['featured', 'collection', 'about'],
  navigation: {
    position: 'top',
    items: [
      { id: 'home', enabled: true },
      { id: 'catalog', enabled: true },
      { id: 'favorites', enabled: true },
    ],
  },
}
export const configCookieName = 'site-config'
export const maxCookieLength = 3800
