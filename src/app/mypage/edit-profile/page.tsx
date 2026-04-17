'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useMyProfile, useUpdateProfile } from '@/hooks/useAuth'
import { useHospital } from '@/contexts/HospitalContext'
import { useGetCollaboratingHospitalInfo, useSearchCollaboratingHospitals } from '@/hooks/useCollaboratingHospital'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { MemberInfoForm, MemberInfoFormData } from '@/components/organisms/MemberInfoForm/MemberInfoForm'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { AuthUser } from '@/types/auth'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { UpdateDoctorProfileInput } from '@/hooks/useAuth'
import { HospitalCode } from '@/graphql/__generated__/types'
import styles from './page.module.scss'

const HOSPITAL_CODE_MAP: Record<string, HospitalCode> = {
  anam: HospitalCode.Anam,
  guro: HospitalCode.Guro,
  ansan: HospitalCode.Ansan
}

/** 서버 enum → 폼 라디오 value 매핑 */
const DOCTOR_TYPE_TO_FORM: Record<string, string> = {
  DOCTOR: '1',
  ORIENTAL_DOCTOR: '2',
  DENTIST: '3'
}

/** API에서 받은 사용자 정보를 폼 데이터 형식으로 변환 */
const mapUserToFormData = (user: AuthUser): Partial<MemberInfoFormData> => {
  const profile = user.profile

  const doctorType = profile?.doctorType || user.userType

  return {
    name: user.userName || '',
    birthDate: profile?.birthDate ? profile.birthDate.split('T')[0] : '',
    memberType: DOCTOR_TYPE_TO_FORM[doctorType] || '1',
    phone: user.phone || '',
    userId: user.userId || '',
    password: '',
    passwordConfirm: '',
    email: user.email || '',
    licenseNumber: profile?.licenseNo || '',
    isDirector: !!profile?.isDirector,
    school: profile?.school || '',
    department: profile?.department || '전체',
    specialty: profile?.specialty || '',
    graduationYear: profile?.graduationYear || '',
    trainingHospital: profile?.trainingHospital || '',
    gender: profile?.gender || '',
    smsConsent: profile?.smsConsent ? 'Y' : 'N',
    emailConsent: profile?.emailConsent ? 'Y' : 'N',
    replyConsent: profile?.replyConsent ? 'Y' : 'N',
    hospitalName: profile?.hospName || '',
    careNumber: (profile?.careInstitutionNo || '').slice(0, 8),
    zipCode: profile?.hospZipCode || '',
    address: profile?.hospAddress || '',
    addressDetail: profile?.hospAddressDetail || '',
    hospitalPhone: profile?.hospPhone || '',
    hospitalWebsite: profile?.hospWebsite || ''
  }
}


/** 폼 데이터를 API 입력 형식으로 변환 */
const mapFormDataToInput = (data: MemberInfoFormData): UpdateDoctorProfileInput => {
  const input: UpdateDoctorProfileInput = {
    userName: data.name,
    email: data.email,
    phone: data.phone,
    doctorType: data.memberType,
    licenseNo: data.licenseNumber,
    isDirector: data.isDirector,
    school: data.school,
    department: data.department,
    specialty: data.specialty || undefined,
    graduationYear: data.graduationYear || undefined,
    trainingHospital: data.trainingHospital || undefined,
    smsConsent: data.smsConsent === 'Y',
    emailConsent: data.emailConsent === 'Y',
    replyConsent: data.replyConsent === 'Y',
    hospName: data.hospitalName,
    careInstitutionNo: data.careNumber,
    hospZipCode: data.zipCode,
    hospAddress: data.address,
    hospAddressDetail: data.addressDetail || undefined,
    hospPhone: data.hospitalPhone,
    hospWebsite: data.hospitalWebsite || undefined
  }

  // 비밀번호 변경 시 oldPassword, newPassword 포함
  if (data.currentPassword && data.password) {
    input.oldPassword = data.currentPassword
    input.newPassword = data.password
  }

  return input
}

export default function EditProfilePage() {
  const router = useHospitalRouter()
  const { hospital } = useHospital()
  const { user, loading } = useMyProfile()
  const { updateProfile, loading: updating } = useUpdateProfile()
  const { getHospitalInfo } = useGetCollaboratingHospitalInfo()
  const { searchHospitals } = useSearchCollaboratingHospitals()
  const hospitalInfoFetched = useRef(false)
  const [hospitalData, setHospitalData] = useState<Partial<MemberInfoFormData> | null>(null)
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })

  // 요양기관번호로 병원 정보 자동 조회
  useEffect(() => {
    if (loading || !user || hospitalInfoFetched.current) return

    const profile = user.profile
    const careInstitutionNo = profile?.careInstitutionNo
    const hospName = profile?.hospName

    if (!careInstitutionNo && !hospName) return

    hospitalInfoFetched.current = true
    const hospitalCode = HOSPITAL_CODE_MAP[hospital.id] || HospitalCode.Anam

    const fetchHospitalInfo = async () => {
      try {
        // 요양기관번호로 직접 조회
        if (careInstitutionNo) {
          const info = await getHospitalInfo({ hospitalCode, rcisNo: careInstitutionNo })
          if (info) {
            setHospitalData({
              hospitalName: info.name || '',
              careNumber: (info.careInstitutionNo || '').slice(0, 8),
              zipCode: info.zipCode || '',
              address: info.address || '',
              addressDetail: info.addressDetail || '',
              hospitalPhone: info.phone || '',
              hospitalWebsite: info.website || ''
            })
            return
          }
        }

        // 요양기관번호 조회 실패 시 병원명으로 검색
        if (hospName) {
          const result = await searchHospitals({ hospitalCode, hsptNm: hospName })
          const matched = result?.hospitals?.find(h => h.phisCode === careInstitutionNo) ?? result?.hospitals?.[0]
          if (matched) {
            setHospitalData({
              hospitalName: matched.name || '',
              careNumber: (matched.phisCode || '').slice(0, 8),
              zipCode: matched.zipCode || '',
              address: matched.address || '',
              addressDetail: matched.addressDetail || '',
              hospitalPhone: matched.phone || '',
              hospitalWebsite: matched.website || ''
            })
            return
          }
        }
      } catch (err) {
        console.error('[병원정보 조회] 에러:', err)
      }
    }

    fetchHospitalInfo()
  }, [loading, user, hospital.id, getHospitalInfo, searchHospitals])

  const userData = useMemo(() => {
    if (!user) return undefined
    const formData = mapUserToFormData(user)
    // 병원 조회 결과가 있으면 병원 필드를 덮어씀
    if (hospitalData) {
      return { ...formData, ...hospitalData }
    }
    return formData
  }, [user, hospitalData])

  const handleCancel = () => {
    router.back()
  }

  const handleWithdraw = () => {
    router.push('/mypage/withdraw')
  }

  const handleSubmit = async (data: MemberInfoFormData) => {
    try {
      const input = mapFormDataToInput(data)
      await updateProfile(input)

      setAlertModal({ isOpen: true, message: '회원정보가 수정되었습니다.' })
    } catch {
      setAlertModal({ isOpen: true, message: '회원정보 수정 중 오류가 발생했습니다.' })
    }
  }

  const handleAlertClose = () => {
    setAlertModal({ isOpen: false, message: '' })
    if (alertModal.message === '회원정보가 수정되었습니다.') {
      router.push('/mypage')
    }
  }

  if (loading) {
    return (
      <div className={styles.wrap}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>회원정보 수정</h1>
            <div className={styles.content}>
              <Skeleton width='100%' height={48} variant='rounded' />
              <Skeleton width='100%' height={48} variant='rounded' count={8} gap={16} />
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
          <h1 className={styles.pageTitle}>회원정보 수정</h1>

          <div className={styles.content}>
            <MemberInfoForm
              mode='edit'
              initialData={userData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText={updating ? '저장 중...' : '저장'}
              cancelButtonText='취소'
              disabledFields={['name', 'birthDate', 'memberType', 'phone', 'userId', 'licenseNumber', 'school', 'careNumber']}
              showWithdrawButton={true}
              onWithdraw={handleWithdraw}
            />
          </div>
        </div>
      </main>
      <Footer />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        onClose={handleAlertClose}
      />
    </div>
  )
}
