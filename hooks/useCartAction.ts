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
import { updateCartItemCount } from '@/context/cart'

export const useCartAction = (isSizeTable = false) => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')
  const currentCartByAuth = useCartByAuth()
  const currentCartItems = currentCartByAuth.filter(
    (item) => String(item.productId) === String(product._id)
  )
  const cartItemBySize = currentCartItems.find((item) => {
    if (!item.size && !selectedSize) return true
    return String(item.size).trim() === String(selectedSize).trim()
  })
  const isProductInCart = isItemInList(currentCartByAuth, product._id)
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)

  useEffect(() => {
    if (product.characteristics) {
      if (product.category === 'straps') {
        setSelectedSize(
          `${product.characteristics.width} / ${product.characteristics.length}`
        )
      } else {
        setSelectedSize(`${product.characteristics.caseSize}`)
      }
    }
  }, [product])

  const handleAddToCart = (countFromCounter?: number) => {
    if (isProductInCart) {
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }

      if (cartItemBySize) {
        const auth = JSON.parse(localStorage.getItem('auth') as string)
        const count = !!countFromCounter
          ? +cartItemBySize.count !== countFromCounter
            ? countFromCounter
            : +cartItemBySize.count + 1
          : +cartItemBySize.count + 1

        updateCartItemCount({
          jwt: auth.accessToken,
          id: cartItemBySize._id as string,
          setSpinner: setUpdateCountSpinner,
          count,
        })

        addCartItemToLS(product, selectedSize, count)
        return
      }
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
    currentCartItems,
    cartItemBySize,
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    isProductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    handleAddToCart,
    updateCountSpinner,
  }
}
