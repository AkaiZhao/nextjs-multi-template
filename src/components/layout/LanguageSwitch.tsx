'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import type { Locale } from '@/templates/types'
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const nextLocale = locale === 'en-US' ? 'zh-TW' : 'en-US'
  const segments = pathname.split('/')
  segments[1] = nextLocale
  const href = segments.join('/') + (search ? `?${search}` : '')
  return (
    <Link className="language-link" href={href} hrefLang={nextLocale} lang={nextLocale}>
      {nextLocale === 'en-US' ? 'English' : '繁體中文'}
    </Link>
  )
}
