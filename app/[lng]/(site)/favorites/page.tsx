import { CatalogPage, type CatalogPageProps } from '@/templates/CatalogPage'
export default function FavoritesPage(props: CatalogPageProps) {
  return <CatalogPage {...props} favoritesOnly />
}
