'use client'

import { useCounterStore } from '@/store/counter'

export default function Zustand() {
  const { count, inc, asyncIncrement } = useCounterStore()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-3xl uppercase">test zustand</div>
      <p className="pb-4">state management with zustand</p>
      <div className="text-xl font-bold mb-3 ">count:{count}</div>
      <div className="flex gap-2 align-center">
        <button className="border-text-primary border-2 border-solid text-white p-1 px-4 rounded active:bg-text-primary active:text-bg-primary " onClick={inc}>
          inc
        </button>
        <button className="border-text-primary border-2 border-solid text-white p-1 px-4 rounded active:bg-text-primary active:text-bg-primary" onClick={asyncIncrement}>
          async inc (sleep 1s)
        </button>
      </div>
    </main>
  )
}
