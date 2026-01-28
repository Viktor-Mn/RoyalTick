import Link from 'next/link'
import { closeQuickViewModal } from '@/context/modals'
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import QuickViewModalSlider from './QuickViewModalSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import { useLang } from '@/hooks/useLang'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import stylesForProduct from '@/styles/product-list-item/index.module.scss'
import styles from '@/styles/quick-view-modal/index.module.scss'
import ProductMechanism from '../ProductListItem/ProductMechanism'
import ProductCaseMaterial from '../ProductListItem/ProductCaseMaterial'
import AddToCartBtn from '../ProductListItem/AddToCartBtn'
import ProductCounter from '../ProductListItem/ProductCounter'
import ProductSizesItem from '../ProductListItem/ProductSizesItem'
import ProductSizeTableBtn from '../ProductListItem/ProductSizeTableBtn'

const QuickViewModal = () => {
  const { lang, translations } = useLang()
  const { product, selectedSize, setSelectedSize } = useCartAction()
  const images = useProductImages(product)

  const char = product.characteristics || {}
  const isWatch = product.category === 'watches'
  const isStrap = product.category === 'straps'
  const isBox = product.type === 'boxes'
  const WATCH_SIZES = [38, 40, 42, 44, 46]

  const hasWatchSize = isWatch && char.caseSize !== undefined
  const hasStrapSize =
    isStrap && char.width !== undefined && char.length !== undefined

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  return (
    <div className={styles.modal}>
      <button
        className={`btn-reset ${styles.modal__close}`}
        onClick={handleCloseModal}
      />
      <div className={styles.modal__actions}>
        <ProductItemActionBtn
          text={translations[lang].product.add_to_favorites}
          iconClass='actions__btn_favorite'
          withTooltip={false}
        />
        <ProductItemActionBtn
          text={translations[lang].product.add_to_comparison}
          iconClass='actions__btn_comparison'
          withTooltip={false}
        />
      </div>
      <div className={styles.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>
      <div className={styles.modal__right}>
        <h3 className={styles.modal__right__title}>{product.name}</h3>
        <div className={styles.modal__right__price}>
          {formatPrice(+product.price)} ₴
        </div>
        <div className={styles.modal__right__info}>
          <ProductAvailable
            vendorCode={product.vendorCode}
            inStock={+product.inStock}
          />

          {/* Характеристики для ГОДИННИКІВ */}
          {isWatch && (
            <>
              {char.mechanism && (
                <ProductMechanism
                  mechanism={
                    Array.isArray(char.mechanism)
                      ? char.mechanism.join(', ')
                      : (char.mechanism as string)
                  }
                />
              )}
              {char.caseMaterial && (
                <ProductCaseMaterial caseMaterial={String(char.caseMaterial)} />
              )}
            </>
          )}

          {/* Характеристики для РЕМІНЦІВ та КОРOБОК (спільний контейнер для матеріалів) */}
          {(isStrap || isBox) && (
            <div className={styles.modal__right__info__strap}>
              {char.material && (
                <div className={stylesForProduct.product__composition}>
                  {translations[lang].catalog.material}:{' '}
                  {(translations[lang].catalog as any)[String(char.material)] ||
                    char.material}
                </div>
              )}
              {/* Специфічне для ремінців */}
              {isStrap && char.claspType && (
                <div className={stylesForProduct.product__composition}>
                  {translations[lang].catalog.clasp_type}:{' '}
                  {(translations[lang].catalog as any)[
                    String(char.claspType)
                  ] || char.claspType}
                </div>
              )}
              {/* Специфічне для коробок */}
              {isBox && char.capacity && (
                <div className={stylesForProduct.product__composition}>
                  {translations[lang].catalog.capacity}: {char.capacity}
                </div>
              )}
            </div>
          )}

          {/* Блок розмірів (тільки для годинників та ремінців) */}
          {(hasWatchSize || hasStrapSize) && (
            <div className={styles.modal__right__info__size}>
              <div className={styles.modal__right__info__size__inner}>
                <span className={stylesForProduct.product__size_title}>
                  {isWatch
                    ? translations[lang].catalog.case_size
                    : translations[lang].catalog.strap_size}
                </span>

                <ProductSizeTableBtn
                  sizes={{
                    caseSize: char.caseSize as number,
                    width: char.width as number,
                    length: char.length as number,
                  }}
                  type={product.category}
                  className={`sizes-table-btn ${styles.modal__right__info__sizes_btn}`}
                />
              </div>

              <div className={styles.modal__right__info__sizes_list}>
                {isWatch ? (
                  <div className={styles.modal__right__info__size_row}>
                    <ul
                      className={`list-reset ${styles.modal__right__info__sizes}`}
                    >
                      {WATCH_SIZES.map((size) => (
                        <ProductSizesItem
                          key={size}
                          currentSize={['caseSize', size]}
                          selectedSize={selectedSize}
                          setSelectedSize={setSelectedSize}
                          currentCartItems={[]}
                          isInStock={char.caseSize === size}
                        />
                      ))}
                    </ul>
                  </div>
                ) : (
                  Object.entries({
                    width: char.width,
                    length: char.length,
                  }).map(([key, value], i) => (
                    <div
                      key={i}
                      className={styles.modal__right__info__size_row}
                    >
                      <span className={styles.modal__right__info__size_label}>
                        {key === 'width'
                          ? translations[lang].catalog.width
                          : translations[lang].catalog.length}
                        :
                      </span>
                      <ul
                        className={`list-reset ${styles.modal__right__info__sizes}`}
                      >
                        <ProductSizesItem
                          currentSize={[key, value as number]}
                          selectedSize={selectedSize}
                          setSelectedSize={setSelectedSize}
                          currentCartItems={[]}
                          isInStock={true}
                        />
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Керування кількістю та кошик */}
          <div className={styles.modal__right__bottom}>
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.count}
            </span>
            <div className={styles.modal__right__bottom__inner}>
              {/* Для коробок лічильник активний завжди, для інших - після вибору розміру */}
              {isBox || !!selectedSize ? (
                <ProductCounter
                  className={`counter ${styles.modal__right__bottom__counter}`}
                  count={0}
                />
              ) : (
                <div
                  className={`counter ${styles.modal__right__bottom__counter}`}
                  style={{ justifyContent: 'center', fontSize: '12px' }}
                >
                  <span>{translations[lang].product.select_size}</span>
                </div>
              )}
              <AddToCartBtn
                className={styles.modal__right__bottom__add}
                text={translations[lang].product.to_cart}
              />
            </div>
          </div>
        </div>
        <div className={styles.modal__right__more}>
          <Link
            href={`/catalog/${product.category}/${product._id}`}
            className={styles.modal__right__more__link}
            onClick={handleCloseModal}
          >
            {translations[lang].product.more}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
