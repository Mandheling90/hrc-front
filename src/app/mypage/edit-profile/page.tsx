'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { MemberInfoForm, MemberInfoFormData } from '@/components/organisms/MemberInfoForm/MemberInfoForm'
import styles from './page.module.scss'

// 더미 데이터 - 실제로는 API에서 가져와야 함
const mockUserData: Partial<MemberInfoFormData> = {
  name: '홍길동',
  birthDate: '1999-08-16',
  memberType: '의사',
  phone: '010-0000-0000',
  userId: 'ID1234TEST',
  password: '****************',
  passwordConfirm: '****************',
  email: 'asdtest@naver.com',
  licenseNumber: '12345678',
  isDirector: true,
  school: '서울성모병원',
  department: '소화기내과',
  specialty: '위 내시경, OOOOOOO, OOOO',
  smsConsent: '동의',
  emailConsent: '동의',
  replyConsent: '동의',
  hospitalName: '고대진료협력병원',
  careNumber: '1234567890',
  zipCode: '02841',
  address: '서울특별시 성북구 고려대로 73(안암동 5가)',
  addressDetail: '404호',
  hospitalPhone: '021234567',
  hospitalWebsite: 'https://anam.kumc.or.kr/'
}

const breadcrumbItems = [{ label: '마이페이지', href: '/mypage' }, { label: '회원정보 수정' }]

export default function EditProfilePage() {
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  const handleWithdraw = () => {
    router.push('/mypage/withdraw')
  }

  const handleSubmit = (data: MemberInfoFormData) => {
    // TODO: API 호출하여 회원정보 저장
    console.log('저장할 데이터:', data)
    // 저장 완료 후 마이페이지로 이동
    // router.push('/mypage')
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>회원정보 수정</h1>

          <div className={styles.content}>
            <MemberInfoForm
              mode='edit'
              initialData={mockUserData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText='저장'
              cancelButtonText='취소'
              disabledFields={['userId', 'careNumber']}
              showWithdrawButton={true}
              onWithdraw={handleWithdraw}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
