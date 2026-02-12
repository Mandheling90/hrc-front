'use client'

import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { MemberInfoForm, MemberInfoFormData } from '@/components/organisms/MemberInfoForm/MemberInfoForm'
import React from 'react'
import styles from './MemberInfoStep.module.scss'

export interface MemberInfoStepProps {
  /** 회원가입 API 호출 핸들러 */
  onSignup: (data: MemberInfoFormData) => Promise<void>
  /** 이전 단계 핸들러 */
  onPrev: () => void
  /** 취소 핸들러 */
  onCancel: () => void
  /** API 로딩 상태 */
  signupLoading?: boolean
  /** 초기 데이터 (본인 인증에서 넘어온 데이터) */
  initialData?: Partial<MemberInfoFormData>
}

export const MemberInfoStep: React.FC<MemberInfoStepProps> = ({
  onSignup,
  onPrev,
  onCancel,
  signupLoading,
  initialData
}) => {
  // 본인 인증에서 넘어온 기본 데이터 (예시)
  const defaultInitialData: Partial<MemberInfoFormData> = {
    name: '홍길동',
    birthDate: '1990-01-01',
    phone: '010-1234-5678',
    ...initialData
  }

  const handleSubmit = async (data: MemberInfoFormData) => {
    await onSignup(data)
  }

  return (
    <>
      <InfoBox
        variant='guide'
        title='회원 개인정보 입력 안내'
        messages={[
          '회원 개인정보는 필수 항목과 선택 항목으로 구분되며, 필수 입력 항목은 전부 입력하셔야 합니다.',
          '회원 개인정보는 안전하게 보호됩니다.'
        ]}
        showBullets={true}
        className={styles.infoGuideBox}
        textColor='black'
      />

      <MemberInfoForm
        mode='signup'
        initialData={defaultInitialData}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        onPrev={onPrev}
        submitButtonText={signupLoading ? '처리 중...' : '다음 단계'}
        cancelButtonText='취소'
        disabledFields={['name', 'birthDate', 'phone']}
      />
    </>
  )
}
