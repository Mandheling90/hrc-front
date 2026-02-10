'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { IPinIcon } from '@/components/icons/IPinIcon'
import styles from './VerificationCards.module.scss'

export interface VerificationCardsProps {
  /** 본인 인증 (휴대폰) 버튼 클릭 핸들러 */
  onPhoneVerify: () => void
  /** 아이핀 인증 버튼 클릭 핸들러 */
  onIpinVerify: () => void
  /** 아이디 입력 필드 표시 여부 (비밀번호 찾기용) */
  showIdInput?: boolean
  /** 아이디 값 */
  userId?: string
  /** 아이디 변경 핸들러 */
  onUserIdChange?: (value: string) => void
  /** 추가 클래스명 */
  className?: string
}

export const VerificationCards: React.FC<VerificationCardsProps> = ({
  onPhoneVerify,
  onIpinVerify,
  showIdInput = false,
  userId = '',
  onUserIdChange,
  className = ''
}) => {
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUserIdChange?.(e.target.value)
  }

  return (
    <div className={`${styles.verificationCards} ${className}`}>
      <div className={styles.verificationCard}>
        <div className={styles.cardIcon}>
          <PhoneIcon width={60} height={60} />
        </div>
        <div className={`${styles.cardContent} ${showIdInput ? styles.withInput : ''}`}>
          <div className={styles.cardTextGroup}>
            <h4 className={styles.cardTitle}>본인 인증</h4>
            <p className={styles.cardDescription}>본인명의 휴대폰, 공동인증서</p>
          </div>
          {showIdInput && (
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>아이디</label>
              <input
                type='text'
                className={styles.inputField}
                placeholder='아이디를 입력해주세요.'
                value={userId}
                onChange={handleIdChange}
              />
            </div>
          )}
          <Button type='button' variant='primary' size='large' onClick={onPhoneVerify} className={styles.verifyButton}>
            인증하기
          </Button>
        </div>
      </div>

      <div className={styles.verificationCard}>
        <div className={styles.cardIcon}>
          <IPinIcon width={60} height={60} />
        </div>
        <div className={`${styles.cardContent} ${showIdInput ? styles.withInput : ''}`}>
          <div className={styles.cardTextGroup}>
            <h4 className={styles.cardTitle}>아이핀(i-PIN) 인증</h4>
            <p className={styles.cardDescription}>아이핀 ID / PW</p>
          </div>
          {showIdInput && (
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>아이디</label>
              <input
                type='text'
                className={styles.inputField}
                placeholder='아이디를 입력해주세요.'
                value={userId}
                onChange={handleIdChange}
              />
            </div>
          )}
          <Button type='button' variant='outline' size='large' onClick={onIpinVerify} className={styles.verifyButton}>
            인증하기
          </Button>
        </div>
      </div>
    </div>
  )
}
