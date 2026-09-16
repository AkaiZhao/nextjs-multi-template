import Link from 'next/link'
import { ProjectCard } from './ProjectCard'
import type { HomeProps } from '@/templates/view-types'
export function HomeSections({
  config,
  dictionary: d,
  locale,
  projects,
  compact = false,
}: HomeProps & { compact?: boolean }) {
  return config.homeSections.map((section) => {
    if (section === 'featured')
      return (
        <section key={section} data-section={section}>
          <div className="section-heading">
            <h2>{d.featured}</h2>
          </div>
          <ol className="config-flow">
            <li>
              <h3>{d.flowEdit}</h3>
              <p>{d.flowEditBody}</p>
              <code>SiteConfig</code>
            </li>
            <li>
              <h3>{d.flowSave}</h3>
              <p>{d.flowSaveBody}</p>
              <code>validateSiteConfig → cookie</code>
            </li>
            <li>
              <h3>{d.flowRender}</h3>
              <p>{d.flowRenderBody}</p>
              <code>createTemplate → SSR</code>
            </li>
          </ol>
        </section>
      )
    if (section === 'collection')
      return (
        <section key={section} data-section={section}>
          <div className="section-heading">
            <h2>{d.collection}</h2>
            <Link className="text-link" href={`/${locale}/catalog`}>
              {d.allWork}
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="empty-state" role="status">
              {d.collectionEmpty}
            </p>
          ) : (
            <div className={compact ? 'compact-grid' : 'project-grid'}>
              {projects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  dictionary={d}
                  compact={compact}
                />
              ))}
            </div>
          )}
        </section>
      )
    return (
      <section key={section} data-section={section} className="about-section">
        <h2>{d.about}</h2>
        <h3>{d.aboutTitle}</h3>
        <p>{d.aboutBody}</p>
        <Link className="text-link" href={`/${locale}/settings`}>
          {d.aboutLink}
        </Link>
      </section>
    )
  })
}
