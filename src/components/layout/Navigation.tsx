'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { TemplateContext } from '@/templates/view-types'
import { localizedRoute } from '@/utils/constants/route'
export function Navigation({ config, locale, dictionary: d }: TemplateContext) {
  const pathname = usePathname()
  return (
    <nav className="site-navigation" aria-label={d.mainNavigation}>
      {config.navigation.items
        .filter((item) => item.enabled)
        .map((item) => {
          const href = localizedRoute(locale, item.id)
          return (
            <Link key={item.id} href={href} aria-current={pathname === href ? 'page' : undefined}>
              {d[item.id]}
            </Link>
          )
        })}
    </nav>
  )
}
