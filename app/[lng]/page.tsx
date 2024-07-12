import { cookies } from 'next/headers'

export default async function Home() {
  const theme = cookies().get('theme')?.value || 'light'
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-2">
      <div className="text-center">
        <h1 className="text-3xl font-bold">測試動態樣式</h1>
        <p>可以從middleware.ts切換主題</p>
        <p>主題有light, dark, golden</p>
      </div>
      <p className="font-bold p-2">目前主題為:{theme}</p>
      <div className="p-3 border rounded">
        <h1>default</h1>
      </div>

      <div className="p-3 bg-text-primary rounded">
        <h1 className="text-bg-primary">text-bg-primary / bg-text-primary</h1>
      </div>
    </main>
  )
}
