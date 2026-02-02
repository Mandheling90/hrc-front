'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { DirectorInfoStep } from '@/components/organisms/DirectorInfoStep/DirectorInfoStep'
import { StaffInfoStep } from '@/components/organisms/StaffInfoStep/StaffInfoStep'
import { BedAndFacilityStep } from '@/components/organisms/BedAndFacilityStep/BedAndFacilityStep'
import { CareSystemStep } from '@/components/organisms/CareSystemStep/CareSystemStep'
import { MedicalDepartmentStep } from '@/components/organisms/MedicalDepartmentStep/MedicalDepartmentStep'
import { BasicTreatmentStep } from '@/components/organisms/BasicTreatmentStep/BasicTreatmentStep'
import { HospitalCharacteristicsStep } from '@/components/organisms/HospitalCharacteristicsStep/HospitalCharacteristicsStep'
import styles from './page.module.scss'

const breadcrumbItems = [{ label: '마이페이지', href: '/mypage' }, { label: '협력병원 정보수정' }]

export default function EditHospitalPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8

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
    } else if (currentStep === totalSteps) {
      // 마지막 단계에서 저장 완료
      console.log('협력병원 정보수정 완료')
      router.push('/mypage')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
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

            {/* 3단계: 실무자 정보 */}
            {currentStep === 3 && <StaffInfoStep currentStep={3} totalSteps={totalSteps} />}

            {/* 4단계: 병상 및 시설 운영 현황 */}
            {currentStep === 4 && <BedAndFacilityStep currentStep={4} totalSteps={totalSteps} />}

            {/* 5단계: 간병 시스템 */}
            {currentStep === 5 && <CareSystemStep currentStep={5} totalSteps={totalSteps} />}

            {/* 6단계: 진료과 운영 현황 및 주요 보유 장비 */}
            {currentStep === 6 && <MedicalDepartmentStep currentStep={6} totalSteps={totalSteps} />}

            {/* 7단계: 기본 처치 가능 항목 */}
            {currentStep === 7 && <BasicTreatmentStep currentStep={7} totalSteps={totalSteps} />}

            {/* 8단계: 병원특성 및 기타사항 */}
            {currentStep === 8 && <HospitalCharacteristicsStep currentStep={8} totalSteps={totalSteps} />}

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
