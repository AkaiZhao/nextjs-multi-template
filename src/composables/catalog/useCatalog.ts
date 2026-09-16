'use client'
import type { Project } from '@/services/catalog/types'
import type { Locale } from '@/templates/types'
import { useFavorites } from './useFavorites'
export function useCatalog(
  projects: Project[],
  locale: Locale,
  query: string,
  category: string,
  favoritesOnly: boolean,
) {
  const favorites = useFavorites()
  const term = query.trim().toLocaleLowerCase(locale)
  const filtered = projects.filter((project) => {
    const haystack = [project.title, project.description[locale], ...project.tags]
      .join(' ')
      .toLocaleLowerCase(locale)
    return (
      (!term || haystack.includes(term)) &&
      (!category || project.category === category) &&
      (!favoritesOnly || favorites.ids.includes(project.id))
    )
  })
  return { projects: filtered, ready: !favoritesOnly || favorites.ready }
}
