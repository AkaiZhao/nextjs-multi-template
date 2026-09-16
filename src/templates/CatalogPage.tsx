import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/settings'
import { getDictionary } from '@/i18n'
import { createTemplate } from '@/templates'
import { fetchTemplateConfig } from '@/templates/server'
import { getProjects } from '@/services/catalog'
export type CatalogPageProps = {
  params: Promise<{ lng: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
export async function CatalogPage({
  params,
  searchParams,
  favoritesOnly = false,
}: CatalogPageProps & { favoritesOnly?: boolean }) {
  const { lng } = await params
  if (!isLocale(lng)) notFound()
  const [config, dictionary, projects, search] = await Promise.all([
    fetchTemplateConfig(),
    getDictionary(lng),
    getProjects(),
    searchParams,
  ])
  const { Catalog } = await createTemplate(config.name)
  const query = typeof search.q === 'string' ? search.q.slice(0, 120) : ''
  const category =
    typeof search.category === 'string' &&
    ['identity', 'digital', 'experiment'].includes(search.category)
      ? search.category
      : ''
  return (
    <Catalog
      config={config}
      locale={lng}
      dictionary={dictionary}
      projects={projects}
      query={query}
      category={category}
      favoritesOnly={favoritesOnly}
    />
  )
}
