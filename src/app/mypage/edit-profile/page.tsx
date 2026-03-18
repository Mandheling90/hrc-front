'use client'

import React, { useMemo, useState } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useMyProfile, useUpdateProfile } from '@/hooks/useAuth'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { MemberInfoForm, MemberInfoFormData } from '@/components/organisms/MemberInfoForm/MemberInfoForm'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { AuthUser } from '@/types/auth'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { UpdateDoctorProfileInput } from '@/hooks/useAuth'
import styles from './page.module.scss'

/** API에서 받은 사용자 정보를 폼 데이터 형식으로 변환 */
const mapUserToFormData = (user: AuthUser): Partial<MemberInfoFormData> => {
  const profile = user.profile

  const memberTypeMap: Record<string, string> = {
    DOCTOR: '의사',
    DENTIST: '치과의사',
    ORIENTAL_DOCTOR: '한의사',
    '1': '의사',
    '2': '치과의사',
    '3': '한의사'
  }

  const doctorType = profile?.doctorType || user.userType

  return {
    name: user.userName || '',
    birthDate: profile?.birthDate ? profile.birthDate.split('T')[0] : '',
    memberType: memberTypeMap[doctorType] || '의사',
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
    smsConsent: profile?.smsConsent ? 'Y' : 'N',
    emailConsent: profile?.emailConsent ? 'Y' : 'N',
    replyConsent: profile?.replyConsent ? 'Y' : 'N',
    hospitalName: profile?.hospName || '',
    careNumber: profile?.careInstitutionNo || '',
    zipCode: profile?.hospZipCode || '',
    address: profile?.hospAddress || '',
    addressDetail: profile?.hospAddressDetail || '',
    hospitalPhone: profile?.hospPhone || '',
    hospitalWebsite: profile?.hospWebsite || ''
  }
}

/** 폼 데이터를 API 입력 형식으로 변환 */
const mapFormDataToInput = (data: MemberInfoFormData): UpdateDoctorProfileInput => {
  const doctorTypeMap: Record<string, string> = {
    '의사': '1',
    '치과의사': '2',
    '한의사': '3'
  }

  const input: UpdateDoctorProfileInput = {
    userName: data.name,
    email: data.email,
    phone: data.phone,
    doctorType: doctorTypeMap[data.memberType] || '1',
    licenseNo: data.licenseNumber,
    isDirector: data.isDirector,
    school: data.school,
    department: data.department,
    specialty: data.specialty,
    smsConsent: data.smsConsent === 'Y',
    emailConsent: data.emailConsent === 'Y',
    replyConsent: data.replyConsent === 'Y',
    hospName: data.hospitalName,
    careInstitutionNo: data.careNumber,
    hospZipCode: data.zipCode,
    hospAddress: data.address,
    hospAddressDetail: data.addressDetail,
    hospPhone: data.hospitalPhone,
    hospWebsite: data.hospitalWebsite
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
  const { user, loading } = useMyProfile()
  const { updateProfile, loading: updating } = useUpdateProfile()
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })

  const userData = useMemo(() => {
    if (!user) return undefined
    return mapUserToFormData(user)
  }, [user])

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
