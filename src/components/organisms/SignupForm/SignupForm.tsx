'use client'

import { ProgressSteps } from '@/components/molecules/ProgressSteps/ProgressSteps'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { AgreementStep } from '@/components/organisms/AgreementStep/AgreementStep'
import { VerificationStep } from '@/components/organisms/VerificationStep/VerificationStep'
import React, { useState } from 'react'
import styles from './SignupForm.module.scss'
import { useRouter } from 'next/navigation'

export const SignupForm: React.FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [agreements, setAgreements] = useState({
    termsOfUse: false,
    personalInfoRequired: false,
    personalInfoOptional1: false,
    personalInfoOptional2: false,
    allAgreements: false
  })

  const handleAgreementChange = (key: keyof typeof agreements) => {
    return (checked: boolean) => {
      setAgreements(prev => ({
        ...prev,
        [key]: checked
      }))
    }
  }

  const handleAllAgreementsChange = (checked: boolean) => {
    setAgreements({
      termsOfUse: checked,

      personalInfoRequired: checked,
      personalInfoOptional1: checked,
      personalInfoOptional2: checked,
      allAgreements: checked
    })
  }

  const handleCancel = () => {
    // TODO: 취소 로직 구현
    router.push('/login')
    console.log('Cancel signup')
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // 필수 체크 확인
      if (!agreements.termsOfUse || !agreements.personalInfoRequired) {
        setShowAlert(true)
        return
      }
      // 다음 단계로 이동
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // TODO: 본인 인증 완료 후 다음 단계로 이동
      setCurrentStep(3)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePhoneVerification = () => {
    // TODO: 휴대폰 본인 인증 로직 구현
    console.log('Phone verification')
  }

  const handleIpinVerification = () => {
    // TODO: 아이핀 인증 로직 구현
    console.log('i-PIN verification')
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const steps = [
    { id: 1, label: '약관동의' },
    { id: 2, label: '본인 인증' },
    { id: 3, label: '회원정보 입력' },
    { id: 4, label: '회원가입 완료' }
  ]

  return (
    <div className={styles.signupForm}>
      <h1 className={styles.title}>회원가입</h1>

      <ProgressSteps steps={steps} currentStep={4} />

      {currentStep === 1 && (
        <AgreementStep
          agreements={agreements}
          onAgreementChange={handleAgreementChange}
          onAllAgreementsChange={handleAllAgreementsChange}
          onCancel={handleCancel}
          onNext={handleNext}
        />
      )}

      {currentStep === 2 && (
        <VerificationStep
          onPhoneVerification={handlePhoneVerification}
          onIpinVerification={handleIpinVerification}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <AlertModal isOpen={showAlert} message='필수사항을 체크해주세요.' onClose={handleCloseAlert} />
    </div>
  )
}
