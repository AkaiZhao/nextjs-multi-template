import type { CatalogProps } from '@/templates/view-types'
import { CatalogContent } from '@/components/catalog/CatalogContent'
export default function Catalog(props: CatalogProps) {
  const d = props.dictionary
  return (
    <>
      <div className="page-heading">
        <h1>{props.favoritesOnly ? d.favoritesTitle : d.catalogTitle}</h1>
        <p>{props.favoritesOnly ? d.favoritesBody : d.catalogBody}</p>
      </div>
      <CatalogContent {...props} />
    </>
  )
}
