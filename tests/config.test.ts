import { describe, expect, it } from 'vitest'
import { defaultConfig } from '@/templates/configs'
import { parseConfigCookie, serializeConfigCookie, validateSiteConfig } from '@/templates/config'

describe('site configuration cookie boundary', () => {
  it.each([
    undefined,
    '',
    '%',
    '{',
    'null',
    '[]',
    JSON.stringify({ version: 500 }),
    'x'.repeat(4000),
  ])('recovers malformed, unsupported or oversized cookies: %s', (raw) => {
    expect(parseConfigCookie(raw)).toEqual(defaultConfig)
  })
  it('round trips ordered sections and hidden navigation with a bounded cookie', () => {
    const input = {
      ...defaultConfig,
      name: 'studio',
      theme: 'plum',
      mode: 'dark',
      accent: '#aabbcc',
      defaultLocale: 'en-US',
      homeSections: ['about', 'collection', 'featured'],
      navigation: {
        position: 'sidebar',
        items: [
          { id: 'favorites', enabled: true },
          { id: 'catalog', enabled: false },
          { id: 'home', enabled: true },
        ],
      },
    }
    const valid = validateSiteConfig(input)!
    expect(valid).not.toBeNull()
    const cookie = serializeConfigCookie(valid)
    expect(encodeURIComponent(cookie).length).toBeLessThan(3800)
    expect(parseConfigCookie(cookie)).toEqual(input)
  })
  it.each([
    { name: '../../secret' },
    { accent: 'red;display:none' },
    { accent: '#abcd' },
    { defaultLocale: 'fr' },
    { homeSections: ['about', 'about', 'featured'] },
    { homeSections: ['about'] },
    { navigation: { position: 'top', items: [{ id: 'https://evil.test', enabled: true }] } },
    { navigation: { position: 'top', items: [{ id: 'home', enabled: 'false' }] } },
  ])('rejects invalid values rather than reflecting them into HTML: %j', (patch) => {
    expect(validateSiteConfig({ ...defaultConfig, ...patch })).toBeNull()
  })
  it('only copies known keys and returns independent default arrays', () => {
    const parsed = validateSiteConfig({ ...defaultConfig, injected: '<script>' })
    expect(parsed).not.toHaveProperty('injected')
    const first = parseConfigCookie(undefined)
    first.homeSections.reverse()
    expect(parseConfigCookie(undefined).homeSections).toEqual(['featured', 'collection', 'about'])
  })
})
