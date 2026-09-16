'use client'
import { useParams } from 'next/navigation'
import en from '@/i18n/locales/en-US'
import zh from '@/i18n/locales/zh-TW'
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { lng } = useParams()
  const d = lng === 'en-US' ? en : zh
  return (
    <main id="main-content" className="empty-state">
      <h1 className="text-3xl">{d.errorTitle}</h1>
      <p>{d.errorBody}</p>
      <button type="button" onClick={reset} className="button button-primary">
        {d.retry}
      </button>
    </main>
  )
}
