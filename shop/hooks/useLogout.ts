'use client'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { setIsAuth } from '@/context/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useUserLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // 1. Вихід з Firebase (анулює сесію на фронтенді)
      await signOut(auth)

      // 2. Очищення локальних даних
      localStorage.removeItem('auth')

      // 3. Оновлення стану Effector
      setIsAuth(false)

      // 4. Повідомлення користувачу
      toast.success('Ви вийшли з аккаунта')

      // 5. Перенаправлення та повне оновлення для скидання стейту
      router.push('/')

      // reload потрібен, щоб Effector стори повністю очистилися
      // і не залишалося старих даних у пам'яті
      window.location.reload()
    } catch (error) {
      console.error('Помилка при виході:', error)
      toast.error('Не вдалося вийти з системи')
    }
  }

  return handleLogout
}
