'use client'

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import {
  useHospital,
  useEnums,
  useMyPartnerApplication,
  useMyPartnerUpdateRequest,
  useUpdatePartnerApplication,
  useMyProfile,
  useGetCollaboratingHospitalInfo
} from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { StaffInfoStep } from '@/components/organisms/StaffInfoStep/StaffInfoStep'
import { HospitalCharacteristicsStep } from '@/components/organisms/HospitalCharacteristicsStep/HospitalCharacteristicsStep'
import { HospitalCode, PartnerUpdateRequestStatus } from '@/graphql/__generated__/types'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import {
  mapApiToHospitalEditStepData,
  mapHospitalEditStepsToApiInput,
  type HospitalEditStepData
} from '@/utils/partnerApplicationMapper'
import { uploadFile } from '@/lib/upload'
import type { StepRef } from '@/types/partner-application'
import type {
  HospitalInfoStepData,
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
  const totalSteps = 3

  // 페이지 진입 시 enum 코드 목록 미리 조회 (하위 Step에서 cache-first로 재사용)
  useEnums()

  // 기존 신청 데이터 조회
  const { application, loading: applicationLoading } = useMyPartnerApplication(toHospitalCode(hospital.id))

  // 수정 mutation
  const { updatePartnerApplication, loading: updateLoading } = useUpdatePartnerApplication()

  // 이미 승인 대기 중인 수정요청이 있는지 확인
  const { updateRequest } = useMyPartnerUpdateRequest(application?.id, !application?.id)
  const pendingUpdateCheckedRef = useRef(false)

  // API 응답 → Step 데이터 매핑
  const stepData = useMemo(() => {
    if (!application) return null
    return mapApiToHospitalEditStepData(application)
  }, [application])

  // Step 데이터 캐시
  const [stepDataCache, setStepDataCache] = useState<HospitalEditStepData>({})

  // stepData가 로드되면 캐시에 반영
  useEffect(() => {
    if (stepData) {
      setStepDataCache(stepData)
    }
  }, [stepData])

  // Step별 ref
  const step1Ref = useRef<StepRef<HospitalInfoStepData>>(null)
  const step2Ref = useRef<StepRef<StaffInfoStepData>>(null)
  const step3Ref = useRef<StepRef<HospitalCharacteristicsStepData>>(null)

  // AlertModal 상태
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string; onClose?: () => void }>({
    isOpen: false,
    message: ''
  })

  // 원장여부 + 체결상태(A/B) 체크 - 서버 최신 프로필 기준으로 판단
  const { user: profileUser, loading: profileLoading } = useMyProfile()
  const { getHospitalInfo } = useGetCollaboratingHospitalInfo()
  const collaborationCheckedRef = useRef(false)
  useEffect(() => {
    if (profileLoading || collaborationCheckedRef.current) return
    const profile = profileUser?.profile
    if (!profile) return

    if (!profile.isDirector) {
      collaborationCheckedRef.current = true
      router.push('/mypage')
      return
    }

    const careInstitutionNo = profile.careInstitutionNo
    if (!careInstitutionNo) return

    collaborationCheckedRef.current = true

    void (async () => {
      try {
        const info = await getHospitalInfo({
          hospitalCode: toHospitalCode(hospital.id),
          rcisNo: careInstitutionNo
        })
        const code = info?.collaborationDivisionCode
        if (code !== 'A' && code !== 'B') {
          setAlertModal({
            isOpen: true,
            message: '현재 협력네트워크 신청이 없습니다. 협력 네트워크 신청 페이지로 이동합니다.',
            onClose: () => router.push('/network')
          })
        }
      } catch (err) {
        console.error('협력병원 정보 조회 실패:', err)
        setAlertModal({
          isOpen: true,
          message: '현재 협력네트워크 신청이 없습니다. 협력 네트워크 신청 페이지로 이동합니다.',
          onClose: () => router.push('/network')
        })
      }
    })()
  }, [profileLoading, profileUser, hospital.id, getHospitalInfo, router])

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

  // 이미 승인 대기 중인 수정요청이 있으면 진입 차단
  useEffect(() => {
    if (pendingUpdateCheckedRef.current) return
    if (updateRequest?.status === PartnerUpdateRequestStatus.Pending) {
      pendingUpdateCheckedRef.current = true
      setAlertModal({
        isOpen: true,
        message: '이미 승인 대기 중인 수정요청이 있습니다.\n검토 완료 후 다시 시도해 주세요.',
        onClose: () => router.push('/mypage')
      })
    }
  }, [updateRequest, router])


  const guideMessages = useMemo(() => {
    return [
      '협력병원 정보수정을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  /** 현재 Step 데이터를 캐시에 저장 */
  const saveCurrentStepData = useCallback(() => {
    const refs = [step1Ref, step2Ref, step3Ref]
    const ref = refs[currentStep - 1]
    const data = ref.current?.getData()
    if (data) {
      setStepDataCache(prev => ({ ...prev, [`step${currentStep}`]: data }))
    }
  }, [currentStep])

  /** 모든 Step 데이터 수집 */
  const collectAllData = useCallback((): HospitalEditStepData => {
    const refs = [step1Ref, step2Ref, step3Ref]
    const currentRef = refs[currentStep - 1]
    const currentData = currentRef.current?.getData()
    return {
      ...stepDataCache,
      [`step${currentStep}`]: currentData ?? stepDataCache[`step${currentStep}` as keyof HospitalEditStepData]
    }
  }, [currentStep, stepDataCache])

  const handleNext = async () => {
    // 필수값 검증
    const refs = [step1Ref, step2Ref, step3Ref]
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
      const mapped = mapHospitalEditStepsToApiInput(allData, toHospitalCode(hospital.id))

      try {
        // 새 첨부파일 업로드
        const files = allData.step3?.files ?? []
        if (files.length > 0) {
          const uploadResults = await Promise.all(files.map(f => uploadFile(f)))
          mapped.attachments = uploadResults.map(r => ({
            originalName: r.originalName,
            storedPath: r.storedPath,
            mimeType: r.mimeType,
            fileSize: r.fileSize
          }))
        }

        // UpdatePartnerApplicationInput에 허용된 필드만 추출
        await updatePartnerApplication({
          id: application.id,
          institutionType: mapped.institutionType,
          hospitalFaxNumber: mapped.hospitalFaxNumber,
          totalBedCount: mapped.totalBedCount,
          totalStaffCount: mapped.totalStaffCount,
          specialistCount: mapped.specialistCount,
          nurseCount: mapped.nurseCount,
          majorEquipment: mapped.majorEquipment,
          remarks: mapped.remarks,
          attachments: mapped.attachments,
          directorCarNo: mapped.directorCarNo
        })

        setAlertModal({
          isOpen: true,
          message: '협력병원 정보수정 요청이 완료되었습니다.',
          onClose: () => router.push('/mypage')
        })
      } catch (error) {
        console.error('협력병원 정보수정 실패:', error)
        const message = CombinedGraphQLErrors.is(error)
          ? (error.errors[0]?.message ?? '정보수정 중 오류가 발생했습니다.')
          : '정보수정 중 오류가 발생했습니다.'
        setAlertModal({ isOpen: true, message })
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
                hideSearch
                showCarNumber
              />
            )}

            {/* 2단계: 의료기관 유형 + 인력현황 */}
            {currentStep === 2 && (
              <StaffInfoStep
                ref={step2Ref}
                currentStep={2}
                totalSteps={totalSteps}
                showStaffInfo={false}
                defaultValues={stepDataCache.step2 ?? stepData?.step2}
              />
            )}

            {/* 3단계: 병원특성 및 기타사항 + 첨부파일 */}
            {currentStep === 3 && (
              <HospitalCharacteristicsStep
                ref={step3Ref}
                currentStep={3}
                totalSteps={totalSteps}
                defaultValues={stepDataCache.step3 ?? stepData?.step3}
              />
            )}

            {/* 하단 버튼 */}
            <div className={styles.formActions}>
              <Button variant='outline' size='large' onClick={handlePrevious} disabled={currentStep === 1}>
                이전 단계
              </Button>
              <Button variant='primary' size='large' onClick={handleNext} disabled={updateLoading}>
                {currentStep === totalSteps ? '협력병원 정보수정' : '다음 단계'}
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
