import { getTranslation } from '@/lib/i18n'

type I18nProps = {
  params: { lng: string }
}
export default async function I18n({ params: { lng } }: I18nProps) {
  const { t } = await getTranslation(lng, 'common')

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-3xl uppercase">test i18n</div>
      <p className="pb-4">i18n with next-i18next</p>
      <div className="text-xl font-bold mb-3 ">
        <p className="text-text-primary">{t('test')}</p>
        <p className="text-text-primary">{t('success')}</p>
        <p className="text-text-primary">{t('error')}</p>
      </div>
    </main>
  )
}
