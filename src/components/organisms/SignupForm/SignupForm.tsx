'use client'

import { Button } from '@/components/atoms/Button/Button'
import { ProgressSteps } from '@/components/molecules/ProgressSteps/ProgressSteps'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { AgreementStep } from '@/components/organisms/AgreementStep/AgreementStep'
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

      <ProgressSteps steps={steps} currentStep={currentStep} />

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
        <>
          <InfoBox
            variant='guide'
            title='회원을 위한 본인 인증 안내'
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110' fill='none'>
                <path
                  d='M48.0254 71.5006L77.4999 44.0006L69.4999 34.5006L48.0254 54.5006L37 45.5006L28 54.5006L48.0254 71.5006Z'
                  stroke='#816331'
                  stroke-width='4.58333'
                  stroke-miterlimit='10'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M52.7087 107.709L91.667 89.3756L103.125 18.3339L52.7087 2.29224L2.29199 18.3339L13.7503 89.3756L52.7087 107.709Z'
                  stroke='#816331'
                  stroke-width='4.58333'
                  stroke-miterlimit='10'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M52.7083 96.2506L82.5 82.5006L91.6667 25.209L52.7083 11.459L13.75 25.209L22.9167 82.5006L52.7083 96.2506Z'
                  stroke='#816331'
                  stroke-width='4.58333'
                  stroke-miterlimit='10'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            }
            messages={[
              '개인정보 보호법에 근거하여, 회원가입을 위해서는 본인인증이 필요합니다.',
              '본인확인은 아이핀(i-PIN)과 휴대폰 문자인증으로 확인합니다.'
            ]}
            showBullets={true}
            contentAlign='center'
            className={styles.verificationGuideBox}
          />

          <div className={styles.verificationCards}>
            <div className={styles.verificationCard}>
              <div className={styles.cardIcon}>
                <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect width='60' height='60' rx='30' fill='#fcebeb' />
                  <path
                    d='M30 15C25.5817 15 22 18.5817 22 23V37C22 41.4183 25.5817 45 30 45C34.4183 45 38 41.4183 38 37V23C38 18.5817 34.4183 15 30 15Z'
                    stroke='#9f1836'
                    strokeWidth='2'
                    fill='none'
                  />
                  <path d='M30 20V30' stroke='#9f1836' strokeWidth='2' strokeLinecap='round' />
                  <path d='M30 35H30.01' stroke='#9f1836' strokeWidth='2' strokeLinecap='round' />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>본인 인증</h4>
                <p className={styles.cardDescription}>본인명의 휴대폰, 공동인증서</p>
                <Button
                  type='button'
                  variant='primary'
                  size='large'
                  onClick={handlePhoneVerification}
                  className={styles.verifyButton}
                >
                  인증하기
                </Button>
              </div>
            </div>

            <div className={styles.verificationCard}>
              <div className={styles.cardIcon}>
                <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect width='60' height='60' rx='30' fill='#fcebeb' />
                  <rect x='15' y='20' width='30' height='20' rx='2' stroke='#9f1836' strokeWidth='2' fill='none' />
                  <path d='M15 25H45' stroke='#9f1836' strokeWidth='2' />
                  <path d='M20 30H40' stroke='#9f1836' strokeWidth='2' />
                  <path
                    d='M30 35C31.1046 35 32 34.1046 32 33C32 31.8954 31.1046 31 30 31C28.8954 31 28 31.8954 28 33C28 34.1046 28.8954 35 30 35Z'
                    fill='#9f1836'
                  />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>아이핀(i-PIN) 인증</h4>
                <p className={styles.cardDescription}>아이핀 ID / PW</p>
                <Button
                  type='button'
                  variant='outline'
                  size='large'
                  onClick={handleIpinVerification}
                  className={styles.verifyButton}
                >
                  인증하기
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.noticeSection}>
            <div className={styles.noticeHeader}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z'
                  fill='#828282'
                />
              </svg>
              <h4 className={styles.noticeTitle}>유의사항</h4>
            </div>
            <div className={styles.noticeList}>
              <div className={styles.noticeItem}>
                <span className={styles.noticeBullet}>-</span>
                <p>본인인증 방법 선택 후 팝업창이 나타나지 않으면 브라우저의 팝업차단을 해제해 주시기 바랍니다.</p>
              </div>
              <div className={styles.noticeItem}>
                <span className={styles.noticeBullet}>-</span>
                <div className={styles.noticeText}>
                  <p>
                    아이핀(I-PIN) 인증 또는 휴대폰 인증시 장애가 있으신 경우는 나이스평가정보 실명확인 서비스 기관에
                    문의하시기 바랍니다.
                  </p>
                  <p>나이스평가정보 본인 인증 콜센터 : 1600-1522</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type='button' variant='gray' size='medium' onClick={handlePrev}>
              이전
            </Button>
            <Button type='button' variant='primary' size='medium' onClick={handleNext} disabled>
              다음 단계
            </Button>
          </div>
        </>
      )}

      <AlertModal isOpen={showAlert} message='필수사항을 체크해주세요.' onClose={handleCloseAlert} />
    </div>
  )
}
