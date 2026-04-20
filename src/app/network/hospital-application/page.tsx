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
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { CompleteStep } from '@/components/organisms/CompleteStep/CompleteStep'
import { useHospital, useEnums, useSearchCollaboratingHospitals, useGetCollaboratingHospitalInfo, useMyProfile, useMyPartnerApplication } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { useApplyPartnerHospital } from '@/hooks'
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
import { HospitalCode, PartnerStatus, PartnerType } from '@/graphql/__generated__/types'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { mapStepsToApiInput, type AllStepData } from '@/utils/partnerApplicationMapper'
import { saveDraftToCookie, loadDraftFromCookie, clearDraftCookie } from '@/utils/draftCookie'
import { uploadFile } from '@/lib/upload'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
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

// 의원 계열 분기용 EHR InstitutionType 코드 (50=의원, 51=치과의원, 90=한방/한의원)
const CLINIC_CLASSIFICATION_CODES = ['50', '51', '90']

export default function HospitalApplicationPage() {
  const { hospital } = useHospital()
  const { user, isAuthenticated } = useAuthContext()
  const router = useHospitalRouter()

  // 비회원 접근 차단
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // 페이지 진입 시 enum 코드 목록 미리 조회 (하위 Step에서 cache-first로 재사용)
  useEnums()

  // 현재 단계 상태
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8
  // Step 리마운트 키 (불러오기 시 강제 리마운트용)
  const [reloadKey, setReloadKey] = useState(0)
  // 완료 상태
  const [isComplete, setIsComplete] = useState(false)
  // AlertModal 상태
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })
  // 이미 승인된 병원 여부 모달 (A/B 체결 상태 → 수정 페이지로 이동)
  const [existingApplicationModal, setExistingApplicationModal] = useState(false)
  const [existingEditPath, setExistingEditPath] = useState<string>('/mypage/edit-hospital')
  const approvalChecked = useRef(false)
  const accessCheckStarted = useRef(false)
  // 기존 신청(PENDING/TERMINATED) 차단 모달
  const [blockingApplicationModal, setBlockingApplicationModal] = useState<{
    isOpen: boolean
    message: string
  }>({ isOpen: false, message: '' })
  const applicationStatusChecked = useRef(false)

  // Step별 ref
  const step1Ref = useRef<StepRef<HospitalInfoStepData>>(null)
  const step2Ref = useRef<StepRef<DirectorInfoStepData>>(null)
  const step3Ref = useRef<StepRef<StaffInfoStepData>>(null)
  const step4Ref = useRef<StepRef<BedAndFacilityStepData>>(null)
  const step5Ref = useRef<StepRef<CareSystemStepData>>(null)
  const step6Ref = useRef<StepRef<MedicalDepartmentStepData>>(null)
  const step7Ref = useRef<StepRef<BasicTreatmentStepData>>(null)
  const step8Ref = useRef<StepRef<HospitalCharacteristicsStepData>>(null)

  // 서버에서 최신 프로필 조회 (localStorage에 profile이 없을 수 있으므로)
  const { user: profileUser, loading: profileLoading } = useMyProfile()

  // 원장여부 체크 (서버 최신 프로필 기준)
  const [directorAlertOpen, setDirectorAlertOpen] = useState(false)
  useEffect(() => {
    if (!profileLoading && profileUser && !profileUser.profile?.isDirector) {
      setDirectorAlertOpen(true)
    }
  }, [profileLoading, profileUser])

  // 진입 시점: 이미 제출된 신청(PENDING/APPROVED/TERMINATED) 존재 여부 체크
  const { application: myApplication, loading: myApplicationLoading } = useMyPartnerApplication(
    toHospitalCode(hospital.id)
  )
  useEffect(() => {
    if (myApplicationLoading || applicationStatusChecked.current || !myApplication) return
    applicationStatusChecked.current = true

    if (myApplication.status === PartnerStatus.Pending) {
      setBlockingApplicationModal({
        isOpen: true,
        message: '이미 신청 진행 중인 협력병의원이 있습니다.\n심사 완료 후 다시 이용해주세요.'
      })
    } else if (myApplication.status === PartnerStatus.Approved) {
      if (!approvalChecked.current) {
        approvalChecked.current = true
        setExistingEditPath(
          myApplication.partnerType === 'B' ? '/mypage/edit-clinic' : '/mypage/edit-hospital'
        )
        setExistingApplicationModal(true)
      }
    } else if (myApplication.status === PartnerStatus.Terminated) {
      setBlockingApplicationModal({
        isOpen: true,
        message: '해지된 협력 이력이 있어 재신청이 불가합니다.\n관리자에게 문의해주세요.'
      })
    }
    // DRAFT, REJECTED: 백엔드가 기존 레코드를 업데이트하므로 진행 허용
  }, [myApplication, myApplicationLoading])

  // EHR 조회 훅 (접근체크 + 초기값 로딩에서 공유)
  const { getHospitalInfo } = useGetCollaboratingHospitalInfo()
  const { searchHospitals } = useSearchCollaboratingHospitals()

  // 진입 접근체크: 원장 + EHR 체결상태(A/B) → 수정 페이지로 이동
  // 분기 기준: 신청한 partnerType(A/B) 우선, 없으면 EHR classificationCode 폴백
  useEffect(() => {
    if (profileLoading || myApplicationLoading || accessCheckStarted.current) return
    const profile = profileUser?.profile
    if (!profile?.isDirector) return
    const rcisNo = profile.careInstitutionNo
    if (!rcisNo) return

    accessCheckStarted.current = true

    void (async () => {
      try {
        const info = await getHospitalInfo({
          hospitalCode: toHospitalCode(hospital.id),
          rcisNo
        })
        const code = info?.collaborationDivisionCode
        if (code !== 'A' && code !== 'B') return
        if (approvalChecked.current) return
        approvalChecked.current = true

        let editPath: string
        if (myApplication?.partnerType === PartnerType.B) {
          editPath = '/mypage/edit-clinic'
        } else if (myApplication?.partnerType === PartnerType.A) {
          editPath = '/mypage/edit-hospital'
        } else {
          const clsf = info?.classificationCode
          editPath =
            clsf && CLINIC_CLASSIFICATION_CODES.includes(clsf)
              ? '/mypage/edit-clinic'
              : '/mypage/edit-hospital'
        }
        setExistingEditPath(editPath)
        setExistingApplicationModal(true)
      } catch (err) {
        console.error('[협력병원 접근체크] EHR 조회 실패:', err)
      }
    })()
  }, [
    profileLoading,
    myApplicationLoading,
    profileUser,
    myApplication,
    hospital.id,
    getHospitalInfo
  ])
  const [userHospitalDefaults, setUserHospitalDefaults] = useState<Partial<HospitalInfoStepData> | undefined>(undefined)
  const [hospitalInfoLoading, setHospitalInfoLoading] = useState(true)
  const hospitalInfoFetched = useRef(false)

  useEffect(() => {
    if (profileLoading || hospitalInfoFetched.current) return

    const profile = profileUser?.profile
    const hospName = profile?.hospName
    const careInstitutionNo = profile?.careInstitutionNo

    if (!hospName && !careInstitutionNo) {
      setHospitalInfoLoading(false)
      return
    }

    hospitalInfoFetched.current = true

    // myProfile 기반 기본값 (API 응답에 빈 필드가 있으면 이 값으로 채움)
    const profileDefaults: Partial<HospitalInfoStepData> = {
      hospitalName: hospName ?? '',
      medicalInstitutionNumber: (careInstitutionNo ?? '').slice(0, 8),
      zipCode: profile?.hospZipCode ?? '',
      address: profile?.hospAddress ?? '',
      detailAddress: profile?.hospAddressDetail ?? '',
      phoneNumber: profile?.hospPhone ?? '',
      website: profile?.hospWebsite ?? ''
    }

    const mergeWithDefaults = (data: Partial<HospitalInfoStepData>): Partial<HospitalInfoStepData> => {
      const merged: Partial<HospitalInfoStepData> = { ...profileDefaults }
      for (const [key, value] of Object.entries(data)) {
        if (value) merged[key as keyof HospitalInfoStepData] = value
      }
      return merged
    }

    const fetchHospitalInfo = async () => {
      try {
        // 요양기관번호가 있으면 ehrGetCollaboratingHospitalInfo로 직접 조회
        if (careInstitutionNo) {
          const info = await getHospitalInfo({
            hospitalCode: toHospitalCode(hospital.id),
            rcisNo: careInstitutionNo
          })
          if (info) {
            setUserHospitalDefaults(mergeWithDefaults({
              hospitalName: info.name ?? '',
              medicalInstitutionNumber: (info.careInstitutionNo ?? '').slice(0, 8),
              zipCode: info.zipCode ?? '',
              address: info.address ?? '',
              detailAddress: info.addressDetail ?? '',
              phoneNumber: info.phone ?? '',
              faxNumber: info.fax ?? '',
              website: info.website ?? ''
            }))
            setHospitalInfoLoading(false)
            return
          }
        }

        // 요양기관번호 조회 실패 시 병원명으로 검색
        if (hospName) {
          const result = await searchHospitals({
            hospitalCode: toHospitalCode(hospital.id),
            hsptNm: hospName
          })
          const matched = result?.hospitals?.find(
            h => h.phisCode === careInstitutionNo
          ) ?? result?.hospitals?.[0]

          if (matched) {
            setUserHospitalDefaults(mergeWithDefaults({
              hospitalName: matched.name ?? '',
              medicalInstitutionNumber: (matched.phisCode ?? '').slice(0, 8),
              zipCode: matched.zipCode ?? '',
              address: matched.address ?? '',
              detailAddress: matched.addressDetail ?? '',
              phoneNumber: matched.phone ?? '',
              faxNumber: matched.faxNumber ?? '',
              website: matched.website ?? ''
            }))
            setHospitalInfoLoading(false)
            return
          }
        }

        // 둘 다 실패 시 프로필 기본값
        setUserHospitalDefaults(profileDefaults)
      } catch (err) {
        console.error('[병원정보 조회] 에러:', err)
        setUserHospitalDefaults(profileDefaults)
      } finally {
        setHospitalInfoLoading(false)
      }
    }

    fetchHospitalInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileLoading, profileUser, hospital.id])

  // MyProfile에서 조회한 최신 프로필로 병원장 정보 초기값 생성
  const userDirectorDefaults = useMemo<Partial<DirectorInfoStepData> | undefined>(() => {
    if (!profileUser) return undefined
    const defaults: Partial<DirectorInfoStepData> = {
      directorName: profileUser.userName ?? '',
      birthDate: profileUser.profile?.birthDate?.slice(0, 10) ?? '',
      licenseNumber: profileUser.profile?.licenseNo ?? '',
      phone: profileUser.phone ?? '',
      gender: profileUser.profile?.gender ?? '',
      email: profileUser.email ?? '',
      school: profileUser.profile?.school ?? '',
      graduationYear: profileUser.profile?.graduationYear ?? '',
      trainingHospital: profileUser.profile?.trainingHospital ?? '',
      department: profileUser.profile?.department ?? '',
      specialty: profileUser.profile?.specialty ?? '',
      isDirector: profileUser.profile?.isDirector ?? false,
      smsConsent: profileUser.profile ? (profileUser.profile.smsConsent ? '동의' : '비동의') : '',
      emailConsent: profileUser.profile ? (profileUser.profile.emailConsent ? '동의' : '비동의') : '',
      replyConsent: profileUser.profile ? (profileUser.profile.replyConsent ? '동의' : '비동의') : ''
    }
    return defaults
  }, [profileUser])

  // Step 데이터 캐시 (조건부 렌더링으로 언마운트되는 Step 데이터 보존)
  const [stepDataCache, setStepDataCache] = useState<AllStepData>({})

  // GraphQL 훅
  const { applyPartnerHospital, loading: applyLoading } = useApplyPartnerHospital()

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
      const input = mapStepsToApiInput(allData, toHospitalCode(hospital.id))

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
        clearDraftCookie('hospital', hospital.id)
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

  // 임시저장 핸들러 (쿠키 기반, 유효기간 7일)
  const handleSaveDraft = () => {
    const allData = collectAllData()
    saveDraftToCookie('hospital', hospital.id, allData as unknown as Record<string, unknown>)
    setAlertModal({ isOpen: true, message: '임시저장이 완료되었습니다.' })
  }

  // 임시저장 불러오기 핸들러 (쿠키에서 불러오기)
  const handleLoadButtonClick = () => {
    const loaded = loadDraftFromCookie('hospital', hospital.id) as AllStepData | null
    if (loaded) {
      setStepDataCache(loaded)
      setReloadKey(prev => prev + 1)
      setAlertModal({ isOpen: true, message: '임시저장 데이터를 불러왔습니다.' })
    } else {
      setAlertModal({ isOpen: true, message: '임시저장된 데이터가 없습니다.' })
    }
  }

  const isSubmitting = applyLoading

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
                {currentStep === 1 && !hospitalInfoLoading && (
                  <HospitalInfoStep
                    key={`step1-${reloadKey}`}
                    ref={step1Ref}
                    currentStep={1}
                    totalSteps={8}
                    defaultValues={stepDataCache.step1 ?? userHospitalDefaults}
                    hideSearch
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
                    readOnly
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

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        closeButtonText='확인'
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
        closeOnBackdropClick={true}
      />

      {/* 이미 승인된 병원인 경우 수정 페이지로 이동 모달 */}
      <AlertModal
        isOpen={existingApplicationModal}
        message='이미 승인된 협력병의원입니다. 수정 페이지로 이동합니다.'
        closeButtonText='확인'
        onClose={() => {
          setExistingApplicationModal(false)
          router.push(existingEditPath)
        }}
      />

      {/* 진행 중(PENDING) / 해지(TERMINATED) 신청 존재 시 차단 모달 */}
      <AlertModal
        isOpen={blockingApplicationModal.isOpen}
        message={blockingApplicationModal.message}
        closeButtonText='확인'
        onClose={() => {
          setBlockingApplicationModal({ isOpen: false, message: '' })
          router.replace('/network')
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
