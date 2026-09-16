'use client'
import Link from 'next/link'
import { useCatalog } from '@/composables/catalog/useCatalog'
import type { CatalogProps } from '@/templates/view-types'
import { ProjectCard } from './ProjectCard'
import { Icon } from '@/components/Icon'
export function CatalogContent({
  projects,
  locale,
  dictionary: d,
  query,
  category,
  favoritesOnly = false,
  compact = false,
}: CatalogProps & { compact?: boolean }) {
  const result = useCatalog(projects, locale, query, category, favoritesOnly)
  const base = `/${locale}/${favoritesOnly ? 'favorites' : 'catalog'}`
  return (
    <>
      <form role="search" className="catalog-filters" action={base}>
        <div className="search-field">
          <Icon name="search" />
          <input
            type="search"
            name="q"
            aria-label={d.searchLabel}
            placeholder={d.searchPlaceholder}
            defaultValue={query}
            maxLength={120}
          />
        </div>
        <select name="category" aria-label={d.category} defaultValue={category}>
          <option value="">{d.all}</option>
          {(['identity', 'digital', 'experiment'] as const).map((id) => (
            <option value={id} key={id}>
              {d[id]}
            </option>
          ))}
        </select>
        <button className="button button-primary" type="submit">
          {d.search}
        </button>
      </form>
      {!result.ready ? (
        <p className="empty-state" role="status">
          {d.loading}
        </p>
      ) : (
        <>
          <div className="catalog-summary">
            <span>
              {result.projects.length} {d.results}
            </span>
            {(query || category) && <Link href={base}>{d.clear}</Link>}
          </div>
          {result.projects.length > 0 ? (
            <div className={compact ? 'compact-grid' : 'project-grid'}>
              {result.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  dictionary={d}
                  compact={compact}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="grid" width={36} height={36} />
              <h2>{favoritesOnly && !query && !category ? d.favoritesEmpty : d.noResults}</h2>
              <p>{favoritesOnly && !query && !category ? d.favoritesEmptyBody : ''}</p>
              <Link className="button button-secondary" href={`/${locale}/catalog`}>
                {d.browse}
              </Link>
            </div>
          )}
        </>
      )}
    </>
  )
}
