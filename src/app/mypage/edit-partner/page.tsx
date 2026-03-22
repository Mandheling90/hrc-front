'use client'

import { useEffect } from 'react'
import { useHospital, useMyPartnerApplications } from '@/hooks'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'

const CLINIC_TYPES = ['CLINIC', 'DENTAL_CLINIC', 'ORIENTAL']

export default function EditPartnerRedirectPage() {
  const router = useHospitalRouter()
  const { hospital } = useHospital()
  const { applications, loading } = useMyPartnerApplications({ page: 1, limit: 1 })

  useEffect(() => {
    if (loading) return

    if (applications.length > 0) {
      const institutionType = applications[0].institutionType
      const editPath = CLINIC_TYPES.includes(institutionType)
        ? '/mypage/edit-clinic'
        : '/mypage/edit-hospital'
      router.replace(editPath)
    } else {
      // 신청 내역이 없으면 마이페이지로
      router.replace('/mypage')
    }
  }, [loading, applications, hospital.id, router])

  return null
}
