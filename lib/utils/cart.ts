/* eslint-disable indent */
import toast from 'react-hot-toast'
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { handleShowSizeTable, idGenerator, isUserAuth } from './common'
import {
  addProductToCart,
  setCartFromLS,
} from '@/context/cart'
import { productsWithoutSizes } from '@/constants/product'

export const addItemToCart = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = '' // Сюди передаватимемо рядок з розміром
) => {
  if (!isUserAuth()) {
    addCartItemToLS(product, count, selectedSize)
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)
  const clientId = addCartItemToLS(product, count, selectedSize, false)

  addProductToCart({
    jwt: auth.accessToken,
    setSpinner,
    productId: product._id,
    category: product.category,
    vendorCode: product.vendorCode,
    count,
    clientId,
    // Додаємо size у виклик, якщо ваш API його очікує,
    // або логіка бекенду сама візьме його з БД по productId
  })
}

export const addCartItemToLS = (
  product: IProduct,
  count: number,
  selectedSize = '',
  withToast = true
) => {
  let cartFromLS: ICartItem[] =
    JSON.parse(localStorage.getItem('cart') as string) || []
  const clientId = idGenerator()

  const existingItem = cartFromLS.find((item) => item.productId === product._id)

  if (existingItem) {
    const updatedCount =
      existingItem.count !== count ? count : +existingItem.count + 1
    const updatedCart = cartFromLS.map((item) =>
      item.productId === existingItem.productId
        ? { ...item, count: updatedCount }
        : item
    )

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartFromLS(updatedCart)
    withToast && toast.success('Додано до кошика')
    return existingItem.clientId
  }

  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      count,
      image: product.images[0],
      name: product.name,
      price: product.price,
      totalPrice: (+product.price * count).toString(),
      inStock: product.inStock,
      category: product.category,
      vendorCode: product.vendorCode,
      material: product.characteristics?.material || '',
      // Формуємо відображення розміру для кошика
      size:
        selectedSize ||
        (product.category === 'straps'
          ? `${product.characteristics.width} / ${product.characteristics.length}`
          : `${product.characteristics.caseSize} mm`),
    },
  ]
  localStorage.setItem('cart', JSON.stringify(cart))
  setCartFromLS(cart as ICartItem[])
  withToast && toast.success('Додано до кошика')
  return clientId
}

export const addProductToCartBySizeTable = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = ''
) => {
  // 2. Якщо тип товару в списку БЕЗ розмірів — додаємо відразу
  if (productsWithoutSizes.includes(product.type)) {
    addItemToCart(product, setSpinner, count)
    return
  }

  // 3. Якщо це годинник або ремінець, і розмір ВЖЕ вибраний (з таблиці) — додаємо
  if (selectedSize) {
    addItemToCart(product, setSpinner, count, selectedSize)
    return
  }

  // 4. В іншому випадку (якщо це годинник/ремінець і розмір ще не підтверджено) — показуємо таблицю
  handleShowSizeTable(product)
}
