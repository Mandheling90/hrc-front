'use client'

import React, { useState, useMemo } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { DirectorInfoStep } from '@/components/organisms/DirectorInfoStep/DirectorInfoStep'
import { StaffInfoStep } from '@/components/organisms/StaffInfoStep/StaffInfoStep'
import { MedicalDepartmentStep } from '@/components/organisms/MedicalDepartmentStep/MedicalDepartmentStep'
import { HospitalCharacteristicsStep } from '@/components/organisms/HospitalCharacteristicsStep/HospitalCharacteristicsStep'
import styles from './page.module.scss'


export default function EditHospitalPage() {
  const router = useHospitalRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const guideMessages = useMemo(() => {
    return [
      '협력병원 정보수정을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else if (currentStep === totalSteps) {
      // 마지막 단계에서 저장 완료
      console.log('협력병원 정보수정 완료')
      router.push('/mypage')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>협력병원 정보수정</h1>

          <div className={styles.content}>
            {/* 협력병원 정보수정 안내 */}
            <div className={styles.guideSection}>
              <SectionTitle title='협력병원 정보수정 안내' className={styles.sectionTitle} />
              <InfoBox variant='guide' messages={guideMessages} showBullets={true} highlightLast={true} />
            </div>

            {/* 1단계: 병원 정보 */}
            {currentStep === 1 && <HospitalInfoStep currentStep={1} totalSteps={totalSteps} />}

            {/* 2단계: 병원장 정보 */}
            {currentStep === 2 && <DirectorInfoStep currentStep={2} totalSteps={totalSteps} />}

            {/* 3단계: 실무자 정보 + 의료기관 유형 + 인력현황 */}
            {currentStep === 3 && <StaffInfoStep currentStep={3} totalSteps={totalSteps} />}

            {/* 4단계: 진료과 운영 현황(전문의 수) */}
            {currentStep === 4 && <MedicalDepartmentStep currentStep={4} totalSteps={totalSteps} showEquipment={false} />}

            {/* 5단계: 병원특성 및 기타사항 + 첨부파일 */}
            {currentStep === 5 && <HospitalCharacteristicsStep currentStep={5} totalSteps={totalSteps} />}

            {/* 하단 버튼 */}
            <div className={styles.formActions}>
              <Button variant='outline' size='large' onClick={handlePrevious} disabled={currentStep === 1}>
                이전 단계
              </Button>
              <Button variant='primary' size='large' onClick={handleNext}>
                {currentStep === totalSteps ? '저장' : '다음 단계'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
