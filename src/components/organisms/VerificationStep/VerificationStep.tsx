'use client'

import { InfoIcon } from '@/components/icons/InfoIcon'
import { ShieldIcon } from '@/components/icons/ShieldIcon'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { NoticeList } from '@/components/molecules/NoticeList/NoticeList'
import { VerificationCards } from '@/components/molecules/VerificationCards'
import { useNiceVerification } from '@/hooks/useNiceVerification'
import type { NiceVerifiedData } from '@/lib/nice/types'
import React, { useEffect, useState } from 'react'
import styles from './VerificationStep.module.scss'

export interface VerificationStepProps {
  /** 본인인증 완료 콜백 */
  onVerified: (data: NiceVerifiedData) => void
  /** 이전 단계 핸들러 */
  onPrev: () => void
}

export const VerificationStep: React.FC<VerificationStepProps> = ({ onVerified }) => {
  const { requestVerification, isVerified, verifiedData, isLoading, error } = useNiceVerification()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // 인증 완료 시 부모에게 알림
  useEffect(() => {
    if (isVerified && verifiedData) {
      onVerified(verifiedData)
    }
  }, [isVerified, verifiedData, onVerified])

  // 에러 발생 시 AlertModal 표시
  useEffect(() => {
    if (error) {
      setAlertMessage(error)
      setShowAlert(true)
    }
  }, [error])

  return (
    <>
      <InfoBox
        variant='guide'
        title='회원을 위한 본인 인증 안내'
        icon={<ShieldIcon width={110} height={110} />}
        messages={[
          '개인정보 보호법에 근거하여, 회원가입을 위해서는 본인인증이 필요합니다.',
          '본인확인은 휴대폰 문자인증으로 확인합니다.'
        ]}
        showBullets={true}
        contentAlign='center'
        titleColor='black'
        className={styles.verificationGuideBox}
      />

      <VerificationCards
        onPhoneVerify={requestVerification}
        phoneVerified={isVerified}
        phoneLoading={isLoading}
        className={styles.verificationCardsWrapper}
      />

      <NoticeList
        title='유의사항'
        icon={<InfoIcon width={24} height={24} fill='var(--gray-10)' />}
        items={[
          {
            text: '본인인증 방법 선택 후 팝업창이 나타나지 않으면 브라우저의 팝업차단을 해제해 주시기 바랍니다.'
          },
          {
            paragraphs: [
              '휴대폰 인증시 장애가 있으신 경우는 나이스평가정보 실명확인 서비스 기관에 문의하시기 바랍니다.',
              '나이스평가정보 본인 인증 콜센터 : 1600-1522'
            ]
          }
        ]}
      />

      <AlertModal isOpen={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />
    </>
  )
}
