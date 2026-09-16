import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/settings'
import { getDictionary } from '@/i18n'
import { fetchTemplateConfig } from '@/templates/server'
import { SettingsForm } from '@/components/settings/SettingsForm'
import { SiteTools } from '@/components/layout/SiteTools'
import { saveSiteConfig, resetSiteConfig } from './actions'
import styles from '@/components/settings/settings.module.css'
export default async function SettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lng: string }>
  searchParams: Promise<{ saved?: string; reset?: string }>
}) {
  const { lng } = await params
  if (!isLocale(lng)) notFound()
  const [config, dictionary, query] = await Promise.all([
    fetchTemplateConfig(),
    getDictionary(lng),
    searchParams,
  ])
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className="wordmark" href={`/${lng}`}>
          {dictionary.brand}
        </Link>
        <SiteTools locale={lng} dictionary={dictionary} />
      </header>
      <main id="main-content">
        <div className={styles.heading}>
          <Link href={`/${lng}`}>{dictionary.backSite}</Link>
          <h1>{dictionary.settingsTitle}</h1>
          <p>{dictionary.settingsBody}</p>
        </div>
        {(query.saved === '1' || query.reset === '1') && (
          <p role="status" className="status-message">
            {query.saved === '1' ? dictionary.saved : dictionary.resetDone}
          </p>
        )}
        <SettingsForm
          key={JSON.stringify(config)}
          initialConfig={config}
          dictionary={dictionary}
          saveAction={saveSiteConfig}
          resetAction={resetSiteConfig}
        />
      </main>
    </div>
  )
}
