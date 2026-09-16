import Link from 'next/link'
export default function NotFound() {
  return (
    <main style={{ padding: '15vh 8vw', fontFamily: 'sans-serif', lineHeight: 1.7 }}>
      <h1>找不到這個頁面 / Page not found</h1>
      <p>這個網址不在作品集裡。 / This address is outside the collection.</p>
      <Link href="/zh-TW">返回作品集</Link> / <Link href="/en-US">Back to the collection</Link>
    </main>
  )
}
