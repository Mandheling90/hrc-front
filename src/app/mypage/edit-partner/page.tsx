'use client'

import { useEffect, useState } from 'react'
import { useHospital, useMyPartnerApplications, useMyProfile } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'

const CLINIC_TYPES = ['CLINIC', 'DENTAL_CLINIC', 'ORIENTAL']

export default function EditPartnerRedirectPage() {
  const router = useHospitalRouter()
  const { hospital } = useHospital()
  const { user } = useAuthContext()
  const { user: profileUser, loading: profileLoading } = useMyProfile()
  const { applications, loading } = useMyPartnerApplications({ page: 1, limit: 1 })
  const [showAlert, setShowAlert] = useState(false)

  // 원장여부 체크 - 서버 최신 프로필 기준으로 판단
  useEffect(() => {
    if (!profileLoading && profileUser && !profileUser.profile?.isDirector) {
      router.replace('/mypage')
    }
  }, [profileLoading, profileUser, router])

  useEffect(() => {
    if (loading) return

    if (applications.length > 0) {
      const institutionType = applications[0].institutionType
      const editPath = institutionType && CLINIC_TYPES.includes(institutionType)
        ? '/mypage/edit-clinic'
        : '/mypage/edit-hospital'
      router.replace(editPath)
    } else {
      // 신청 내역이 없으면 알림 후 신청 페이지로 이동
      setShowAlert(true)
    }
  }, [loading, applications, hospital.id, router])

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
