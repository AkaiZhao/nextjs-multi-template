import { defaultConfig, maxCookieLength } from './configs'
import { homeSectionIds, navigationIds, templateNames, themeNames, type SiteConfig } from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function includes<T extends string>(values: readonly T[], input: unknown): input is T {
  return typeof input === 'string' && values.includes(input as T)
}
function isPermutation<T extends string>(input: unknown, allowed: readonly T[]): input is T[] {
  return (
    Array.isArray(input) &&
    input.length === allowed.length &&
    new Set(input).size === allowed.length &&
    input.every((value) => includes(allowed, value))
  )
}
/** Fail closed on writes; only copy validated fields, never spread untrusted JSON. */
export function validateSiteConfig(input: unknown): SiteConfig | null {
  if (!isRecord(input) || input.version !== 1) return null
  if (!includes(templateNames, input.name) || !includes(themeNames, input.theme)) return null
  if (
    !includes(['light', 'dark'], input.mode) ||
    !includes(['zh-TW', 'en-US'], input.defaultLocale)
  )
    return null
  if (
    typeof input.accent !== 'string' ||
    (input.accent !== '' && !/^#[\da-f]{6}$/i.test(input.accent))
  )
    return null
  if (!isPermutation(input.homeSections, homeSectionIds)) return null
  const nav = input.navigation
  if (!isRecord(nav) || !includes(['top', 'sidebar'], nav.position) || !Array.isArray(nav.items))
    return null
  if (
    !nav.items.every(
      (item) =>
        isRecord(item) && includes(navigationIds, item.id) && typeof item.enabled === 'boolean',
    )
  )
    return null
  if (
    !isPermutation(
      nav.items.map((item) => item.id),
      navigationIds,
    )
  )
    return null
  return {
    version: 1,
    name: input.name,
    theme: input.theme,
    mode: input.mode,
    accent: input.accent,
    defaultLocale: input.defaultLocale,
    homeSections: [...input.homeSections],
    navigation: {
      position: nav.position,
      items: nav.items.map((item) => ({ id: item.id, enabled: item.enabled })),
    },
  }
}
export function readConfigCookie(value?: string): SiteConfig | null {
  if (!value || value.length > maxCookieLength) return null
  try {
    if (encodeURIComponent(value).length > maxCookieLength) return null
    return validateSiteConfig(JSON.parse(value))
  } catch {
    return null
  }
}
export function parseConfigCookie(value?: string): SiteConfig {
  return readConfigCookie(value) ?? structuredClone(defaultConfig)
}
export function serializeConfigCookie(config: SiteConfig): string {
  const valid = validateSiteConfig(config)
  if (!valid) throw new Error('Invalid site configuration')
  const value = JSON.stringify(valid)
  if (encodeURIComponent(value).length > maxCookieLength)
    throw new Error('Configuration exceeds cookie limit')
  return value
}
