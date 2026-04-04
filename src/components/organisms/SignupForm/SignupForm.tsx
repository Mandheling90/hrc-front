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
import { HospitalCode } from '@/graphql/__generated__/types'
import type { NiceVerifiedData } from '@/lib/nice/types'

const HOSPITAL_CODE_MAP: Record<string, HospitalCode> = {
  anam: HospitalCode.Anam,
  guro: HospitalCode.Guro,
  ansan: HospitalCode.Ansan
}
import React, { useState } from 'react'
import styles from './SignupForm.module.scss'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'


// DB enum DoctorType key → GraphQL DoctorType enum 매핑
const DOCTOR_TYPE_GQL_MAP: Record<string, string> = {
  '1': 'DOCTOR',
  '2': 'ORIENTAL_DOCTOR',
  '3': 'DENTIST'
}

export const SignupForm: React.FC = () => {
  const router = useHospitalRouter()
  const { signup, loading: signupLoading } = useSignup()
  const { hospitalId, hospital } = useHospital()
  const [currentStep, setCurrentStep] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('필수사항을 체크해주세요.')
  const [signupResult, setSignupResult] = useState<{ userId: string; email: string } | null>(null)
  const [verifiedData, setVerifiedData] = useState<NiceVerifiedData | null>(null)
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
    }
    window.scrollTo(0, 0)
  }

  const handleVerified = (data: NiceVerifiedData) => {
    setVerifiedData(data)
    setCurrentStep(3)
    window.scrollTo(0, 0)
  }

  const handleSignup = async (formData: MemberInfoFormData) => {
    try {
      const hospitalCodeEnum = HOSPITAL_CODE_MAP[hospitalId] || HospitalCode.Anam
      const result = await signup({
        userName: formData.name,
        birthDate: formData.birthDate,
        phone: formData.phone,
        doctorType: DOCTOR_TYPE_GQL_MAP[formData.memberType] || formData.memberType,
        userId: formData.userId,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        email: formData.email,
        licenseNo: formData.licenseNumber,
        isDirector: formData.isDirector,
        school: formData.school,
        department: formData.department,
        specialty: formData.specialty || undefined,
        graduationYear: formData.graduationYear || undefined,
        trainingHospital: formData.trainingHospital || undefined,
        smsConsent: formData.smsConsent === 'Y',
        emailConsent: formData.emailConsent === 'Y',
        replyConsent: formData.replyConsent === 'Y',
        hospitalCode: hospitalCodeEnum,
        hospName: formData.hospitalName,
        careInstitutionNo: formData.careNumber,
        hospZipCode: formData.zipCode,
        hospAddress: formData.address,
        hospAddressDetail: formData.addressDetail || undefined,
        hospPhone: formData.hospitalPhone,
        hospWebsite: formData.hospitalWebsite || undefined,
        ci: verifiedData?.ci || undefined,
        di: verifiedData?.di || undefined,
        verificationToken: verifiedData?.verificationToken || ''
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

        {currentStep === 2 && <VerificationStep onVerified={handleVerified} onPrev={handlePrev} onDuplicate={() => router.push('/login')} />}

        {currentStep === 3 && (
          <MemberInfoStep
            onSignup={handleSignup}
            onPrev={handlePrev}
            onCancel={handleCancel}
            signupLoading={signupLoading}
            initialData={
              verifiedData
                ? {
                    name: verifiedData.name,
                    birthDate: verifiedData.birthDate,
                    phone: verifiedData.phone || '',
                    gender: verifiedData.gender || ''
                  }
                : undefined
            }
          />
        )}

        {currentStep === 4 && (
          <CompleteStep
            userId={signupResult?.userId}
            email={signupResult?.email}
            title={`${hospital.name.full} 회원가입 신청이 완료되었습니다.`}
            buttonText='로그인으로 이동'
            onGoToMain={() => router.push('/login')}
          />
        )}
      </div>

      <AlertModal isOpen={showAlert} message={alertMessage} onClose={handleCloseAlert} />
    </div>
  )
}
