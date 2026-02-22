'use client'

import { CheckIcon } from '@/components/icons/CheckIcon'
import { ConfirmButtons } from '@/components/molecules/ConfirmButtons/ConfirmButtons'
import React from 'react'
import styles from './CompleteStep.module.scss'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'

export interface CompleteStepProps {
  /** 사용자 아이디 */
  userId?: string
  /** 사용자 이메일 */
  email?: string
  /** 완료 제목 */
  title?: string
  /** 완료 설명 */
  description?: string
  /** 버튼 텍스트 */
  buttonText?: string
  /** 메인으로 이동 핸들러 */
  onGoToMain?: () => void
}

export const CompleteStep: React.FC<CompleteStepProps> = ({
  userId = '',
  email = '',
  title = '회원가입 신청이 완료되었습니다.',
  description = '담당자 확인 후 승인 절차가 진행되며, 승인 완료 시 회원가입이 최종 완료됩니다.\n승인 결과는 등록하신 이메일로 안내드릴 예정입니다.',
  buttonText = '메인으로 이동',
  onGoToMain
}) => {
  const router = useHospitalRouter()

  const handleGoToMain = () => {
    if (onGoToMain) {
      onGoToMain()
    } else {
      router.push('/')
    }
  }

  return (
    <div className={styles.completeStep}>
      {/* 콘텐츠 영역 (completeBox + infoSection) */}
      <div className={styles.contentWrapper}>
        {/* 완료 메시지 박스 */}
        <div className={styles.completeBox}>
          <div className={styles.iconWrapper}>
            <CheckIcon width={64} height={43} stroke='#816331' strokeWidth={8} />
          </div>
          <div className={styles.textWrapper}>
            <h2 className={styles.completeTitle}>{title}</h2>
            <div className={styles.completeDescription}>
              {description.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 사용자 정보 표시 */}
        <div className={styles.infoSection}>
          <div className={styles.infoField}>
            <span className={styles.infoLabel}>아이디</span>
            <div className={styles.infoDivider}></div>
            <span className={styles.infoValue}>{userId}</span>
          </div>
          <div className={styles.infoField}>
            <span className={styles.infoLabel}>이메일</span>
            <div className={styles.infoDivider}></div>
            <span className={styles.infoValue}>{email}</span>
          </div>
        </div>
      </div>

      {/* 메인으로 이동 버튼 */}
      <ConfirmButtons
        primaryButton={{
          label: buttonText,
          onClick: handleGoToMain,
          variant: 'outline'
        }}
        noMargin
      />
    </div>
  )
}
