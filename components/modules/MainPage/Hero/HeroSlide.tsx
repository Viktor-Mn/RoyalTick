import Link from 'next/link'
import Image from 'next/image'
import { IHeroSlide } from '@/types/main-page'
import styles from '@/styles/main-page/index.module.scss'
import HeroSlideTooltip from './HeroSlideTooltipe'

const HeroSlide = ({ slide }: { slide: IHeroSlide }) => (
  <>
    <Link href='/catalog' className='hero-slide-plus' />
    <Image
      src={slide.image}
      alt={slide.title}
      className={styles.hero__slider__slide__img}
    />
    <HeroSlideTooltip
      title={slide.title}
      image={slide.image}
      price={slide.price}
    />
  </>
)

export default HeroSlide
