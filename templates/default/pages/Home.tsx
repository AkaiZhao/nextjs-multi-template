import Link from 'next/link'
import { HomeSections } from '@/components/catalog/HomeSections'
import type { HomeProps } from '@/templates/view-types'
import styles from '../styles/layout.module.css'
export default function Home(props: HomeProps) {
  const { dictionary: d, locale } = props
  return (
    <>
      <div className={styles.hero}>
        <h1>{d.intro}</h1>
        <div>
          <p>{d.introBody}</p>
          <Link className="button button-primary" href={`/${locale}/catalog`}>
            {d.browse}
          </Link>
          <Link className="hero-secondary" href={`/${locale}/settings`}>
            {d.customize}
          </Link>
        </div>
      </div>
      <HomeSections {...props} />
    </>
  )
}
