import type { Locale } from '@/templates/types'
export type Category = 'identity' | 'digital' | 'experiment'
export type Project = {
  id: string
  title: string
  description: Record<Locale, string>
  category: Category
  tags: string[]
}
