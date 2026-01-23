'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { $sizeTableSizes } from '@/context/sizeTable'
import { $showQuickViewModal } from '@/context/modals'
import { useCartAction } from '@/hooks/useCartAction'
import { useLang } from '@/hooks/useLang'
import { closeSizeTableByCheck } from '@/lib/utils/common'
import AddToCartBtn from '../ProductListItem/AddToCartBtn'
import styles from '@/styles/size-table/index.module.scss'

const SizeTable = () => {
  const { lang, translations } = useLang()
  const showQuickViewModal = useUnit($showQuickViewModal)
  const productSizes = useUnit($sizeTableSizes)
  const { selectedSize, setSelectedSize, product } = useCartAction()
  const [selectedWidth, setSelectedWidth] = useState('')

  const isStrapsType = productSizes.type === 'straps'
  const char = product.characteristics || {}

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  const trProps = (
    isAvailable: boolean,
    isActive: boolean,
    onClick: () => void
  ) => ({
    onClick: isAvailable ? onClick : undefined,
    style: {
      backgroundColor: isActive ? '#9466FF' : 'transparent',
      opacity: isAvailable ? 1 : 0.3,
      color: isActive
        ? '#fff'
        : isAvailable
          ? 'inherit'
          : 'rgba(255, 255, 255, .2)',
      cursor: isAvailable ? 'pointer' : 'not-allowed',
      transition: 'all 0.2s ease',
    },
  })

  const strapsLengthData = [
    { id: 1, length: '180', girth: '16' },
    { id: 2, length: '190', girth: '16–17.5' },
    { id: 3, length: '200', girth: '17.5–19' },
    { id: 4, length: '210', girth: '19–20.5' },
    { id: 5, length: '220', girth: '20' },
  ]

  const strapsWidthData = [
    { id: 1, width: '18', cases: '34, 36, 38' },
    { id: 2, width: '20', cases: '39, 40, 41' },
    { id: 3, width: '22', cases: '42, 43, 44' },
    { id: 4, width: '24', cases: '45, 46' },
    { id: 5, width: '26', cases: '47, 48, 50' },
  ]

  const watchSizes = [
    {
      id: 1,
      size: '38',
      caseSize: '34–38',
      wristWidth: '50–54',
      wristGirth: '16',
      visual: translations[lang].size_table.small,
      strapWidth: '16–18',
    },
    {
      id: 2,
      size: '40',
      caseSize: '39–40',
      wristWidth: '54–58',
      wristGirth: '16–17.5',
      visual: translations[lang].size_table.medium,
      strapWidth: '18–20',
    },
    {
      id: 3,
      size: '42',
      caseSize: '41–42',
      wristWidth: '58–62',
      wristGirth: '17.5–19',
      visual: translations[lang].size_table.large,
      strapWidth: '20–22',
    },
    {
      id: 4,
      size: '44',
      caseSize: '43–44',
      wristWidth: '62–66',
      wristGirth: '19–20',
      visual: translations[lang].size_table.extra_large,
      strapWidth: '22–24',
    },
    {
      id: 5,
      size: '46',
      caseSize: '45–46',
      wristWidth: '66+',
      wristGirth: '20+',
      visual: translations[lang].size_table.extra_large,
      strapWidth: '24–26',
    },
  ]

  return (
    <div
      className={`${styles.size_table} ${isStrapsType ? styles.size_table_straps : ''}`}
    >
      <button
        className={`btn-reset ${styles.size_table__close}`}
        onClick={handleCloseSizeTable}
      />
      <h2 className={styles.size_table__title}>
        {translations[lang].size_table.title}
      </h2>

      <div className={styles.size_table__inner}>
        {isStrapsType ? (
          <div className={styles.size_table__straps_wrapper}>
            <div className={styles.size_table__column}>
              <h3 className={styles.size_table__subtitle}>
                1. {translations[lang].size_table.strap_length_selection}
              </h3>
              <table className={styles.size_table__table}>
                <thead>
                  <tr>
                    <th>{translations[lang].size_table.strap_length}</th>
                    <th>
                      {translations[lang].size_table.wrist_circumference_cm}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {strapsLengthData.map((item) => {
                    const isAvailable =
                      Number(char.length) === Number(item.length)
                    const isActive = selectedSize === item.length
                    return (
                      <tr
                        key={`length-${item.id}`}
                        {...trProps(isAvailable, isActive, () =>
                          setSelectedSize(item.length)
                        )}
                      >
                        <td>{item.length}</td>
                        <td>{item.girth}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className={styles.size_table__column}>
              <h3 className={styles.size_table__subtitle}>
                2. {translations[lang].size_table.width_info}
              </h3>
              <table className={styles.size_table__table}>
                <thead>
                  <tr>
                    <th>{translations[lang].size_table.strap_width_column}</th>
                    <th>{translations[lang].size_table.matching_cases}</th>
                  </tr>
                </thead>
                <tbody>
                  {strapsWidthData.map((item) => {
                    const isAvailable =
                      Number(char.width) === Number(item.width)
                    const isActive = selectedWidth === item.width
                    return (
                      <tr
                        key={`width-${item.id}`}
                        {...trProps(isAvailable, isActive, () =>
                          setSelectedWidth(item.width)
                        )}
                      >
                        <td>{item.width}</td>
                        <td>{item.cases}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <table className={styles.size_table__table}>
            <thead>
              <tr>
                <th>{translations[lang].size_table.case_size}</th>
                <th>{translations[lang].size_table.wrist_width}</th>
                <th>{translations[lang].size_table.wrist_circumference}</th>
                <th>{translations[lang].size_table.visual_fit}</th>
                <th>{translations[lang].size_table.strap_width}</th>
              </tr>
            </thead>
            <tbody>
              {watchSizes.map((item) => {
                const isAvailable = Number(char.caseSize) === Number(item.size)
                const isActive = selectedSize === item.size
                return (
                  <tr
                    key={`watch-${item.id}`}
                    {...trProps(isAvailable, isActive, () =>
                      setSelectedSize(item.size)
                    )}
                  >
                    <td>{item.caseSize}</td>
                    <td>{item.wristWidth}</td>
                    <td>{item.wristGirth}</td>
                    <td>{item.visual}</td>
                    <td>{item.strapWidth}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <AddToCartBtn
        className={styles.size_table__btn}
        text={translations[lang].product.to_cart}
      />
    </div>
  )
}

export default SizeTable
