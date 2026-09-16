'use client'
import Image from 'next/image'
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
      <div className="project-art">
        <Image
          src={project.image}
          alt=""
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
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
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>{d[project.category]}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description[locale]}</p>
      </div>
    </article>
  )
}
