export interface ILoadOneProductFx{
    productId: string
    category: string
}

export interface IProductSizesItemProps {
  currentSize: [string, number]
  selectedSize: string | null
  setSelectedSize: (size: string) => void
  currentCartItems: any[]
}


export interface IProductCounterProps {
    className: string
    count: number
}

export interface IAddToCartBtnProps {
    text: string
    className?: string
}