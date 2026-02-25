/* eslint-disable react/jsx-indent */
'use client'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/cart-page/index.module.scss'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCartByAuth } from '@/hooks/useCartByAuth'

const CartPage = () => {
  const currentCartByAuth = useCartByAuth()
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('cart')

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.cart}>
        <div className='container' >
          <h1>Cart</h1>
        </div>
      </section>
    </main>
  )
}

export default CartPage
