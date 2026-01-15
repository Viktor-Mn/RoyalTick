'use client'

import { $catalogMenuIsOpen, closeCatalogMenu } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import { useStore, useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Header from './Header'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogMenuButton from './CatalogMenuButton'
import CatalogMenuList from './CatalogMenuList'
import Accordion from '../Accordion/Accordion'
import Link from 'next/link'

const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen)
  const { lang, translations } = useLang()

  const [showUserList, setShowUserList] = useState(false)
  const [showTypeList, setShowTypeList] = useState(false)
  const [showCollectionList, setShowCollectionList] = useState(false)
  const [showStyleList, setShowStyleList] = useState(false)
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    2,
    catalogMenuIsOpen
  )

  const isMedia450 = useMediaQuery(450)

  const handleShowUserList = () => {
    setShowUserList(true)
    setShowTypeList(false)
    setShowCollectionList(false)
    setShowStyleList(false)
  }

  const handleShowTypeList = () => {
    setShowUserList(false)
    setShowTypeList(true)
    setShowCollectionList(false)
    setShowStyleList(false)
  }

  const handleShowCollectionList = () => {
    setShowUserList(false)
    setShowTypeList(false)
    setShowCollectionList(true)
    setShowStyleList(false)
  }

  const handleShowStyleList = () => {
    setShowUserList(false)
    setShowTypeList(false)
    setShowCollectionList(false)
    setShowStyleList(true)
  }

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeCatalogMenu()
    setShowUserList(false)
    setShowTypeList(false)
    setShowCollectionList(false)
    setShowStyleList(false)
  }

  const items = [
    {
      id: 1,
      name: translations[lang].main_menu.watches,
      handler: handleShowUserList,
      items: [
        {
          title: translations[lang].comparison.mens_watches,
          href: '/catalog/watches?offset=0&type=mens_watches',
        },
        {
          title: translations[lang].comparison.womens_watches,
          href: '/catalog/watches?offset=0&type=womens_watches',
        },
        {
          title: translations[lang].comparison.smart_watches,
          href: '/catalog/watches?offset=0&type=smart_watches',
        },
        {
          title: translations[lang].comparison.mechanical_watches,
          href: '/catalog/watches?offset=0&type=mechanical_watches',
        },
      ],
    },
    {
      id: 2,
      name: translations[lang].main_menu.types,
      handler: handleShowTypeList,
      items: [
        {
          title: translations[lang].comparison.quartz_watches,
          href: '/catalog/watches?offset=0&type=quartz_watches',
        },
        {
          title: translations[lang].comparison.automatic_watches,
          href: '/catalog/watches?offset=0&type=automatic_watches',
        },
        {
          title: translations[lang].comparison.chronograph,
          href: '/catalog/watches?offset=0&type=chronograph',
        },
      ],
    },
    {
      id: 3,
      name: translations[lang].main_menu.collections,
      handler: handleShowCollectionList,
      items: [
        {
          title: translations[lang].comparison.luxury_watches,
          href: '/catalog/watches?offset=0&type=luxury_watches',
        },
        {
          title: translations[lang].comparison.limited_edition,
          href: '/catalog/watches?offset=0&type=limited_edition',
        },
      ],
    },
    {
      id: 4,
      name: translations[lang].main_menu.styles,
      handler: handleShowStyleList,
      items: [
        {
          title: translations[lang].comparison.sport_watches,
          href: '/catalog/watches?offset=0&type=sport_watches',
        },
        {
          title: translations[lang].comparison.vintage_watches,
          href: '/catalog/watches?offset=0&type=vintage_watches',
        },
      ],
    },
  ]

  return (
    <div className='catalog-menu' style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 'calc(100%)' }}
            exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
            className='catalog-menu__aside'
          >
            <div className='catalog-menu__header'>
              <Header />
            </div>
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className='btn-reset catalog-menu__close'
                variants={itemVariants}
                onClick={handleCloseMenu}
              />
              <motion.h2
                variants={itemVariants}
                className='catalog-menu__title'
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                {items.map(({ id, name, items, handler }) => {
                  const buttonProps = (isActive: boolean) => ({
                    handler: handler as VoidFunction,
                    name,
                    isActive,
                  })

                  const isCurrentList = (
                    showList: boolean,
                    currentId: number
                  ) => showList && id === currentId

                  return (
                    <motion.li
                      key={id}
                      variants={itemVariants}
                      className='catalog-menu__list__item'
                    >
                      {!isMedia450 && (
                        <>
                          {id === 1 && (
                            <CatalogMenuButton {...buttonProps(showUserList)} />
                          )}
                          {id === 2 && (
                            <CatalogMenuButton {...buttonProps(showTypeList)} />
                          )}
                          {id === 3 && (
                            <CatalogMenuButton
                              {...buttonProps(showCollectionList)}
                            />
                          )}
                          {id === 4 && (
                            <CatalogMenuButton
                              {...buttonProps(showStyleList)}
                            />
                          )}
                        </>
                      )}
                      {!isMedia450 && (
                        <AnimatePresence>
                          {isCurrentList(showUserList, 1) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(showTypeList, 2) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(showCollectionList, 3) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(showStyleList, 4) && (
                            <CatalogMenuList items={items} />
                          )}
                        </AnimatePresence>
                      )}
                      {isMedia450 && (
                        <Accordion
                          title={name}
                          titleClass='btn-reset nav-menu__accordion__item__title'
                        >
                          <ul className='list-reset catalog__accordion__list'>
                            {items.map((item, i) => (
                              <li
                                key={i}
                                className='catalog__accordion__list__item'
                              >
                                <Link
                                  href='/catalog'
                                  className='nav-menu__accordion__item__list__item__link'
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CatalogMenu
