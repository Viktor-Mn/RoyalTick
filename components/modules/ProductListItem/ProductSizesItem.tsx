'use client'
import { IProductSizesItemProps } from '@/types/goods'
import styles from '@/styles/quick-view-modal/index.module.scss'

// Ми просто перевикористовуємо IProductSizesItemProps.
// Якщо в оригіналі isInStock вже є, нам не потрібно нічого розширювати.
const ProductSizesItem = ({
  currentSize,
  selectedSize,
  setSelectedSize,
  isInStock,
}: IProductSizesItemProps) => {
  // Оскільки ми змінили стратегію в БД, currentSize тепер — це просто назва розміру (рядок)
  // Наприклад: "40" або "180 / 18"
  const sizeString = String(currentSize)

  const handleSelectSize = () => {
    if (isInStock) {
      setSelectedSize(sizeString)
    }
  }

  // Визначаємо, чи обраний цей розмір
  const isSelected = selectedSize === sizeString

  return (
    <li
      className={`${styles.modal__right__info__sizes__item} ${
        !isInStock ? styles.modal__right__info__sizes__item__not_available : ''
      } ${isSelected ? styles.modal__right__info__sizes__item__selected : ''}`}
      style={{
        backgroundColor: isSelected ? '#9466FF' : 'rgba(255, 255, 255, 0.10)',
        cursor: isInStock ? 'pointer' : 'not-allowed',
        opacity: isInStock ? 1 : 0.5, // Візуально приглушуємо, якщо немає в наявності
      }}
    >
      <button
        className='btn-reset'
        onClick={handleSelectSize}
        disabled={!isInStock}
        style={{ width: '100%', height: '100%', color: 'inherit' }}
      >
        {sizeString}
      </button>
    </li>
  )
}

export default ProductSizesItem
