import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'
export type FavoritesState = {
  ids: string[]
  ready: boolean
  toggle: (id: string) => void
  setReady: () => void
}
export function createFavoritesStore() {
  return createStore<FavoritesState>()(
    persist(
      (set) => ({
        ids: [],
        ready: false,
        toggle: (id) =>
          set((state) => ({
            ids: state.ids.includes(id)
              ? state.ids.filter((value) => value !== id)
              : [...state.ids, id].slice(-100),
          })),
        setReady: () => set({ ready: true }),
      }),
      {
        name: 'form-field-favorites',
        version: 1,
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: (state) => ({ ids: state.ids }),
        merge: (persisted, current) => {
          const saved = persisted as { ids?: unknown } | null
          const ids = Array.isArray(saved?.ids)
            ? saved.ids
                .filter(
                  (id): id is string => typeof id === 'string' && /^[a-z0-9-]{1,80}$/.test(id),
                )
                .slice(0, 100)
            : []
          return { ...current, ids: [...new Set(ids)] }
        },
      },
    ),
  )
}
