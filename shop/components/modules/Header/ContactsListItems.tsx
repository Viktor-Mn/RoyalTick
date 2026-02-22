import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import React from 'react'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <a
          href='tel:+380965908262'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +38 (096) 590 82 62
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='mailto:info@watchstore.com'
          className='nav-menu__accordion__item__link'
        >
          Email
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='hhtps://t.me/watch_store_support'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='hhtps://instagram.com/watch_store'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.ins}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems
