'use client'

import { useEffect, useRef, useState } from 'react'
import {
  useGetCollaboratingHospitalInfo,
  useHospital,
  useMyProfile,
  useMyPartnerApplication
} from '@/hooks'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { HospitalCode, PartnerType } from '@/graphql/__generated__/types'

// 의원 계열 분기용 EHR InstitutionType 코드 (50=의원, 51=치과의원, 90=한방/한의원)
const CLINIC_CLASSIFICATION_CODES = ['50', '51', '90']

const toHospitalCode = (id: string): HospitalCode => {
  const map: Record<string, HospitalCode> = {
    anam: HospitalCode.Anam,
    guro: HospitalCode.Guro,
    ansan: HospitalCode.Ansan
  }
  return map[id] ?? HospitalCode.Anam
}

export default function EditPartnerRedirectPage() {
  const router = useHospitalRouter()
  const { hospital } = useHospital()
  const { user: profileUser, loading: profileLoading } = useMyProfile()
  const { getHospitalInfo } = useGetCollaboratingHospitalInfo()
  const { application, loading: applicationLoading } = useMyPartnerApplication(
    toHospitalCode(hospital.id)
  )
  const [showAlert, setShowAlert] = useState(false)
  const checkedRef = useRef(false)

  // 수정 가능 조건: 원장 + 체결상태(collaborationDivisionCode) A or B
  // 분기 기준: 신청한 partnerType(A=병원, B=의원) 우선, 없으면 EHR classificationCode 폴백
  useEffect(() => {
    if (profileLoading || applicationLoading || checkedRef.current) return

    const profile = profileUser?.profile
    if (!profile) return

    checkedRef.current = true

    // 원장이 아니면 mypage로
    if (!profile.isDirector) {
      router.replace('/mypage')
      return
    }

    const careInstitutionNo = profile.careInstitutionNo
    if (!careInstitutionNo) {
      setShowAlert(true)
      return
    }

    void (async () => {
      try {
        const info = await getHospitalInfo({
          hospitalCode: toHospitalCode(hospital.id),
          rcisNo: careInstitutionNo
        })
        const code = info?.collaborationDivisionCode
        if (code !== 'A' && code !== 'B') {
          setShowAlert(true)
          return
        }

        let editPath: string
        if (application?.partnerType === PartnerType.B) {
          editPath = '/mypage/edit-clinic'
        } else if (application?.partnerType === PartnerType.A) {
          editPath = '/mypage/edit-hospital'
        } else {
          const clsf = info?.classificationCode
          editPath =
            clsf && CLINIC_CLASSIFICATION_CODES.includes(clsf)
              ? '/mypage/edit-clinic'
              : '/mypage/edit-hospital'
        }
        router.replace(editPath)
      } catch (err) {
        console.error('협력병원 정보 조회 실패:', err)
        setShowAlert(true)
      }
    })()
  }, [
    profileLoading,
    applicationLoading,
    profileUser,
    application,
    hospital.id,
    getHospitalInfo,
    router
  ])

  return (
    <AlertModal
      isOpen={showAlert}
      message='현재 협력네트워크 신청이 없습니다. 협력 네트워크 신청 페이지로 이동합니다.'
      closeButtonText='확인'
      onClose={() => {
        setShowAlert(false)
        router.replace('/network')
      }}
      closeOnBackdropClick={false}
    />
  )
}
