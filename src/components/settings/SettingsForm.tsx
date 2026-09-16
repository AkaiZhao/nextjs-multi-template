'use client'
import { useActionState, useState } from 'react'
import type { Dictionary } from '@/i18n'
import { templates } from '@/templates/configs'
import { templateNames, themeNames, type SiteConfig } from '@/templates/types'
import type { SettingsActionState } from '../../../app/[lng]/settings/actions'
import { ConfigPreview } from './ConfigPreview'
import styles from './settings.module.css'
type Props = {
  initialConfig: SiteConfig
  dictionary: Dictionary
  saveAction: (state: SettingsActionState, data: FormData) => Promise<SettingsActionState>
  resetAction: () => Promise<void>
}
function move<T>(items: T[], from: number, delta: number): T[] {
  const to = from + delta
  if (to < 0 || to >= items.length) return items
  const next = [...items]
  ;[next[from], next[to]] = [next[to], next[from]]
  return next
}
export function SettingsForm({ initialConfig, dictionary: d, saveAction, resetAction }: Props) {
  const [draft, setDraft] = useState(initialConfig)
  const [state, formAction, pending] = useActionState(saveAction, { error: null })
  function update<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }
  const templateLabels = { default: d.templateDefault, studio: d.templateStudio }
  const themeLabels = { ocean: d.themeOcean, plum: d.themePlum, forest: d.themeForest }
  return (
    <div className={styles.grid}>
      <div>
        <form action={formAction} className={styles.form}>
          <input type="hidden" name="config" value={JSON.stringify(draft)} />
          <fieldset className={styles.fieldset} disabled={pending}>
            <legend>{d.settingsDesign}</legend>
            <div className={styles.fields}>
              <label>
                {d.template}
                <select
                  value={draft.name}
                  onChange={(event) => {
                    const name = event.target.value as SiteConfig['name']
                    setDraft((current) => ({
                      ...current,
                      name,
                      navigation: {
                        ...current.navigation,
                        position: templates[name].navigationPosition,
                      },
                    }))
                  }}
                >
                  {templateNames.map((name) => (
                    <option value={name} key={name}>
                      {templateLabels[name]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {d.palette}
                <select
                  value={draft.theme}
                  onChange={(event) => update('theme', event.target.value as SiteConfig['theme'])}
                >
                  {themeNames.map((theme) => (
                    <option value={theme} key={theme}>
                      {themeLabels[theme]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {d.appearance}
                <select
                  value={draft.mode}
                  onChange={(event) => update('mode', event.target.value as SiteConfig['mode'])}
                >
                  <option value="light">{d.light}</option>
                  <option value="dark">{d.dark}</option>
                </select>
              </label>
              <label>
                {d.accent}
                <input
                  type="text"
                  value={draft.accent}
                  onChange={(event) => update('accent', event.target.value)}
                  placeholder="#2764d6"
                  pattern="#[0-9a-fA-F]{6}"
                  maxLength={7}
                  aria-describedby="accent-help"
                />
              </label>
            </div>
            <p id="accent-help" className={styles.help}>
              {d.accentHelp}
            </p>
          </fieldset>
          <fieldset className={styles.fieldset} disabled={pending}>
            <legend>{d.settingsContent}</legend>
            <p className={styles.help}>{d.orderHelp}</p>
            <ol className={styles.orderList}>
              {draft.homeSections.map((id, index) => (
                <li key={id}>
                  <span>{d[id]}</span>
                  <div>
                    <button
                      type="button"
                      disabled={index === 0}
                      aria-label={`${d.move} ${d[id]} ${d.up}`}
                      onClick={() => update('homeSections', move(draft.homeSections, index, -1))}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={index === draft.homeSections.length - 1}
                      aria-label={`${d.move} ${d[id]} ${d.down}`}
                      onClick={() => update('homeSections', move(draft.homeSections, index, 1))}
                    >
                      ↓
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </fieldset>
          <fieldset className={styles.fieldset} disabled={pending}>
            <legend>{d.settingsLocale}</legend>
            <label>
              {d.defaultLanguage}
              <select
                value={draft.defaultLocale}
                onChange={(event) =>
                  update('defaultLocale', event.target.value as SiteConfig['defaultLocale'])
                }
              >
                <option value="zh-TW">{d.chinese}</option>
                <option value="en-US">{d.english}</option>
              </select>
            </label>
            <p className={styles.help}>{d.languageHelp}</p>
          </fieldset>
          <fieldset className={styles.fieldset} disabled={pending}>
            <legend>{d.settingsNav}</legend>
            <label>
              {d.navPosition}
              <select
                value={draft.navigation.position}
                onChange={(event) =>
                  update('navigation', {
                    ...draft.navigation,
                    position: event.target.value as SiteConfig['navigation']['position'],
                  })
                }
              >
                <option value="top">{d.top}</option>
                <option value="sidebar">{d.sidebar}</option>
              </select>
            </label>
            <p className={styles.help}>{d.navHelp}</p>
            <ol className={styles.orderList}>
              {draft.navigation.items.map((item, index) => (
                <li key={item.id}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      aria-label={`${d.show} ${d[item.id]}`}
                      onChange={(event) =>
                        update('navigation', {
                          ...draft.navigation,
                          items: draft.navigation.items.map((entry) =>
                            entry.id === item.id
                              ? { ...entry, enabled: event.target.checked }
                              : entry,
                          ),
                        })
                      }
                    />
                    {d[item.id]}
                  </label>
                  <div>
                    <button
                      type="button"
                      disabled={index === 0}
                      aria-label={`${d.move} ${d[item.id]} ${d.up}`}
                      onClick={() =>
                        update('navigation', {
                          ...draft.navigation,
                          items: move(draft.navigation.items, index, -1),
                        })
                      }
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={index === draft.navigation.items.length - 1}
                      aria-label={`${d.move} ${d[item.id]} ${d.down}`}
                      onClick={() =>
                        update('navigation', {
                          ...draft.navigation,
                          items: move(draft.navigation.items, index, 1),
                        })
                      }
                    >
                      ↓
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </fieldset>
          {state.error && (
            <p role="alert" className="status-message">
              {d[state.error]}
            </p>
          )}
          <div className={styles.actions}>
            <button type="submit" className="button button-primary" disabled={pending}>
              {pending ? d.saving : d.saveConfig}
            </button>
          </div>
        </form>
        <form action={resetAction} className={styles.reset}>
          <button type="submit" className="button button-secondary" disabled={pending}>
            {d.resetConfig}
          </button>
        </form>
      </div>
      <ConfigPreview config={draft} dictionary={d} />
    </div>
  )
}
