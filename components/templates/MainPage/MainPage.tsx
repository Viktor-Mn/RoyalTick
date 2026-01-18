'use client'
import BestsellerGoods from '@/components/modules/MainPage/BestsellerGoods'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import Hero from '@/components/modules/MainPage/Hero/Hero'
import { MainPageGate } from '@/context/goods'
import { useGate } from 'effector-react'

const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero />
      <Categories />
      <BestsellerGoods/>
    </main>
  )
}

export default MainPage
