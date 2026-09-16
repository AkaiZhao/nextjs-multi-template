import Link from 'next/link'
export default function NotFound() {
  return (
    <main style={{ padding: '15vh 8vw', fontFamily: 'sans-serif', lineHeight: 1.7 }}>
      <h1>找不到這個頁面 / Page not found</h1>
      <p>請確認網址後再試一次。 / Please check the address and try again.</p>
      <Link href="/zh-TW">返回首頁</Link> / <Link href="/en-US">Back to home</Link>
    </main>
  )
}
