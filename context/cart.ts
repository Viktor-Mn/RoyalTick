import { addProductToCartFx, updateCartItemCountFx } from '@/api/cart'
import { handleJWTError } from '@/lib/utils/errors'
import api from '../api/apiInstance'
import {
  IAddProductsFromLSToCartFx,
  IAddProductToCartFx,
  ICartItem,
  IUpdateCartItemCountFx,
} from '@/types/cart'
import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

export const addProductsFromLSToCartFx = createEffect(
  async ({ jwt, cartItems }: IAddProductsFromLSToCartFx) => {
    try {
      const { data } = await api.post(
        '/api/cart/add-many',
        { items: cartItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: ICartItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLSToCartFx',
            payload: { items: cartItems },
          }
        )
        return newData
      }

      loadCartItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart =
  cart.createEvent<IAddProductsFromLSToCartFx>()
export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()

export const $cart = cart
  .createStore<ICartItem[]>([])
  .on(addProductsFromLSToCartFx.done, (_, { result }) => result.items)
  .on(addProductToCartFx.done, (cart, { result }) => {
    console.log('Результат з сервера:', result)
    console.log('Новий елемент з сервера:', result.newCartItem)
    if (!result || !result.newCartItem) {
      return cart
    }

    const updatedCart = [...cart, result.newCartItem]

    return [
      ...new Map(
        updatedCart
          .filter((item) => item && item.clientId)
          .map((item) => [item.clientId, item])
      ).values(),
    ]
  })
  .on(updateCartItemCountFx.done, (cart, { result }) =>
    cart.map((item) =>
      item._id === result.id ? { ...item, count: result.count } : item
    )
  )

export const $cartFromLs = cart
  .createStore<ICartItem[]>([])
  .on(setCartFromLS, (_, cart) => cart)

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})

sample({
  clock: updateCartItemCount,
  source: $cart,
  fn: (_, data) => data,
  target: updateCartItemCountFx,
})


