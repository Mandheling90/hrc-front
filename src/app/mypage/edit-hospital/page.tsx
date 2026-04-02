'use client'

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useHospital, useEnums, useMyPartnerApplication, useUpdatePartnerApplication } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { DirectorInfoStep } from '@/components/organisms/DirectorInfoStep/DirectorInfoStep'
import { StaffInfoStep } from '@/components/organisms/StaffInfoStep/StaffInfoStep'
import { HospitalCharacteristicsStep } from '@/components/organisms/HospitalCharacteristicsStep/HospitalCharacteristicsStep'
import { HospitalCode } from '@/graphql/__generated__/types'
import { mapApiToStepData, mapStepsToApiInput, type AllStepData } from '@/utils/partnerApplicationMapper'
import { uploadFile } from '@/lib/upload'
import type { StepRef } from '@/types/partner-application'
import type {
  HospitalInfoStepData,
  DirectorInfoStepData,
  StaffInfoStepData,
  HospitalCharacteristicsStepData
} from '@/types/partner-application'
import styles from './page.module.scss'

/** HospitalId → HospitalCode 변환 */
const toHospitalCode = (id: string): HospitalCode => {
  const map: Record<string, HospitalCode> = {
    anam: HospitalCode.Anam,
    guro: HospitalCode.Guro,
    ansan: HospitalCode.Ansan
  }
  return map[id] ?? HospitalCode.Anam
}

export default function EditHospitalPage() {
  const router = useHospitalRouter()
  const { hospital } = useHospital()
  const { user } = useAuthContext()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  // 페이지 진입 시 enum 코드 목록 미리 조회 (하위 Step에서 cache-first로 재사용)
  useEnums()

  // 기존 신청 데이터 조회
  const { application, loading: applicationLoading } = useMyPartnerApplication(toHospitalCode(hospital.id))

  // 수정 mutation
  const { updatePartnerApplication, loading: updateLoading } = useUpdatePartnerApplication()

  // API 응답 → Step 데이터 매핑
  const stepData = useMemo(() => {
    if (!application) return null
    return mapApiToStepData(application)
  }, [application])

  // Step 데이터 캐시
  const [stepDataCache, setStepDataCache] = useState<AllStepData>({})

  // stepData가 로드되면 캐시에 반영
  useEffect(() => {
    if (stepData) {
      setStepDataCache(stepData)
    }
  }, [stepData])

  // Step별 ref
  const step1Ref = useRef<StepRef<HospitalInfoStepData>>(null)
  const step2Ref = useRef<StepRef<DirectorInfoStepData>>(null)
  const step3Ref = useRef<StepRef<StaffInfoStepData>>(null)
  const step4Ref = useRef<StepRef<HospitalCharacteristicsStepData>>(null)

  // AlertModal 상태
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string; onClose?: () => void }>({
    isOpen: false,
    message: ''
  })

  // 원장여부 체크 - 원장이 아니면 마이페이지로 리다이렉트
  useEffect(() => {
    if (user && !user.profile?.isDirector) {
      router.push('/mypage')
    }
  }, [user, router])

  // 신청 데이터가 없으면 신청 페이지로 리다이렉트
  useEffect(() => {
    if (!applicationLoading && !application) {
      setAlertModal({
        isOpen: true,
        message: '현재 협력네트워크 신청이 없습니다. 협력 네트워크 신청 페이지로 이동합니다.',
        onClose: () => router.push('/network/hospital-application')
      })
    }
  }, [applicationLoading, application, router])


  const guideMessages = useMemo(() => {
    return [
      '협력병원 정보수정을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  /** 현재 Step 데이터를 캐시에 저장 */
  const saveCurrentStepData = useCallback(() => {
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref]
    const ref = refs[currentStep - 1]
    const data = ref.current?.getData()
    if (data) {
      // step4는 실제로 step8 데이터 (병원특성)
      const key = currentStep === 4 ? 'step8' : `step${currentStep}`
      setStepDataCache(prev => ({ ...prev, [key]: data }))
    }
  }, [currentStep])

  /** 모든 Step 데이터 수집 */
  const collectAllData = useCallback((): AllStepData => {
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref]
    const currentRef = refs[currentStep - 1]
    const currentData = currentRef.current?.getData()
    const key = currentStep === 4 ? 'step8' : `step${currentStep}`
    return {
      ...stepDataCache,
      [key]: currentData ?? stepDataCache[key as keyof AllStepData]
    }
  }, [currentStep, stepDataCache])

  const handleNext = async () => {
    // 필수값 검증
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref]
    const currentRef = refs[currentStep - 1]
    const validationError = currentRef.current?.validate?.()
    if (validationError) {
      setAlertModal({ isOpen: true, message: validationError })
      return
    }

    saveCurrentStepData()

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else if (currentStep === totalSteps) {
      // 마지막 단계 → 수정 요청 제출
      if (!application?.id) return

      const allData = collectAllData()
      const hospitalId = application.hospitalId ?? ''
      const mapped = mapStepsToApiInput(allData, hospitalId, toHospitalCode(hospital.id))

      try {
        // 새 첨부파일 업로드
        const files = allData.step8?.files ?? []
        if (files.length > 0) {
          const uploadResults = await Promise.all(files.map(f => uploadFile(f)))
          mapped.attachments = uploadResults.map(r => ({
            originalName: r.originalName,
            storedPath: r.storedPath,
            mimeType: r.mimeType,
            fileSize: r.fileSize
          }))
        }

        // 기존 첨부파일 유지
        const existingAttachments = allData.step8?.existingAttachments ?? []
        if (existingAttachments.length > 0) {
          const existing = existingAttachments.map(a => ({
            originalName: a.originalName,
            storedPath: a.storedPath,
            mimeType: a.mimeType,
            fileSize: a.fileSize
          }))
          mapped.attachments = [...existing, ...(mapped.attachments ?? [])]
        }

        // UpdatePartnerApplicationInput에 없는 필드 제거 후 id 추가
        const {
          hospitalId: _hId,
          hospitalCode: _hCode,
          hospitalPhisCode: _phisCode,
          institutionCode: _instCode,
          medicalDepartment: _medDept,
          ...updateFields
        } = mapped
        await updatePartnerApplication({ id: application.id, ...updateFields })

        setAlertModal({
          isOpen: true,
          message: '협력병원 정보수정 요청이 완료되었습니다.',
          onClose: () => router.push('/mypage')
        })
      } catch (error) {
        console.error('협력병원 정보수정 실패:', error)
        setAlertModal({ isOpen: true, message: '정보수정 중 오류가 발생했습니다.' })
      }
    }
  }

  const handlePrevious = () => {
    saveCurrentStepData()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // 데이터 로딩 중이면 로딩 표시
  if (applicationLoading) {
    return (
      <div className={styles.wrap}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>협력병원 정보수정</h1>
            <div className={styles.content}>
              <p>데이터를 불러오는 중입니다...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            {currentStep === 1 && (
              <HospitalInfoStep
                ref={step1Ref}
                currentStep={1}
                totalSteps={totalSteps}
                defaultValues={stepDataCache.step1 ?? stepData?.step1}
              />
            )}

            {/* 2단계: 병원장 정보 */}
            {currentStep === 2 && (
              <DirectorInfoStep
                ref={step2Ref}
                currentStep={2}
                totalSteps={totalSteps}
                defaultValues={stepDataCache.step2 ?? stepData?.step2}
                readOnly
              />
            )}

            {/* 3단계: 실무자 정보 + 의료기관 유형 + 인력현황 */}
            {currentStep === 3 && (
              <StaffInfoStep
                ref={step3Ref}
                currentStep={3}
                totalSteps={totalSteps}
                defaultValues={stepDataCache.step3 ?? stepData?.step3}
              />
            )}

            {/* 4단계: 병원특성 및 기타사항 + 첨부파일 */}
            {currentStep === 4 && (
              <HospitalCharacteristicsStep
                ref={step4Ref}
                currentStep={4}
                totalSteps={totalSteps}
                defaultValues={stepDataCache.step8 ?? stepData?.step8}
              />
            )}

            {/* 하단 버튼 */}
            <div className={styles.formActions}>
              <Button variant='outline' size='large' onClick={handlePrevious} disabled={currentStep === 1}>
                이전 단계
              </Button>
              <Button variant='primary' size='large' onClick={handleNext} disabled={updateLoading}>
                {currentStep === totalSteps ? '수정 요청' : '다음 단계'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        closeButtonText='확인'
        onClose={() => {
          const callback = alertModal.onClose
          setAlertModal({ isOpen: false, message: '' })
          callback?.()
        }}
        closeOnBackdropClick={true}
      />
    </div>
  )
}
