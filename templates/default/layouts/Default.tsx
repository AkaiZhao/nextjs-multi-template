import Link from 'next/link'
import type { LayoutProps } from '@/templates/view-types'
import { Navigation } from '@/components/layout/Navigation'
import { SiteTools } from '@/components/layout/SiteTools'
import styles from '../styles/layout.module.css'
export default function DefaultLayout({ children, ...context }: LayoutProps) {
  const { config, locale, dictionary: d } = context
  return (
    <div className={styles.shell} data-navigation={config.navigation.position}>
      <header className={styles.header}>
        <Link href={`/${locale}`} className="wordmark">
          {d.brand}
          <span>{d.tagline}</span>
        </Link>
        <Navigation {...context} />
        <SiteTools {...context} />
      </header>
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <span>{d.brand}</span>
        <p>{d.footer}</p>
        <span>{d.demo}</span>
      </footer>
    </div>
  )
}
