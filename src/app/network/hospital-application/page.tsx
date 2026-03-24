'use client'

import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Button } from '@/components/atoms/Button/Button'
import { ConfirmButtons } from '@/components/molecules/ConfirmButtons/ConfirmButtons'
import { SaveIcon } from '@/components/icons/SaveIcon'
import { LoadIcon } from '@/components/icons/LoadIcon'
import { HospitalInfoStep } from '@/components/organisms/HospitalInfoStep/HospitalInfoStep'
import { DirectorInfoStep } from '@/components/organisms/DirectorInfoStep/DirectorInfoStep'
import { StaffInfoStep } from '@/components/organisms/StaffInfoStep/StaffInfoStep'
import { BedAndFacilityStep } from '@/components/organisms/BedAndFacilityStep/BedAndFacilityStep'
import { CareSystemStep } from '@/components/organisms/CareSystemStep/CareSystemStep'
import { MedicalDepartmentStep } from '@/components/organisms/MedicalDepartmentStep/MedicalDepartmentStep'
import { BasicTreatmentStep } from '@/components/organisms/BasicTreatmentStep/BasicTreatmentStep'
import { HospitalCharacteristicsStep } from '@/components/organisms/HospitalCharacteristicsStep/HospitalCharacteristicsStep'
import { LoadSaveModal } from '@/components/molecules/LoadSaveModal/LoadSaveModal'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { CompleteStep } from '@/components/organisms/CompleteStep/CompleteStep'
import { useHospital, useEnums } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { useDraftApplication } from '@/contexts/DraftApplicationContext'
import { useApplyPartnerHospital, useSaveDraftPartnerApplication, usePartnerApplicationById, useMyPartnerApplications } from '@/hooks'
import type { StepRef } from '@/types/partner-application'
import type {
  HospitalInfoStepData,
  DirectorInfoStepData,
  StaffInfoStepData,
  BedAndFacilityStepData,
  CareSystemStepData,
  MedicalDepartmentStepData,
  BasicTreatmentStepData,
  HospitalCharacteristicsStepData
} from '@/types/partner-application'
import { HospitalCode } from '@/graphql/__generated__/types'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { mapStepsToApiInput, mapApiToStepData, type AllStepData } from '@/utils/partnerApplicationMapper'
import { uploadFile } from '@/lib/upload'
import { DEV_DIRECTOR_EXTRA } from '@/utils/devDefaultData'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import styles from './page.module.scss'

const isDev = process.env.NODE_ENV === 'development'

/** HospitalId → HospitalCode 변환 */
const toHospitalCode = (id: string): HospitalCode => {
  const map: Record<string, HospitalCode> = {
    anam: HospitalCode.Anam,
    guro: HospitalCode.Guro,
    ansan: HospitalCode.Ansan
  }
  return map[id] ?? HospitalCode.Anam
}

export default function HospitalApplicationPage() {
  const { hospital } = useHospital()
  const { user, isAuthenticated } = useAuthContext()
  const { getDraftId, setDraftId } = useDraftApplication()
  const router = useHospitalRouter()

  // 비회원 접근 차단
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // 원장여부 체크
  const [directorAlertOpen, setDirectorAlertOpen] = useState(false)
  useEffect(() => {
    if (user && !user.profile?.isDirector) {
      setDirectorAlertOpen(true)
    }
  }, [user])

  // 페이지 진입 시 enum 코드 목록 미리 조회 (하위 Step에서 cache-first로 재사용)
  useEnums()

  // 현재 단계 상태
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8
  // Step 리마운트 키 (불러오기 시 강제 리마운트용)
  const [reloadKey, setReloadKey] = useState(0)
  // 임시저장 불러오기 모달 상태
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false)
  // 완료 상태
  const [isComplete, setIsComplete] = useState(false)
  // AlertModal 상태
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })
  // 이미 신청된 내역 존재 여부 모달
  const [existingApplicationModal, setExistingApplicationModal] = useState(false)

  // 기존 신청 내역 조회
  const { applications: existingApplications, loading: existingLoading } = useMyPartnerApplications(
    { page: 1, limit: 1 }
  )

  // 페이지 진입 시 기존 신청 내역 확인
  useEffect(() => {
    if (!existingLoading && existingApplications.length > 0) {
      setExistingApplicationModal(true)
    }
  }, [existingLoading, existingApplications])

  // Step별 ref
  const step1Ref = useRef<StepRef<HospitalInfoStepData>>(null)
  const step2Ref = useRef<StepRef<DirectorInfoStepData>>(null)
  const step3Ref = useRef<StepRef<StaffInfoStepData>>(null)
  const step4Ref = useRef<StepRef<BedAndFacilityStepData>>(null)
  const step5Ref = useRef<StepRef<CareSystemStepData>>(null)
  const step6Ref = useRef<StepRef<MedicalDepartmentStepData>>(null)
  const step7Ref = useRef<StepRef<BasicTreatmentStepData>>(null)
  const step8Ref = useRef<StepRef<HospitalCharacteristicsStepData>>(null)

  // 로그인 시 유저 프로필에서 병원 정보 초기값 생성
  const userHospitalDefaults = useMemo<Partial<HospitalInfoStepData> | undefined>(() => {
    if (!user?.profile) return undefined
    return {
      hospitalName: user.profile.hospName ?? '',
      medicalInstitutionNumber: user.profile.careInstitutionNo ?? '',
      zipCode: user.profile.hospZipCode ?? '',
      address: user.profile.hospAddress ?? '',
      detailAddress: user.profile.hospAddressDetail ?? '',
      phoneNumber: user.profile.hospPhone ?? '',
      website: user.profile.hospWebsite ?? ''
    }
  }, [user])

  // 로그인 시 유저 프로필에서 병원장 정보 초기값 생성
  const userDirectorDefaults = useMemo<Partial<DirectorInfoStepData> | undefined>(() => {
    if (!user) return undefined
    const genderMap: Record<string, string> = { M: '남자', F: '여자' }
    const defaults: Partial<DirectorInfoStepData> = {
      directorName: user.userName ?? '',
      birthDate: user.profile?.birthDate?.slice(0, 10) ?? '',
      licenseNumber: user.profile?.licenseNo ?? '',
      phone: user.phone ?? '',
      gender: user.profile?.gender ? (genderMap[user.profile.gender] ?? '') : '',
      email: user.email ?? '',
      school: user.profile?.school ?? '',
      department: user.profile?.department ?? '',
      specialty: user.profile?.specialty ?? '',
      isDirector: user.profile?.isDirector ?? false,
      smsConsent: user.profile ? (user.profile.smsConsent ? '동의' : '비동의') : '',
      emailConsent: user.profile ? (user.profile.emailConsent ? '동의' : '비동의') : '',
      replyConsent: user.profile ? (user.profile.replyConsent ? '동의' : '비동의') : ''
    }
    if (isDev) {
      // dev 보충값: 유저 프로필에서 빈 값인 필드만 채움
      for (const [key, val] of Object.entries(DEV_DIRECTOR_EXTRA)) {
        const k = key as keyof DirectorInfoStepData
        if (!defaults[k]) defaults[k] = val as never
      }
    }
    return defaults
  }, [user])

  // Step 데이터 캐시 (조건부 렌더링으로 언마운트되는 Step 데이터 보존)
  const [stepDataCache, setStepDataCache] = useState<AllStepData>({})

  // GraphQL 훅
  const { applyPartnerHospital, loading: applyLoading } = useApplyPartnerHospital()
  const { saveDraft, loading: saveDraftLoading } = useSaveDraftPartnerApplication()
  const { getPartnerApplication } = usePartnerApplicationById()

  // 안내 메시지
  const guideMessages = useMemo(() => {
    return [
      '협력병원 신청을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  /** 현재 Step ref에서 데이터를 추출하여 캐시 갱신 */
  const saveCurrentStepData = useCallback(() => {
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref, step6Ref, step7Ref, step8Ref]
    const ref = refs[currentStep - 1]
    const data = ref.current?.getData()
    if (data) {
      setStepDataCache(prev => ({
        ...prev,
        [`step${currentStep}`]: data
      }))
    }
  }, [currentStep])

  /** 모든 Step 데이터 수집 (캐시 + 현재 Step) */
  const collectAllData = useCallback((): AllStepData => {
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref, step6Ref, step7Ref, step8Ref]
    const currentRef = refs[currentStep - 1]
    const currentData = currentRef.current?.getData()
    return {
      ...stepDataCache,
      [`step${currentStep}`]: currentData ?? stepDataCache[`step${currentStep}` as keyof AllStepData]
    }
  }, [currentStep, stepDataCache])

  // 다음 단계 핸들러
  const handleNext = async () => {
    // 필수값 검증
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref, step6Ref, step7Ref, step8Ref]
    const currentRef = refs[currentStep - 1]
    const validationError = currentRef.current?.validate?.()
    if (validationError) {
      setAlertModal({ isOpen: true, message: validationError })
      return
    }

    saveCurrentStepData()

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === totalSteps) {
      // 마지막 단계 → 신청 제출
      const allData = collectAllData()
      const hospitalId = user?.hospitalId ?? user?.id ?? ''
      const input = mapStepsToApiInput(allData, hospitalId, toHospitalCode(hospital.id))

      try {
        // 첨부파일 업로드
        const files = allData.step8?.files ?? []
        if (files.length > 0) {
          const uploadResults = await Promise.all(files.map(f => uploadFile(f)))
          input.attachments = uploadResults.map(r => ({
            originalName: r.originalName,
            storedPath: r.storedPath,
            mimeType: r.mimeType,
            fileSize: r.fileSize
          }))
        }

        await applyPartnerHospital(input)
        setIsComplete(true)
      } catch (error: unknown) {
        console.error('협력병원 신청 실패:', error)
        const message = CombinedGraphQLErrors.is(error)
          ? (error.errors[0]?.message ?? '신청 중 오류가 발생했습니다.')
          : '신청 중 오류가 발생했습니다.'
        setAlertModal({ isOpen: true, message })
      }
    }
    window.scrollTo(0, 0)
  }

  // 이전 단계 핸들러
  const handlePrevious = () => {
    saveCurrentStepData()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // 임시저장 핸들러
  const handleSaveDraft = async () => {
    const allData = collectAllData()
    const hospitalId = user?.hospitalId ?? user?.id ?? ''
    const input = mapStepsToApiInput(allData, hospitalId, toHospitalCode(hospital.id))

    try {
      // 첨부파일 업로드
      const files = allData.step8?.files ?? []
      if (files.length > 0) {
        const uploadResults = await Promise.all(files.map(f => uploadFile(f)))
        input.attachments = uploadResults.map(r => ({
          originalName: r.originalName,
          storedPath: r.storedPath,
          mimeType: r.mimeType,
          fileSize: r.fileSize
        }))
      }

      const result = await saveDraft({
        ...input,
        hospitalCode: toHospitalCode(hospital.id)
      })
      if (result?.id) {
        setDraftId(hospital.id, result.id)
      }
      setAlertModal({ isOpen: true, message: '임시저장이 완료되었습니다.' })
    } catch (error: unknown) {
      console.error('임시저장 실패:', error)
      const message = CombinedGraphQLErrors.is(error)
        ? (error.errors[0]?.message ?? '임시저장 중 오류가 발생했습니다.')
        : '임시저장 중 오류가 발생했습니다.'
      setAlertModal({ isOpen: true, message })
    }
  }

  // partnerApplicationById로 임시저장 데이터 불러오기
  const loadById = async (id: string) => {
    const application = await getPartnerApplication(id)
    if (application) {
      const loaded = mapApiToStepData(application)
      setStepDataCache(loaded)
      setIsLoadModalOpen(false)
      // key 변경으로 현재 스텝 컴포넌트 강제 리마운트
      setReloadKey(prev => prev + 1)
    } else {
      setAlertModal({ isOpen: true, message: '임시저장된 데이터가 없습니다.' })
    }
  }

  // 임시저장 불러오기 핸들러 (로그인 시 바로 불러오기, 비로그인 시 모달에서 호출)
  const handleLoadButtonClick = async () => {
    if (isAuthenticated) {
      const id = getDraftId(hospital.id)
      if (id) {
        try {
          await loadById(id)
        } catch {
          setAlertModal({ isOpen: true, message: '임시저장 불러오기에 실패했습니다.' })
        }
      } else {
        setAlertModal({ isOpen: true, message: '임시저장된 데이터가 없습니다.' })
      }
    } else {
      // 비로그인 상태: 모달 열기
      setIsLoadModalOpen(true)
    }
  }

  const handleLoadDraft = async (_doctorLicense: string, _medicalInstitutionNumber: string) => {
    // TODO: 비로그인 시 면허번호/기관번호로 조회하는 API 연동
    setIsLoadModalOpen(false)
  }

  const isSubmitting = applyLoading || saveDraftLoading

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력병원 신청</h1>

          <div className={styles.content}>
            {isComplete ? (
              /* 완료 컴포넌트 */
              <CompleteStep
                userId={user?.userId ?? ''}
                email={user?.email ?? ''}
                title={`${hospital.name.full} 협력병원 신청이 완료되었습니다.`}
                description={`담당자 확인 후 승인 절차가 진행되며, 승인 완료 시 협력병원 체결이 최종 완료됩니다.\n승인 결과는 등록하신 이메일 및 문자로 안내드릴 예정입니다.`}
                buttonText='메인으로 이동'
                onGoToMain={() => {
                  const hospitalId = window.location.pathname.split('/')[1]
                  window.location.href = ['anam', 'guro', 'ansan'].includes(hospitalId) ? `/${hospitalId}` : '/'
                }}
              />
            ) : (
              <>
                {/* 협력병원 신청 안내 */}
                <div className={styles.guideSection}>
                  <SectionTitle title='협력병원 신청 안내' className={styles.sectionTitle} />
                  <InfoBox
                    variant='guide'
                    messages={guideMessages}
                    showBullets={true}
                    highlightLast={true}
                    contentAlign='center'
                  />
                </div>

                {/* 저장/불러오기 버튼 (2단계부터 노출) */}
                {currentStep >= 2 && (
                  <div className={styles.actionButtons}>
                    <Button variant='primary' size='small' pill onClick={handleSaveDraft} disabled={isSubmitting}>
                      임시저장
                      <LoadIcon width={16} height={16} stroke='#fff' strokeWidth={1.25} />
                    </Button>
                    <Button variant='outline' size='small' pill onClick={handleLoadButtonClick}>
                      임시저장 불러오기
                      <SaveIcon width={16} height={16} stroke='currentColor' strokeWidth={1.25} />
                    </Button>
                  </div>
                )}

                {/* 1단계: 병원 정보 */}
                {currentStep === 1 && (
                  <HospitalInfoStep
                    key={`step1-${reloadKey}`}
                    ref={step1Ref}
                    currentStep={1}
                    totalSteps={8}
                    defaultValues={stepDataCache.step1 ?? userHospitalDefaults}
                  />
                )}

                {/* 2단계: 병원장 정보 */}
                {currentStep === 2 && (
                  <DirectorInfoStep
                    key={`step2-${reloadKey}`}
                    ref={step2Ref}
                    currentStep={2}
                    totalSteps={8}
                    defaultValues={stepDataCache.step2 ?? userDirectorDefaults}
                  />
                )}

                {/* 3단계: 실무자 정보 */}
                {currentStep === 3 && (
                  <StaffInfoStep
                    key={`step3-${reloadKey}`}
                    ref={step3Ref}
                    currentStep={3}
                    totalSteps={8}
                    defaultValues={stepDataCache.step3}
                  />
                )}

                {/* 4단계: 병상 및 시설 운영 현황 */}
                {currentStep === 4 && (
                  <BedAndFacilityStep
                    key={`step4-${reloadKey}`}
                    ref={step4Ref}
                    currentStep={4}
                    totalSteps={8}
                    defaultValues={stepDataCache.step4}
                  />
                )}

                {/* 5단계: 간병 시스템 */}
                {currentStep === 5 && (
                  <CareSystemStep
                    key={`step5-${reloadKey}`}
                    ref={step5Ref}
                    currentStep={5}
                    totalSteps={8}
                    defaultValues={stepDataCache.step5}
                  />
                )}

                {/* 6단계: 진료과 운영 현황 및 주요 보유 장비 */}
                {currentStep === 6 && (
                  <MedicalDepartmentStep
                    key={`step6-${reloadKey}`}
                    ref={step6Ref}
                    currentStep={6}
                    totalSteps={8}
                    defaultValues={stepDataCache.step6}
                  />
                )}

                {/* 7단계: 기본 처치 가능 항목 */}
                {currentStep === 7 && (
                  <BasicTreatmentStep
                    key={`step7-${reloadKey}`}
                    ref={step7Ref}
                    currentStep={7}
                    totalSteps={8}
                    defaultValues={stepDataCache.step7}
                  />
                )}

                {/* 8단계: 병원특성 및 기타사항, 첨부파일 */}
                {currentStep === 8 && (
                  <HospitalCharacteristicsStep
                    key={`step8-${reloadKey}`}
                    ref={step8Ref}
                    currentStep={8}
                    totalSteps={8}
                    defaultValues={stepDataCache.step8}
                  />
                )}

                {/* 하단 버튼 */}
                <ConfirmButtons
                  secondaryButton={{
                    label: '이전 단계',
                    onClick: handlePrevious,
                    disabled: currentStep === 1
                  }}
                  primaryButton={{
                    label: currentStep === totalSteps ? '협력병원 신청' : '다음 단계',
                    onClick: handleNext,
                    disabled: isSubmitting
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
        onLoad={handleLoadDraft}
        closeOnBackdropClick={true}
      />

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        closeButtonText='확인'
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
        closeOnBackdropClick={true}
      />

      {/* 기존 신청 내역 존재 시 수정 페이지로 이동 모달 */}
      <AlertModal
        isOpen={existingApplicationModal}
        message='이미 신청된 내역이 있습니다. 수정으로 이동합니다.'
        closeButtonText='확인'
        onClose={() => {
          setExistingApplicationModal(false)
          const institutionType = existingApplications[0]?.institutionType
          const clinicTypes = ['CLINIC', 'DENTAL_CLINIC', 'ORIENTAL']
          const editPath = institutionType && clinicTypes.includes(institutionType)
            ? '/mypage/edit-clinic'
            : '/mypage/edit-hospital'
          router.push(editPath)
        }}
      />

      {/* 원장이 아닌 경우 알림 모달 */}
      <AlertModal
        isOpen={directorAlertOpen}
        message='원장만 협력네트워크 신청이 가능합니다.'
        closeButtonText='확인'
        onClose={() => {
          setDirectorAlertOpen(false)
          router.replace('/network')
        }}
      />
    </div>
  )
}
