import { Suspense } from 'react'
import PersonalDataPolicyPage from '@/components/templates/PersonalDataPolicyPage/PersonalDataPolicyPage'

export default function PersonalDataPolicy() {
  return (
    <Suspense fallback={<div />}>
      <PersonalDataPolicyPage />
    </Suspense>
  )
}
