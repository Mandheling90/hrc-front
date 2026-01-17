'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { AgreementContent } from '@/components/molecules/AgreementContent/AgreementContent'
import { ProgressSteps } from '@/components/molecules/ProgressSteps/ProgressSteps'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
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

    // 필수 체크 확인
    if (!agreements.termsOfUse || !agreements.personalInfoRequired) {
      setShowAlert(true)
      return
    }

    // TODO: 다음 단계로 이동
    console.log('Next step')
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

      <div className={styles.agreementsSection}>
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.termsOfUse}
            onChange={handleAgreementChange('termsOfUse')}
            label={
              <>
                이용약관에 동의합니다. <span className={styles.highlightText}>(필수사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
          />

          <AgreementContent
            scrollableContent={
              <>
                <p className={styles.agreementTitle}>1. 개인 정보의 수집 목적 및 이용</p>
                <div className={styles.agreementText}>
                  <p>
                    "병원"은 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                    <br />
                    이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며 이용 목적이 변경될 시에는 사전 동의를 구할 것입니다.
                  </p>
                  <p>&nbsp;</p>
                  <p>온라인 안내</p>
                  <ul>
                    <li>① 서비스제공</li>
                    <li>진료 및 건진 예약, 예약조회 및 회원제 서비스 이용에 따른 본인 확인 절차에 이용 고지사항 전달, 불만처리 등을 위한 원활한 의사소통 경로의 확보, 새로운 서비스 및 행사정보 등의 안내</li>
                    <li>② 회원관리</li>
                    <li>③ 신규 서비스 개발과 개인 맞춤 서비스 제공을 위한 자료</li>
                  </ul>
                </div>
              </>
            }
            wrapAllInScrollBox={true}
          />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoRequired}
            onChange={handleAgreementChange('personalInfoRequired')}
            label={
              <>
                개인정보 수집 및 이용 목적에 동의합니다. <span className={styles.highlightText}>(필수사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
          />
          <AgreementContent
            scrollableContent={
              <p>
                개인정보 수집 및 이용에 관한 약관 내용이 들어갑니다.
                <br />
                <br />
                수집하는 개인정보 항목:
                <br />
                - 이름, 연락처, 이메일 등 기본 정보
                <br />
                - 서비스 이용 기록
                <br />- 기타 서비스 제공에 필요한 정보
              </p>
            }
          />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional1}
            onChange={handleAgreementChange('personalInfoOptional1')}
            label={
              <>
                개인정보 수집 및 이용 목적에 동의합니다. <span className={styles.highlightText}>(선택사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
          />
          <AgreementContent
            scrollableContent={<p>선택사항 개인정보 수집 및 이용 약관 내용입니다.</p>}
          />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional2}
            onChange={handleAgreementChange('personalInfoOptional2')}
            label={
              <>
                개인정보 수집 및 이용 목적에 동의합니다. <span className={styles.highlightText}>(선택사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
          />
          <AgreementContent
            scrollableContent={<p>선택사항 개인정보 수집 및 이용 약관 내용입니다.</p>}
          />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.allAgreements}
            onChange={handleAllAgreementsChange}
            label='서비스 전체 약관에 동의합니다.'
            className={styles.agreementCheckbox}
          />
          
        </div>
      </div>

      <div className={styles.warningBox}>
        <div className={styles.warningIcon}>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
              fill='currentColor'
            />
          </svg>
        </div>
        <div className={styles.warningContent}>
          <h4 className={styles.warningTitle}>비동의 시 제한사항</h4>
          <p className={styles.warningText}>
            귀하는 위 항목에 대하여 동의를 거부할 수 있으며 동의 후에도 언제든지 철회 가능합니다. 다만, 수집하는
            개인정보는 원활한 서비스 제공을 위해 필요한 최소한의 기본정보로서, 동의를 거부하실 경우에는 회원에게
            제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.
          </p>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button type='button' variant='gray' size='medium' onClick={handleCancel}>
          취소
        </Button>
        <Button
          type='button'
          variant='primary'
          size='medium'
          onClick={handleNext}
          // disabled={!agreements.termsOfUse || !agreements.personalInfoRequired}
        >
          다음 단계
        </Button>
      </div>

      <AlertModal
        isOpen={showAlert}
        message='필수사항을 체크해주세요.'
        onClose={handleCloseAlert}
      />
    </div>
  )
}
