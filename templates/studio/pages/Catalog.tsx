import type { CatalogProps } from '@/templates/view-types'
import { CatalogContent } from '@/components/catalog/CatalogContent'
import styles from '../styles/layout.module.css'
export default function Catalog(props: CatalogProps) {
  const d = props.dictionary
  return (
    <>
      <div className={styles.catalogHeading}>
        <p>{props.favoritesOnly ? d.favorites : d.catalog}</p>
        <h1>{props.favoritesOnly ? d.favoritesTitle : d.catalogTitle}</h1>
        <p>{props.favoritesOnly ? d.favoritesBody : d.catalogBody}</p>
      </div>
      <CatalogContent {...props} compact />
    </>
  )
}
