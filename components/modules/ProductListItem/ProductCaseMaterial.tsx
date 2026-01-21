'use client'

import { useLang } from '@/hooks/useLang'
import styles from '@/styles/product-list-item/index.module.scss'

const ProductCaseMaterial = ({ caseMaterial }: { caseMaterial: string }) => {
  const { lang, translations } = useLang()

  return (
    <span className={styles.product__composition}>
      {translations[lang].catalog.caseMaterial}:{' '}
      {(translations[lang].catalog as any)[caseMaterial]}
    </span>
  )
}

export default ProductCaseMaterial
