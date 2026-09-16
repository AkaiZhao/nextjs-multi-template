'use client'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { createFavoritesStore } from '@/stores/favorites'
export const FavoritesContext = createContext<ReturnType<typeof createFavoritesStore> | null>(null)
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createFavoritesStore)
  useEffect(() => {
    // The server and first client render both start empty. Persistence loads afterwards.
    Promise.resolve(store.persist?.rehydrate()).finally(() => store.getState().setReady())
  }, [store])
  return <FavoritesContext.Provider value={store}>{children}</FavoritesContext.Provider>
}
