import PrivacyPolicyPage from '@/components/templates/PrivacyPolicyPage/PrivacyPolicyPage'
import { Suspense } from 'react'

export default function PersonalDataPolicy() {
    return (
      <Suspense fallback={<div />}>
        <PrivacyPolicyPage />
      </Suspense>
    )
}
