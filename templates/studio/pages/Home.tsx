import Link from 'next/link'
import type { HomeProps } from '@/templates/view-types'
import { HomeSections } from '@/components/catalog/HomeSections'
import styles from '../styles/layout.module.css'
export default function Home(props: HomeProps) {
  const { dictionary: d, locale } = props
  return (
    <>
      <div className={styles.hero}>
        <div>
          <p>{d.collectionSize}</p>
          <h1>{d.intro}</h1>
        </div>
        <Link className="button button-primary" href={`/${locale}/catalog`}>
          {d.browse}
        </Link>
      </div>
      <HomeSections {...props} compact />
    </>
  )
}
