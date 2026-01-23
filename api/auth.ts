import { createEffect } from 'effector'
import { onAuthSuccess } from '@/lib/utils/auth'
import api from './apiInstance'
import toast from 'react-hot-toast'
import { ISignUpFx } from '@/types/authPopup'

export const singUpFx = createEffect(
  async ({ name, password, email }: ISignUpFx) => {
    const { data } = await api.post('/api/users/signup', {
      name,
      password,
      email,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Реєстрація пройшла успішно!', data)

    return
  }
)

export const singInFx = createEffect(async ({ email, password }: ISignUpFx) => {
  const { data } = await api.post('/api/users/login', { email, password })

  if (data.warningMessage) {
    toast.error(data.warningMessage)
    return
  }

  onAuthSuccess('Вхід виконано!', data)

  return data
})
