'use client'

import { useSearchParams } from 'next/navigation'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useMutation } from '@apollo/client/react'
import React, { useState, useEffect, useRef } from 'react'
import styles from './FindUserForm.module.scss'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { Button } from '@/components/atoms/Button/Button'
import { FaceIdIcon } from '@/components/icons/FaceIdIcon'
import { PasswordIcon } from '@/components/icons/PasswordIcon'
import { useNiceVerification } from '@/hooks/useNiceVerification'
import { FIND_USER_ID_BY_VERIFICATION_MUTATION } from '@/graphql/verification/mutations'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'

type VerifyTarget = 'findId' | 'findPassword'

export const FindUserForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useHospitalRouter()
  const [userId, setUserId] = useState('')

  // 아이디 찾기 완료 팝업
  const [showIdSentModal, setShowIdSentModal] = useState(false)
  const [findError, setFindError] = useState<string | null>(null)

  // 어떤 카드에서 인증을 요청했는지 추적
  const verifyTargetRef = useRef<VerifyTarget>('findId')

  const {
    requestVerification,
    isVerified,
    verifiedData,
    isLoading: verificationLoading,
    error: verificationError,
    reset: resetVerification
  } = useNiceVerification()

  const [findUserIdByVerification, { loading: findLoading }] = useMutation<{
    findUserIdByVerification: { maskedUserId: string }
  }>(FIND_USER_ID_BY_VERIFICATION_MUTATION)

  // 본인인증 완료 후 중복 실행 방지
  const verificationProcessedRef = useRef(false)

  useEffect(() => {
    if (!isVerified || !verifiedData?.verificationToken) return
    if (verificationProcessedRef.current) return
    verificationProcessedRef.current = true

    const processVerification = async () => {
      if (verifyTargetRef.current === 'findId') {
        try {
          await findUserIdByVerification({
            variables: {
              input: { verificationToken: verifiedData.verificationToken }
            }
          })
          setShowIdSentModal(true)
          setFindError(null)
        } catch (err) {
          const message = err instanceof Error ? err.message : '아이디 찾기에 실패했습니다.'
          setFindError(message)
        }
      } else if (verifyTargetRef.current === 'findPassword') {
        if (!userId.trim()) {
          setFindError('아이디를 입력해주세요.')
          verificationProcessedRef.current = false
          return
        }
        const params = new URLSearchParams({
          userId: userId.trim(),
          verificationToken: verifiedData.verificationToken!
        })
        router.push(`/reset-password?${params.toString()}`)
      }
    }

    processVerification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified, verifiedData])

  const handleFindIdVerify = () => {
    setFindError(null)
    verifyTargetRef.current = 'findId'
    verificationProcessedRef.current = false
    resetVerification()
    requestVerification()
  }

  const handleFindPasswordVerify = () => {
    if (!userId.trim()) {
      setFindError('아이디를 먼저 입력해주세요.')
      return
    }
    setFindError(null)
    verifyTargetRef.current = 'findPassword'
    verificationProcessedRef.current = false
    resetVerification()
    requestVerification()
  }

  const handleIdSentModalClose = () => {
    setShowIdSentModal(false)
    verificationProcessedRef.current = false
    resetVerification()
  }

  const errorMessage = findError || verificationError

  return (
    <div className={styles.findForm}>
      <h2 className={styles.title}>아이디/비밀번호 찾기</h2>

      <div className={styles.contentWrapper}>
        <InfoBox
          contentAlign='center'
          messages={[
            '회원 가입 시와 동일하게 본인 인증 후 아이디/비밀번호를 찾아주세요.',
            '휴대전화 본인 인증이나 아이핀 인증으로 아이디/비밀번호를 찾을 수 있습니다.'
          ]}
          textColor='black'
        />

        {errorMessage && (
          <div className={styles.errorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}

        <div className={styles.cardsRow}>
          {/* 아이디 찾기 카드 */}
          <div className={styles.cardPrimary}>
            <div className={styles.cardIcon}>
              <FaceIdIcon width={60} height={60} />
            </div>
            <div className={styles.cardBodyPrimary}>
              <div className={styles.cardTextGroup}>
                <h4 className={styles.cardTitle}>아이디 찾기</h4>
                <p className={styles.cardDescription}>본인 명의 휴대폰, 아이핀 인증</p>
              </div>
              <Button
                type='button'
                variant='outline'
                size='large'
                onClick={handleFindIdVerify}
                disabled={verificationLoading || findLoading}
                className={styles.cardButton}
              >
                {verificationLoading && verifyTargetRef.current === 'findId' ? '인증 중...' : '인증하기'}
              </Button>
            </div>
          </div>

          {/* 비밀번호 찾기 카드 */}
          <div className={styles.cardSecondary}>
            <div className={styles.cardIcon}>
              <PasswordIcon width={60} height={60} />
            </div>
            <div className={styles.cardBodySecondary}>
              <div className={styles.cardTextGroup}>
                <h4 className={styles.cardTitle}>비밀번호 찾기</h4>
                <p className={styles.cardDescription}>본인 명의 휴대폰, 아이핀 인증</p>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>아이디</label>
                <input
                  type='text'
                  className={styles.inputField}
                  placeholder='아이디를 입력해주세요.'
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <Button
                type='button'
                variant='outline'
                size='large'
                onClick={handleFindPasswordVerify}
                disabled={verificationLoading || findLoading}
                className={styles.cardButton}
              >
                {verificationLoading && verifyTargetRef.current === 'findPassword' ? '인증 중...' : '인증하기'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={showIdSentModal}
        message='인증하신 번호로 가입한 아이디를 발송했습니다.'
        closeButtonText='확인'
        onClose={handleIdSentModalClose}
      />
    </div>
  )
}
