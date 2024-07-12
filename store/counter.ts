import { create } from 'zustand'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type CounterStore = {
  count: number
  inc: () => void
  asyncIncrement: () => Promise<void>
}
export const useCounterStore = create<CounterStore>()((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  asyncIncrement: async () => {
    await sleep(1000)
    set((state) => ({ count: state.count + 1 }))
  },
}))
