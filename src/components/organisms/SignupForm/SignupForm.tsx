'use client'

import { TabNavigation } from '@/components/molecules/TabNavigation/TabNavigation'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { AgreementStep } from '@/components/organisms/AgreementStep/AgreementStep'
import { VerificationStep } from '@/components/organisms/VerificationStep/VerificationStep'
import { MemberInfoStep } from '@/components/organisms/MemberInfoStep/MemberInfoStep'
import { CompleteStep } from '@/components/organisms/CompleteStep/CompleteStep'
import { useSignup } from '@/hooks/useAuth'
import { useHospital } from '@/contexts/HospitalContext'
import { MemberInfoFormData } from '@/components/organisms/MemberInfoForm/MemberInfoForm'
import { HospitalCode, UserType } from '@/types/auth'
import React, { useState } from 'react'
import styles from './SignupForm.module.scss'
import { useRouter } from 'next/navigation'

// MemberInfoForm의 memberType → 백엔드 UserType 매핑
const MEMBER_TYPE_MAP: Record<string, UserType> = {
  의사: 'DOCTOR',
  치과의사: 'DOCTOR',
  한의사: 'DOCTOR'
}

export const SignupForm: React.FC = () => {
  const router = useRouter()
  const { signup, loading: signupLoading } = useSignup()
  const { hospitalId, hospital } = useHospital()
  const [currentStep, setCurrentStep] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('필수사항을 체크해주세요.')
  const [signupResult, setSignupResult] = useState<{ userId: string; email: string } | null>(null)
  const [agreements, setAgreements] = useState({
    termsOfUse: false,
    personalInfoRequired: false,
    personalInfoOptional1: false,
    personalInfoOptional2: false,
    marketingAgreement: false,
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
      marketingAgreement: checked,
      allAgreements: checked
    })
  }

  const handleCancel = () => {
    router.push('/login')
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // 필수 체크 확인 (이용약관, 개인정보수집, 제3자정보제공)
      if (!agreements.termsOfUse || !agreements.personalInfoRequired || !agreements.personalInfoOptional2) {
        setAlertMessage('필수사항을 체크해주세요.')
        setShowAlert(true)
        return
      }
      // 다음 단계로 이동
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
    window.scrollTo(0, 0)
  }

  const handleSignup = async (formData: MemberInfoFormData) => {
    const hospitalCode = hospitalId.toUpperCase() as HospitalCode
    const userType = MEMBER_TYPE_MAP[formData.memberType] || 'DOCTOR'

    try {
      const result = await signup({
        userId: formData.userId,
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        hospitalCode,
        userType,
        phone: formData.phone || undefined,
        department: formData.department !== '전체' ? formData.department : undefined,
        birthDate: formData.birthDate || undefined,
        licenseNo: formData.licenseNumber || undefined,
        specialty: formData.specialty || undefined,
        hospName: formData.hospitalName || undefined,
        hospCode: formData.careNumber || undefined,
        hospAddress: [formData.address, formData.addressDetail].filter(Boolean).join(' ') || undefined,
        representative: formData.isDirector ? formData.name : undefined
      })

      if (result) {
        setSignupResult({ userId: formData.userId, email: formData.email })
        setCurrentStep(4)
        window.scrollTo(0, 0)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.'
      setAlertMessage(message)
      setShowAlert(true)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const steps = [
    { id: '1', label: '약관동의', stepNumber: 1 },
    { id: '2', label: '본인 인증', stepNumber: 2 },
    { id: '3', label: '회원정보 입력', stepNumber: 3 },
    { id: '4', label: '회원가입 완료', stepNumber: 4 }
  ]

  return (
    <div className={styles.signupForm}>
      <h1 className={styles.title}>회원가입</h1>

      <TabNavigation
        tabs={steps}
        activeTab={String(currentStep)}
        onTabChange={() => {}}
        variant='signup'
        disableClick
      />

      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <AgreementStep
            agreements={agreements}
            onAgreementChange={handleAgreementChange}
            onAllAgreementsChange={handleAllAgreementsChange}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && <VerificationStep onNext={handleNext} onPrev={handlePrev} />}

        {currentStep === 3 && (
          <MemberInfoStep
            onSignup={handleSignup}
            onPrev={handlePrev}
            onCancel={handleCancel}
            signupLoading={signupLoading}
          />
        )}

        {currentStep === 4 && (
          <CompleteStep
            userId={signupResult?.userId}
            email={signupResult?.email}
            title={`${hospital.name.full} 회원가입 신청이 완료되었습니다.`}
            onGoToMain={() => router.push('/')}
          />
        )}
      </div>

      <AlertModal isOpen={showAlert} message={alertMessage} onClose={handleCloseAlert} />
    </div>
  )
}
