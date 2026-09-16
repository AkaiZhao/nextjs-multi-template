import { expect, test } from '@playwright/test'

test('settings survive first HTML, reload and direct routes; reset restores defaults', async ({
  page,
  context,
  request,
}) => {
  await page.goto('/en-US/settings')
  await page.getByRole('combobox', { name: 'Template', exact: true }).selectOption('studio')
  await page.getByLabel('Color palette').selectOption('plum')
  await page.getByLabel('Appearance').selectOption('dark')
  await page.getByLabel('Accent color', { exact: true }).fill('#c4a8ff')
  await page.getByLabel('Default language').selectOption('en-US')
  await page.getByLabel('Navigation position').selectOption('sidebar')
  await page.getByRole('button', { name: 'Move Implementation notes up' }).click()
  await page.getByRole('button', { name: 'Move Implementation notes up' }).click()
  await page.getByLabel('Show Examples').uncheck()
  await page.getByRole('button', { name: 'Move Favorites up' }).click()
  await page.getByRole('button', { name: 'Move Favorites up' }).click()
  await page.getByRole('button', { name: 'Save configuration' }).click()
  await expect(page.getByRole('status')).toContainText('saved')
  await page.goto('/en-US')
  await expect(page.locator('body')).toHaveAttribute('data-template', 'studio')
  await expect(page.locator('body')).toHaveAttribute('data-mode', 'dark')
  await expect(page.locator('main [data-section]').first()).toHaveAttribute('data-section', 'about')
  const navigation = page.getByRole('navigation', { name: 'Main navigation' })
  await expect(navigation.getByRole('link', { name: 'Examples', exact: true })).toHaveCount(0)
  await expect(navigation.getByRole('link').first()).toHaveText('Favorites')
  await page.reload()
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'plum')
  const cookie = (await context.cookies()).find((c) => c.name === 'site-config')!
  expect(cookie.httpOnly).toBe(true)
  expect(cookie.sameSite).toBe('Lax')
  const html = await (
    await request.get('/en-US/catalog', { headers: { cookie: `site-config=${cookie.value}` } })
  ).text()
  expect(html).toContain('data-template="studio"')
  expect(html).toContain('--accent:#c4a8ff')
  await page.goto('/')
  await expect(page).toHaveURL(/\/en-US$/)
  await page.goto('/en-US/settings')
  await page.getByRole('button', { name: 'Reset to defaults' }).click()
  await expect(page).toHaveURL(/\/zh-TW\/settings\?reset=1$/)
  await page.goto('/zh-TW')
  await expect(page.locator('body')).toHaveAttribute('data-template', 'default')
})

test('shared search and favorites survive template changes', async ({ page }) => {
  await page.goto('/en-US/catalog')
  await page.getByRole('searchbox').fill('registry')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page).toHaveURL(/q=registry/)
  await expect(page.locator('[data-project-card]')).toHaveCount(1)
  await page.getByRole('button', { name: 'Save Template registry' }).click()
  await page.goto('/en-US/settings')
  await page.getByRole('combobox', { name: 'Template', exact: true }).selectOption('studio')
  await page.getByLabel('Default language').selectOption('en-US')
  await page.getByRole('button', { name: 'Save configuration' }).click()
  await page.goto('/en-US/favorites')
  await expect(page.locator('[data-project-card]')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Template registry', exact: true })).toBeVisible()
  await page.reload()
  await expect(page.locator('[data-project-card]')).toHaveCount(1)
  await page.getByRole('button', { name: 'Unsave Template registry' }).click()
  await expect(page.getByText('No saved examples yet.')).toBeVisible()
})

test('locale boundaries, empty search and mobile layout', async ({ page }) => {
  await page.goto('/zh-HK/catalog?q=missing')
  await expect(page).toHaveURL(/\/zh-TW\/catalog\?q=missing$/)
  await expect(page.getByText('找不到符合條件的範例。')).toBeVisible()
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL(/\/en-US\/catalog\?q=missing$/)
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/en-US', '/en-US/settings', '/en-US/catalog']) {
    await page.goto(path)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
  }
  const response = await page.goto('/fr/catalog')
  expect(response?.status()).toBe(404)
})

test('every template supports both navigation positions on desktop and mobile', async ({
  page,
  context,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const name of ['default', 'studio']) {
    for (const position of ['top', 'sidebar']) {
      const config = {
        version: 1,
        name,
        theme: 'forest',
        mode: 'dark',
        accent: '',
        defaultLocale: 'zh-TW',
        homeSections: ['featured', 'collection', 'about'],
        navigation: {
          position,
          items: [
            { id: 'home', enabled: true },
            { id: 'catalog', enabled: true },
            { id: 'favorites', enabled: true },
          ],
        },
      }
      await context.addCookies([
        {
          name: 'site-config',
          value: encodeURIComponent(JSON.stringify(config)),
          domain: 'localhost',
          path: '/',
        },
      ])
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto('/zh-TW')
        await expect(page.locator('body')).toHaveAttribute('data-template', name)
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        ).toBe(true)
        await expect(page.getByRole('link', { name: '網站設定', exact: true })).toBeVisible()
        await page.getByRole('link', { name: '網站設定', exact: true }).click()
        await expect(page.getByRole('button', { name: '儲存設定' })).toBeVisible()
      }
    }
  }
  expect(errors).toEqual([])
})

test('invalid writes are rejected and corrupt cookies cannot break server rendering', async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: 'site-config', value: '%7Bbad', domain: 'localhost', path: '/' },
  ])
  await page.goto('/en-US/settings')
  await expect(page.locator('body')).toHaveAttribute('data-template', 'default')
  await page.locator('input[name="config"]').evaluate((input: HTMLInputElement) => {
    input.value = JSON.stringify({ version: 1, name: '../../invalid' })
  })
  await page.getByRole('button', { name: 'Save configuration' }).click()
  await expect(
    page.getByRole('alert').filter({ hasText: 'configuration is invalid' }),
  ).toBeVisible()
  expect((await context.cookies()).find((cookie) => cookie.name === 'site-config')?.value).toBe(
    '%7Bbad',
  )
})

test('custom light or dark accents keep focus and button boundaries visible', async ({
  page,
  context,
}) => {
  for (const [mode, accent] of [
    ['light', '#ffffff'],
    ['dark', '#000000'],
  ]) {
    const config = {
      version: 1,
      name: 'default',
      theme: 'ocean',
      mode,
      accent,
      defaultLocale: 'en-US',
      homeSections: ['featured', 'collection', 'about'],
      navigation: {
        position: 'top',
        items: [
          { id: 'home', enabled: true },
          { id: 'catalog', enabled: true },
          { id: 'favorites', enabled: true },
        ],
      },
    }
    await context.addCookies([
      {
        name: 'site-config',
        value: encodeURIComponent(JSON.stringify(config)),
        domain: 'localhost',
        path: '/',
      },
    ])
    await page.goto('/en-US')
    const button = page.getByRole('link', { name: 'Edit configuration', exact: true }).first()
    await button.focus()
    const colors = await button.evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        background: style.backgroundColor,
        outline: style.outlineColor,
        border: style.borderTopColor,
        outlineStyle: style.outlineStyle,
      }
    })
    expect(colors.outlineStyle).toBe('solid')
    expect(colors.outline).not.toBe(colors.background)
    expect(colors.border).not.toBe(colors.background)
  }
})

test('configuration JSON follows the draft and matches the saved cookie', async ({
  page,
  context,
}) => {
  await page.goto('/en-US/settings')
  const json = page.getByRole('textbox', { name: 'Configuration JSON', exact: true })
  await expect(json).toBeVisible()
  await page.getByRole('combobox', { name: 'Template', exact: true }).selectOption('studio')
  await page.getByLabel('Color palette').selectOption('forest')
  await page.getByLabel('Default language').selectOption('en-US')
  await page.getByRole('button', { name: 'Move Implementation notes up' }).click()
  await page.getByLabel('Show Favorites').uncheck()
  const draft = JSON.parse(await json.inputValue())
  expect(draft.name).toBe('studio')
  expect(draft.theme).toBe('forest')
  expect(draft.homeSections).toEqual(['featured', 'about', 'collection'])
  expect(
    draft.navigation.items.find((item: { id: string }) => item.id === 'favorites').enabled,
  ).toBe(false)
  expect((await context.cookies()).some((cookie) => cookie.name === 'site-config')).toBe(false)
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          ;(window as unknown as { copiedJson: string }).copiedJson = text
        },
      },
    }),
  )
  await page.getByRole('button', { name: 'Copy JSON', exact: true }).click()
  expect(await page.evaluate(() => (window as unknown as { copiedJson: string }).copiedJson)).toBe(
    await json.inputValue(),
  )
  await expect(page.getByText('JSON copied.', { exact: true })).toBeVisible()
  await page.getByLabel('Accent color', { exact: true }).fill('#bad')
  await expect(
    page.getByText('Draft contains invalid values. Correct them before saving.', { exact: true }),
  ).toBeVisible()
  expect(JSON.parse(await json.inputValue()).accent).toBe('#bad')
  await expect(page.getByText('JSON copied.', { exact: true })).toHaveCount(0)
  await page.getByLabel('Accent color', { exact: true }).fill('#123456')
  const saved = JSON.parse(await json.inputValue())
  await page.getByRole('button', { name: 'Save configuration' }).click()
  await expect(page.getByRole('status')).toContainText('saved')
  const cookie = (await context.cookies()).find((cookie) => cookie.name === 'site-config')!
  expect(JSON.parse(decodeURIComponent(cookie.value))).toEqual(saved)
  await page.reload()
  expect(JSON.parse(await json.inputValue())).toEqual(saved)
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error('denied')
        },
      },
    }),
  )
  await page.getByRole('button', { name: 'Copy JSON', exact: true }).click()
  await expect(
    page.getByText('Copy unavailable. Select the JSON and copy it manually.', { exact: true }),
  ).toBeVisible()
})
