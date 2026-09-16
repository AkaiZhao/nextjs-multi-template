import type { SiteConfig } from '@/templates/types'
import type { Dictionary } from '@/i18n'
import { ConfigJson } from './ConfigJson'
import { configStyle } from '@/templates/style'
import styles from './settings.module.css'
export function ConfigPreview({
  config,
  dictionary: d,
}: {
  config: SiteConfig
  dictionary: Dictionary
}) {
  return (
    <aside className={styles.previewPanel} aria-label={d.preview}>
      <ConfigJson config={config} dictionary={d} />
      <details className={styles.layoutPreview}>
        <summary>{d.preview}</summary>
        <div className={styles.previewTitle}>
          <h2>{d.preview}</h2>
          <span>{d.draft}</span>
        </div>
        <p>{d.previewHint}</p>
        <div
          className={styles.preview}
          data-theme={config.theme}
          data-mode={config.mode}
          data-template={config.name}
          data-position={config.navigation.position}
          style={configStyle(config)}
        >
          <div className={styles.previewNav}>
            <strong>Demo</strong>
            {config.navigation.items
              .filter((item) => item.enabled)
              .map((item) => (
                <span key={item.id}>{d[item.id]}</span>
              ))}
          </div>
          <div className={styles.previewContent}>
            <h3>{d.intro}</h3>
            {config.homeSections.map((id) => (
              <div className={styles.previewSection} key={id} data-preview-section={id}>
                <span>{d[id]}</span>
                <div className={styles.previewBlocks}>
                  {Array.from({ length: id === 'collection' ? 3 : 1 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.previewLegend}>
          <span>{config.name === 'default' ? d.templateDefault : d.templateStudio}</span>
          <span>{config.defaultLocale === 'zh-TW' ? d.chinese : d.english}</span>
        </div>
      </details>
    </aside>
  )
}
