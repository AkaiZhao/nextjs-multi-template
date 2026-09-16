import Link from 'next/link'
import type { LayoutProps } from '@/templates/view-types'
import { Navigation } from '@/components/layout/Navigation'
import { SiteTools } from '@/components/layout/SiteTools'
import styles from '../styles/layout.module.css'
export default function StudioLayout({ children, ...context }: LayoutProps) {
  const { config, locale, dictionary: d } = context
  return (
    <div className={styles.shell} data-navigation={config.navigation.position}>
      <header className={styles.header}>
        <Link className="wordmark" href={`/${locale}`}>
          <span className={styles.monogram} aria-hidden="true">
            f/f
          </span>
          {d.brand}
          <span>{d.tagline}</span>
        </Link>
        <Navigation {...context} />
        <SiteTools {...context} />
        <p className={styles.note}>{d.footer}</p>
      </header>
      <main id="main-content" className={styles.main}>
        <div className={styles.toolbar}>
          <span>{d.templateStudio}</span>
          <span>{d.demo}</span>
        </div>
        {children}
        <footer className={styles.footer}>
          {d.brand} / {d.footer}
        </footer>
      </main>
    </div>
  )
}
