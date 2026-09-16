import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HomeSections } from '@/components/catalog/HomeSections'
import { defaultConfig } from '@/templates/configs'
import en from '@/i18n/locales/en-US'

describe('homepage with an empty service response', () => {
  it('keeps the about section and renders a localized empty state instead of throwing', () => {
    const html = renderToStaticMarkup(
      createElement(HomeSections, {
        config: defaultConfig,
        dictionary: en,
        locale: 'en-US',
        projects: [],
      }),
    )
    expect(html).toContain('Implementation notes')
    expect(html).toContain('No examples available.')
    expect(html).not.toContain('data-project-card')
  })
})
