import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/settings'
import { getDictionary } from '@/i18n'
import { createTemplate } from '@/templates'
import { fetchTemplateConfig } from '@/templates/server'
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params
  if (!isLocale(lng)) notFound()
  const [config, dictionary] = await Promise.all([fetchTemplateConfig(), getDictionary(lng)])
  const { Layout } = await createTemplate(config.name)
  return (
    <Layout config={config} locale={lng} dictionary={dictionary}>
      {children}
    </Layout>
  )
}
