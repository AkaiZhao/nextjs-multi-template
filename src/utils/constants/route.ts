import type { NavigationId, Locale } from '@/templates/types'
export const ROUTE_PATHS = {
  home: '',
  catalog: '/catalog',
  favorites: '/favorites',
  settings: '/settings',
} as const
export function localizedRoute(locale: Locale, page: NavigationId | 'settings') {
  return `/${locale}${ROUTE_PATHS[page]}`
}
