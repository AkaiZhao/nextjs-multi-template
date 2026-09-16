import type { ComponentType, ReactNode } from 'react'
import type { Dictionary } from '@/i18n'
import type { Project } from '@/services/catalog/types'
import type { Locale, SiteConfig } from './types'
export type TemplateContext = { config: SiteConfig; locale: Locale; dictionary: Dictionary }
export type LayoutProps = TemplateContext & { children: ReactNode }
export type HomeProps = TemplateContext & { projects: Project[] }
export type CatalogProps = HomeProps & { favoritesOnly?: boolean; query: string; category: string }
export type TemplateModule = {
  Layout: ComponentType<LayoutProps>
  Home: ComponentType<HomeProps>
  Catalog: ComponentType<CatalogProps>
}
