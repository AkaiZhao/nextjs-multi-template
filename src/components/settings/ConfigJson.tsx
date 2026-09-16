'use client'
import { useState } from 'react'
import type { SiteConfig } from '@/templates/types'
import type { Dictionary } from '@/i18n'
import { validateSiteConfig } from '@/templates/config'
import styles from './settings.module.css'

export function ConfigJson({
  config,
  dictionary: d,
}: {
  config: SiteConfig
  dictionary: Dictionary
}) {
  const json = JSON.stringify(config, null, 2)
  const [result, setResult] = useState<{ json: string; ok: boolean } | null>(null)
  async function copy() {
    try {
      await navigator.clipboard.writeText(json)
      setResult({ json, ok: true })
    } catch {
      setResult({ json, ok: false })
    }
  }
  return (
    <section className={styles.jsonPanel} aria-labelledby="config-json-title">
      <div className={styles.previewTitle}>
        <h2 id="config-json-title">{d.configJson}</h2>
        <button type="button" className="button button-secondary" onClick={copy}>
          {d.copyJson}
        </button>
      </div>
      <p id="config-json-help" className={styles.help}>
        {d.jsonHint}
      </p>
      <textarea
        className={styles.jsonCode}
        aria-label={d.configJson}
        aria-describedby="config-json-help"
        readOnly
        spellCheck={false}
        wrap="off"
        value={json}
      />
      {!validateSiteConfig(config) && <p className={styles.help}>{d.invalidDraft}</p>}
      <p className={styles.copyStatus} aria-live="polite">
        {result?.json === json ? (result.ok ? d.jsonCopied : d.copyFailed) : ''}
      </p>
    </section>
  )
}
