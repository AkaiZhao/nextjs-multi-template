import { redirect } from 'next/navigation'
import { isLocale } from '@/i18n/settings'
import { notFound } from 'next/navigation'
export default async function LegacyPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  if (!isLocale(lng)) notFound()
  redirect(`/${lng}/settings`)
}
