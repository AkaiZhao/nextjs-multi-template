import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/settings'
import { getDictionary, getTranslation } from '@/i18n'
import { fetchTemplateConfig } from '@/templates/server'
import { configStyle } from '@/templates/style'
import { FavoritesProvider } from '@/components/FavoritesProvider'
import '../../styles/globals.css'

type Props = { children: React.ReactNode; params: Promise<{ lng: string }> }
export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { lng } = await params
  if (!isLocale(lng)) return { title: 'Form & Field' }
  const { t } = await getTranslation(lng)
  return {
    title: { default: t('brand'), template: `%s | ${t('brand')}` },
    description: t('introBody'),
  }
}
export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params
  if (!isLocale(lng)) notFound()
  const [config, d] = await Promise.all([fetchTemplateConfig(), getDictionary(lng)])
  return (
    <html lang={lng}>
      <body
        data-template={config.name}
        data-theme={config.theme}
        data-mode={config.mode}
        style={configStyle(config)}
      >
        <a href="#main-content" className="skip-link">
          {d.skip}
        </a>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  )
}
