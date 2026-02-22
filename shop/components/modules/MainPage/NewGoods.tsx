import { useUnit } from 'effector-react'
import MainPageSection from './MainPageSection'
import { useLang } from '@/hooks/useLang'
import { $newProducts } from '@/context/goods'
import { getNewProductsFx } from '@/api/main-page'

const NewGoods = () => {
  const goods = useUnit($newProducts)
  const spinner = useUnit(getNewProductsFx.pending)
  const { lang, translations } = useLang()

  console.log('New goods from store:', goods)

  return (
    <MainPageSection
      title={translations[lang].main_page.new_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default NewGoods
