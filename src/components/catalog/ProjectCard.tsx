'use client'
import { useFavorites } from '@/composables/catalog/useFavorites'
import { Icon } from '@/components/Icon'
import type { Project } from '@/services/catalog/types'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/templates/types'
export function ProjectCard({
  project,
  locale,
  dictionary: d,
  compact = false,
}: {
  project: Project
  locale: Locale
  dictionary: Dictionary
  compact?: boolean
}) {
  const { ids, toggle, ready } = useFavorites()
  const saved = ids.includes(project.id)
  return (
    <article
      data-project-card={project.id}
      className={`project-card ${compact ? 'project-card-compact' : ''}`}
    >
      <div className="project-info">
        <span className="project-meta">{d[project.category]}</span>
        <h3>{project.title}</h3>
        <p>{project.description[locale]}</p>
      </div>
      <button
        type="button"
        className="favorite-button"
        disabled={!ready}
        aria-pressed={saved}
        aria-label={`${saved ? d.unsave : d.save} ${project.title}`}
        onClick={() => toggle(project.id)}
      >
        <Icon name="star" fill={saved ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}
