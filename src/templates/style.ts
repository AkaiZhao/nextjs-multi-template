import type { CSSProperties } from 'react'
import type { SiteConfig } from './types'
/** Choose a readable foreground for arbitrary validated accent colors. */
export function configStyle(config: SiteConfig): CSSProperties {
  if (!/^#[\da-f]{6}$/i.test(config.accent)) return {}
  const channels = config.accent
    .slice(1)
    .match(/../g)!
    .map((hex) => {
      const value = parseInt(hex, 16) / 255
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    })
  const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  return {
    '--accent': config.accent,
    '--on-accent': luminance > 0.179 ? '#000000' : '#ffffff',
  } as CSSProperties
}
