export interface IProduct {
  _id: string
  type: string // головний тип товару, напр. "watches" або "straps"
  category: string // категорія для фільтрів, напр. "watches", "straps"
  collection: string // підтип / колекція
  price: number
  name: string
  description: string
  characteristics: {
    [key: string]: string | number | boolean | string[]
  } // напр. material, color, strapType, caseSize, dialColor, etc.
  images: string[]
  vendorCode: string
  inStock: number
  isBestseller: boolean
  isNew: boolean
  popularity: number
  // Для годинників: розмір циферблату
  caseSize?: number
  // Для ремінців: ширина та довжина
  width?: number
  length?: number
  // Додаткове поле для можливих помилок
  errorMessage?: string
}
