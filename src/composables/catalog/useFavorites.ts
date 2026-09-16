'use client'
import { useContext } from 'react'
import { useStore } from 'zustand'
import { FavoritesContext } from '@/components/FavoritesProvider'
export function useFavorites() {
  const store = useContext(FavoritesContext)
  if (!store) throw new Error('FavoritesProvider is required')
  return useStore(store)
}
