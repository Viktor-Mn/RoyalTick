import { ICartItem } from './cart'

export interface ILoadOneProductFx {
  productId: string
  category: string
}

export interface IProductSizesItemProps {
  currentSize: string | number
  selectedSize: string
  setSelectedSize: (size: string) => void
  currentCartItems: any[]
  isInStock: boolean
}

export interface IProductCounterProps {
  className: string
  count: number
  setCount?: (count: number) => void
}

export interface IAddToCartBtnProps {
  handleAddToCart: VoidFunction
  addToCartSpinner: boolean
  text: string
  btnDisabled?: boolean
  className?: string
}

export interface IProductCountBySizeProps {
  products: ICartItem[]
  size: string
  withCartIcon?: boolean
}