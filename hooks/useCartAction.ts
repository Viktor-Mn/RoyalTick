import { $currentProduct } from '@/context/goods'
import { useUnit } from 'effector-react'
import { useState, useEffect } from 'react'
import { useCartByAuth } from './useCartByAuth'
import { isItemInList, isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'

export const useCartAction = (isSizeTable = false) => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')
  const currentCartByAuth = useCartByAuth()

  const isProductInCart = isItemInList(currentCartByAuth, product._id)
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)

  // Автоматично формуємо "вибраний розмір" з характеристик годинника/ремінця
  useEffect(() => {
    if (product.characteristics) {
      if (product.category === 'straps') {
        setSelectedSize(
          `${product.characteristics.width} / ${product.characteristics.length}`
        )
      } else {
        setSelectedSize(`${product.characteristics.caseSize} mm`)
      }
    }
  }, [product])

  const handleAddToCart = (countFromCounter?: number) => {
    if (isProductInCart) {
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const existingItem = currentCartByAuth.find(
        (item) => item.productId === product._id
      )

      const count =
        countFromCounter || (existingItem ? +existingItem.count + 1 : 1)

      addCartItemToLS(product, count, selectedSize)
      // Тут можна додати виклик ефекту для оновлення кількості на сервері
      return
    }

    if (isSizeTable) {
      addItemToCart(
        product,
        setAddToCartSpinner,
        countFromCounter || 1,
        selectedSize
      )
      return
    }

    addProductToCartBySizeTable(
      product,
      setAddToCartSpinner,
      countFromCounter || 1,
      selectedSize
    )
  }

  return {
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    isProductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    handleAddToCart,
  }
}
