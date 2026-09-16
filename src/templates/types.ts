export const templateNames = ['default', 'studio'] as const
export const themeNames = ['ocean', 'plum', 'forest'] as const
export const homeSectionIds = ['featured', 'collection', 'about'] as const
export const navigationIds = ['home', 'catalog', 'favorites'] as const
export type TemplateName = (typeof templateNames)[number]
export type ThemeName = (typeof themeNames)[number]
export type HomeSectionId = (typeof homeSectionIds)[number]
export type NavigationId = (typeof navigationIds)[number]
export type Locale = 'zh-TW' | 'en-US'
export type SiteConfig = {
  version: 1
  name: TemplateName
  theme: ThemeName
  mode: 'light' | 'dark'
  accent: string
  defaultLocale: Locale
  homeSections: HomeSectionId[]
  navigation: {
    position: 'top' | 'sidebar'
    items: { id: NavigationId; enabled: boolean }[]
  }
}
