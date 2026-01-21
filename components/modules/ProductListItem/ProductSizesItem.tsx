'use client'
import { IProductSizesItemProps } from '@/types/goods'
import styles from '@/styles/quick-view-modal/index.module.scss'

// Додаємо isInStock у пропси (або вираховуємо всередині)
interface IExpandedProps extends IProductSizesItemProps {
  isInStock?: boolean
}

const ProductSizesItem = ({
  currentSize,
  selectedSize,
  setSelectedSize,
  isInStock, // Отримуємо інформацію про наявність
}: IExpandedProps) => {
  const [key, value] = currentSize // key: 'caseSize', value: 38, 40...
  const sizeString = String(value)

  const handleSelectSize = () => {
    if (isInStock) {
      setSelectedSize(sizeString)
    }
  }

  return (
    <li
      className={`${styles.modal__right__info__sizes__item} ${
        isInStock ? '' : styles.modal__right__info__sizes__item__not_available
      } ${selectedSize === sizeString ? styles.modal__right__info__sizes__item__selected : ''}`}
      style={{
        backgroundColor:
          selectedSize === sizeString ? '#9466FF' : 'rgba(255, 255, 255, 0.10)',
        cursor: isInStock ? 'pointer' : 'not-allowed',
      }}
    >
      <button
        className='btn-reset'
        onClick={handleSelectSize}
        disabled={!isInStock}
        style={{ width: '100%', height: '100%' }}
      >
        {sizeString}
      </button>
    </li>
  )
}

export default ProductSizesItem
