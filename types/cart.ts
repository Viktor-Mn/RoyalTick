export interface ICartItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  count: string | number
  price: string
  totalPrice: string
  inStock: string
  vendorCode: string
  material?: string
  caseSize?: number
  width?: number
}

export interface IAddProductToCartFx {
  productId: string
  category: string
  vendorCode: string
  count: string | number
  jwt: string
  clientId: string
  setSpinner: (arg0: boolean) => void
}