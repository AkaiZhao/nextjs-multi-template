import Link from 'next/link'
import { Suspense } from 'react'
import type { TemplateContext } from '@/templates/view-types'
import { LanguageSwitch } from './LanguageSwitch'
import { Icon } from '@/components/Icon'
export function SiteTools({
  locale,
  dictionary: d,
}: Pick<TemplateContext, 'locale' | 'dictionary'>) {
  return (
    <div className="site-tools">
      <Suspense>
        <LanguageSwitch locale={locale} />
      </Suspense>
      <Link className="settings-link" href={`/${locale}/settings`} aria-label={d.settings}>
        <Icon name="settings" />
        <span>{d.settings}</span>
      </Link>
    </div>
  )
}
