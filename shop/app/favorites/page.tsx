import { Suspense } from 'react'
import FavoritesPage from '@/components/templates/FavoritesPage/FavoritesPage'

export default function Favorites() {
  return (
    <Suspense fallback={null}>
      <FavoritesPage />
    </Suspense>
  )
}