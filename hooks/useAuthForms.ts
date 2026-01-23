import { IInputs, ISignUpFx } from '@/types/authPopup'
import { Event, Store } from 'effector'
import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'

export const useAuthForm = (
  initialSpinner: Store<boolean>,
  isSideActive: boolean,
  event: Event<ISignUpFx>
) => {
  const spinner = useUnit(initialSpinner)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  const handleSignupWithOAuth = () => ''

  return {
    spinner,
    register,
    errors,
    handleSubmit,
    handleSignupWithOAuth,
  }
}
