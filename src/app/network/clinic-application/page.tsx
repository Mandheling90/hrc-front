'use client'

import React, { useState, useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { ConfirmButtons } from '@/components/molecules/ConfirmButtons/ConfirmButtons'
import { SaveIcon } from '@/components/icons/SaveIcon'
import { LoadIcon } from '@/components/icons/LoadIcon'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { LoadSaveModal } from '@/components/molecules/LoadSaveModal/LoadSaveModal'
import { DirectorInfoStep } from '@/components/organisms/DirectorInfoStep/DirectorInfoStep'
import { ClinicStaffInfoStep } from '@/components/organisms/ClinicStaffInfoStep/ClinicStaffInfoStep'
import { HospitalCharacteristicsStep } from '@/components/organisms/HospitalCharacteristicsStep/HospitalCharacteristicsStep'
import { CompleteStep } from '@/components/organisms/CompleteStep/CompleteStep'
import styles from './page.module.scss'

export default function ClinicApplicationPage() {
  // 현재 단계 상태
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  // 임시저장 불러오기 모달 상태
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false)
  // 완료 상태
  const [isComplete, setIsComplete] = useState(false)

  // 안내 메시지
  const guideMessages = useMemo(() => {
    return [
      '협력의원 신청을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  // 다음 단계 핸들러
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === totalSteps) {
      // 마지막 단계에서 신청 버튼 클릭 시 완료 상태로 전환
      setIsComplete(true)
    }
  }

  // 이전 단계 핸들러
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력의원 신청</h1>

          <div className={styles.content}>
            {isComplete ? (
              /* 완료 컴포넌트 */
              <CompleteStep
                userId='test******'
                email='lee*******@naver.com'
                title='고려대학교 안암병원 진료협력센터 협력의원 신청이 완료되었습니다.'
                description={`담당자 확인 후 승인 절차가 진행되며, 승인 완료 시 협력의원 체결이 최종 완료됩니다.\n승인 결과는 등록하신 이메일 및 문자로 안내드릴 예정입니다.`}
                buttonText='메인으로 이동'
                onGoToMain={() => {
                  // TODO: 메인으로 이동 로직
                  window.location.href = '/'
                }}
              />
            ) : (
              <>
                {/* 협력의원 신청 안내 */}
                <div className={styles.guideSection}>
                  <SectionTitle title='협력의원 신청 안내' className={styles.sectionTitle} />
                  <InfoBox
                    variant='guide'
                    messages={guideMessages}
                    showBullets={true}
                    highlightLast={true}
                    contentAlign='center'
                  />
                </div>

                {/* 저장/불러오기 버튼 */}
                <div className={styles.actionButtons}>
                  <Button variant='primary' size='small' pill onClick={() => {}}>
                    임시저장
                    <LoadIcon width={16} height={16} stroke='#fff' strokeWidth={1.25} />
                  </Button>
                  <Button variant='outline' size='small' pill onClick={() => setIsLoadModalOpen(true)}>
                    임시저장 불러오기
                    <SaveIcon width={16} height={16} stroke='#000' strokeWidth={1.25} />
                  </Button>
                </div>

                {/* 1단계: 병원 정보 */}
                {currentStep === 1 && <HospitalInfoStep currentStep={1} totalSteps={4} />}

                {/* 2단계: 병원장 정보 */}
                {currentStep === 2 && <DirectorInfoStep currentStep={2} totalSteps={4} institutionType='의원' />}

                {/* 3단계: 실무자 정보 */}
                {currentStep === 3 && <ClinicStaffInfoStep currentStep={3} totalSteps={4} />}

                {/* 4단계: 병원특성 및 기타사항, 첨부파일 */}
                {currentStep === 4 && <HospitalCharacteristicsStep currentStep={4} totalSteps={4} />}

                {/* 하단 버튼 */}
                <ConfirmButtons
                  secondaryButton={{
                    label: '이전 단계',
                    onClick: handlePrevious,
                    disabled: currentStep === 1
                  }}
                  primaryButton={{
                    label: currentStep === totalSteps ? '협력의원 신청' : '다음 단계',
                    onClick: handleNext
                  }}
                  className={styles.formActions}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* 임시저장 불러오기 모달 */}
      <LoadSaveModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        onLoad={(doctorLicense, medicalInstitutionNumber) => {
          // TODO: 임시저장 데이터 불러오기 로직 구현
          console.log('불러오기:', { doctorLicense, medicalInstitutionNumber })
        }}
        closeOnBackdropClick={true}
      />
    </div>
  )
}
