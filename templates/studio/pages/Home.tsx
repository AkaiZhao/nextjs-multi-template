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
          <h1>{d.intro}</h1>
          <p>{d.introBody}</p>
        </div>
        <Link className="button button-primary" href={`/${locale}/settings`}>
          {d.customize}
        </Link>
      </div>
      <HomeSections {...props} compact />
    </>
  )
}
