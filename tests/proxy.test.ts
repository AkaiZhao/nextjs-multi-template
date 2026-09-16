import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '../proxy'
import { defaultConfig } from '@/templates/configs'

describe('locale redirect and config priority', () => {
  const request = (path: string, headers: HeadersInit = {}) =>
    new NextRequest(`http://localhost:3000${path}`, { headers })
  it('returns the language redirect and preserves search parameters', () => {
    const result = proxy(request('/catalog?q=paper', { 'accept-language': 'en-US,en;q=0.9' }))
    expect(result.headers.get('location')).toBe('http://localhost:3000/en-US/catalog?q=paper')
  })
  it('uses saved default ahead of browser preference', () => {
    const result = proxy(
      request('/', {
        cookie: `site-config=${encodeURIComponent(JSON.stringify({ ...defaultConfig, defaultLocale: 'zh-TW' }))}`,
        'accept-language': 'en-US',
      }),
    )
    expect(result.headers.get('location')).toBe('http://localhost:3000/zh-TW')
  })
  it('keeps explicit URL language without resetting configuration cookies', () => {
    const result = proxy(
      request('/en-US/catalog', {
        cookie: `site-config=${encodeURIComponent(JSON.stringify(defaultConfig))}`,
      }),
    )
    expect(result.headers.get('location')).toBeNull()
    expect(result.headers.get('set-cookie')).toBeNull()
  })
  it.each(['/zh-HK/catalog', '/zh-CN/catalog'])('redirects legacy Chinese links %s', (path) => {
    expect(proxy(request(path)).headers.get('location')).toBe('http://localhost:3000/zh-TW/catalog')
  })
  it('does not accept locale prefixes as complete segments', () => {
    expect(proxy(request('/en-US-evil')).headers.get('location')).toBe(
      'http://localhost:3000/zh-TW/en-US-evil',
    )
  })
  it('honors language quality weights including exclusions', () => {
    expect(
      proxy(request('/', { 'accept-language': 'en-US;q=0,zh;q=0.8' })).headers.get('location'),
    ).toBe('http://localhost:3000/zh-TW')
  })
  it('ignores malformed configuration and uses the browser language', () => {
    expect(
      proxy(request('/', { cookie: 'site-config=invalid', 'accept-language': 'en' })).headers.get(
        'location',
      ),
    ).toBe('http://localhost:3000/en-US')
  })
})

describe('locale case normalization', () => {
  it.each([
    ['/EN-US/catalog?q=paper', 'http://localhost:3000/en-US/catalog?q=paper'],
    ['/zh-cn/catalog', 'http://localhost:3000/zh-TW/catalog'],
    ['/zh-hk/catalog', 'http://localhost:3000/zh-TW/catalog'],
    ['/ZH-tw', 'http://localhost:3000/zh-TW'],
  ])('canonicalizes %s without nesting a second locale', (path, expected) => {
    expect(proxy(new NextRequest(`http://localhost:3000${path}`)).headers.get('location')).toBe(
      expected,
    )
  })
  it('lets unsupported lowercase locale segments reach the 404 boundary', () => {
    expect(
      proxy(new NextRequest('http://localhost:3000/fr-fr/catalog')).headers.get('location'),
    ).toBeNull()
  })
})
