'use client'
import LogoText from '@/components/elements/Logo/LogoText'
import { useLang } from '@/hooks/useLang'
import Link from 'next/dist/client/link'
import Menu from './Menu'
import { openMenu, openSearchModal } from '@/context/modals'
import {
  addOverflowHiddenToBody,
  handleCloseSearchModal,
} from '@/lib/utils/common'
import CartPopup from '../CartPopup/CartPopup'

const Header = () => {
  const { lang, translations } = useLang()

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  return (
    <header className='header'>
      <div className='container header__container'>
        <button className='btn-reset header__burger' onClick={handleOpenMenu}>
          {translations[lang].header.menu_btn}
        </button>
        <Menu />
        <div className='header__logo'>
          <LogoText />
        </div>
        <ul className='header__links list-reset'>
          <li className='header__link-item'>
            <button
              className='btn-reset header__links__item__btn header__links__item__btn--search'
              onClick={handleOpenSearchModal}
            />
          </li>
          <li className='header__link-item'>
            <Link
              href='/favorites'
              className='header__links__item__btn header__links__item__btn--favorites'
            ></Link>
          </li>
          <li className='header__link-item'>
            <Link
              href='/comparision'
              className='header__links__item__btn header__links__item__btn--compare'
            ></Link>
          </li>
          <li className='header__link-item'>
            <CartPopup/>
          </li>
          <li className='header__link-item'>
            <Link
              href='/profile'
              className='header__links__item__btn header__links__item__btn--profile'
            ></Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
