import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/settings'
import { getDictionary } from '@/i18n'
import { createTemplate } from '@/templates'
import { fetchTemplateConfig } from '@/templates/server'
import { getProjects } from '@/services/catalog'
export default async function HomePage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  if (!isLocale(lng)) notFound()
  const [config, dictionary, projects] = await Promise.all([
    fetchTemplateConfig(),
    getDictionary(lng),
    getProjects(),
  ])
  const { Home } = await createTemplate(config.name)
  return <Home config={config} locale={lng} dictionary={dictionary} projects={projects} />
}
