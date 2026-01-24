'use client'

import React, { useState, useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { SaveIcon } from '@/components/icons/SaveIcon'
import { LoadIcon } from '@/components/icons/LoadIcon'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { DirectorInfoStep } from '@/components/organisms/DirectorInfoStep/DirectorInfoStep'
import { StaffInfoStep } from '@/components/organisms/StaffInfoStep/StaffInfoStep'
import { BedAndFacilityStep } from '@/components/organisms/BedAndFacilityStep/BedAndFacilityStep'
import { CareSystemStep } from '@/components/organisms/CareSystemStep/CareSystemStep'
import { MedicalDepartmentStep } from '@/components/organisms/MedicalDepartmentStep/MedicalDepartmentStep'
import styles from './page.module.scss'

export default function HospitalApplicationPage() {
  // 현재 단계 상태 (1: 병원 정보, 2: 병원장 정보, 3: 실무자 정보)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8

  // 안내 메시지
  const guideMessages = useMemo(() => {
    return [
      '협력병원 신청을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  // 다음 단계 핸들러
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
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
          <h1 className={styles.pageTitle}>협력병원 신청</h1>

          <div className={styles.content}>
            {/* 협력병원 신청 안내 */}
            <div className={styles.guideSection}>
              <SectionTitle title='협력병원 신청 안내' className={styles.sectionTitle} />
              <InfoBox variant='guide' messages={guideMessages} showBullets={true} highlightLast={true} />
            </div>

            {/* 저장/불러오기 버튼 */}
            <div className={styles.actionButtons}>
              <Button variant='primary' size='small' pill onClick={() => {}}>
                임시저장
                <LoadIcon width={16} height={16} stroke='#fff' strokeWidth={1.25} />
              </Button>
              <Button variant='outline' size='small' pill onClick={() => {}}>
                임시저장 불러오기
                <SaveIcon width={16} height={16} stroke='#000' strokeWidth={1.25} />
              </Button>
            </div>

            {/* 1단계: 병원 정보 */}
            {currentStep === 1 && <HospitalInfoStep />}

            {/* 2단계: 병원장 정보 */}
            {currentStep === 2 && <DirectorInfoStep />}

            {/* 3단계: 실무자 정보 */}
            {currentStep === 3 && <StaffInfoStep />}

            {/* 4단계: 병상 및 시설 운영 현황 */}
            {currentStep === 4 && <BedAndFacilityStep />}

            {/* 5단계: 간병 시스템 */}
            {currentStep === 5 && <CareSystemStep />}

            {/* 6단계: 진료과 운영 현황 및 주요 보유 장비 */}
            {currentStep === 6 && <MedicalDepartmentStep />}

            {/* 하단 버튼 */}
            <div className={styles.formActions}>
              <Button variant='outline' size='large' onClick={handlePrevious} disabled={currentStep === 1}>
                이전 단계
              </Button>
              <Button variant='primary' size='large' onClick={handleNext} disabled={currentStep === totalSteps}>
                {currentStep === totalSteps ? '완료' : '다음 단계'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
