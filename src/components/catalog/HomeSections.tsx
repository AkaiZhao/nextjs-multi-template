import Link from 'next/link'
import Image from 'next/image'
import { ProjectCard } from './ProjectCard'
import { Icon } from '@/components/Icon'
import type { HomeProps } from '@/templates/view-types'
export function HomeSections({
  config,
  dictionary: d,
  locale,
  projects,
  compact = false,
}: HomeProps & { compact?: boolean }) {
  const featured = projects[0]
  const collection = projects.slice(1, compact ? 5 : 4)
  return config.homeSections.map((section) => {
    if (section === 'featured' && !featured) return null
    if (section === 'featured')
      return (
        <section key={section} data-section={section} className="featured-section">
          <div className="section-heading">
            <h2>{d.featured}</h2>
            <span>{featured.year}</span>
          </div>
          <div className="featured-work">
            <div className="featured-image">
              <Image src={featured.image} alt="" width={800} height={600} priority />
            </div>
            <div className="featured-copy">
              <span>{d[featured.category]}</span>
              <h3>{featured.title}</h3>
              <p>{featured.description[locale]}</p>
              <Link
                className="text-link"
                href={`/${locale}/catalog?q=${encodeURIComponent(featured.title)}`}
              >
                {d.browse}
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      )
    if (section === 'collection')
      return (
        <section key={section} data-section={section}>
          <div className="section-heading">
            <h2>{d.collection}</h2>
            <Link href={`/${locale}/catalog`}>
              {d.allWork}
              <Icon name="arrow" />
            </Link>
          </div>
          {collection.length === 0 ? (
            <p className="empty-state" role="status">
              {d.collectionEmpty}
            </p>
          ) : (
            <div className={compact ? 'compact-grid' : 'project-grid'}>
              {collection.map((project) => (
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
        <div className="about-symbol" aria-hidden="true">
          f<span>&</span>f
        </div>
        <div>
          <h2>{d.about}</h2>
          <h3>{d.aboutTitle}</h3>
          <p>{d.aboutBody}</p>
          <Link className="text-link" href={`/${locale}/settings`}>
            {d.aboutLink}
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
    )
  })
}
