import { Suspense } from 'react'
import CartPage from '@/components/templates/CartPage/CartPage'

export default function Cart() {
  return (
    <Suspense fallback={<div />}>
      <CartPage />
    </Suspense>
  )
}
