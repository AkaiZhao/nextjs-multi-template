export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 py-16" aria-busy="true">
      <div className="mb-8 h-12 w-2/3 rounded bg-line" />
      <div className="h-80 rounded-xl bg-line" />
    </div>
  )
}
