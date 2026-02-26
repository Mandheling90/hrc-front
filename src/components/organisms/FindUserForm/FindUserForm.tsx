'use client'

import { useSearchParams, usePathname } from 'next/navigation'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useMutation } from '@apollo/client/react'
import React, { useState, useEffect, useRef } from 'react'
import styles from './FindUserForm.module.scss'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { VerificationCards } from '@/components/molecules/VerificationCards'
import { Button } from '@/components/atoms/Button/Button'
import { useNiceVerification } from '@/hooks/useNiceVerification'
import { FIND_USER_ID_BY_VERIFICATION_MUTATION } from '@/graphql/verification/mutations'

type TabType = 'findId' | 'findPassword'

export const FindUserForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useHospitalRouter()
  const pathname = usePathname()
  const tabParam = searchParams.get('tab') as TabType | null
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === 'findPassword' ? 'findPassword' : 'findId')
  const [userId, setUserId] = useState('')

  // 아이디 찾기 결과
  const [foundUserId, setFoundUserId] = useState<string | null>(null)
  const [findError, setFindError] = useState<string | null>(null)

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

  useEffect(() => {
    if (tabParam === 'findPassword') {
      setActiveTab('findPassword')
    } else {
      setActiveTab('findId')
    }
  }, [tabParam])

  // 본인인증 완료 후 중복 실행 방지
  const verificationProcessedRef = useRef(false)

  useEffect(() => {
    if (!isVerified || !verifiedData?.verificationToken) return
    if (verificationProcessedRef.current) return
    verificationProcessedRef.current = true

    const processVerification = async () => {
      if (activeTab === 'findId') {
        // 아이디 찾기: findUserIdByVerification 호출
        try {
          const { data } = await findUserIdByVerification({
            variables: {
              input: { verificationToken: verifiedData.verificationToken }
            }
          })
          if (data?.findUserIdByVerification?.maskedUserId) {
            setFoundUserId(data.findUserIdByVerification.maskedUserId)
            setFindError(null)
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : '아이디 찾기에 실패했습니다.'
          setFindError(message)
        }
      } else if (activeTab === 'findPassword') {
        // 비밀번호 찾기: reset-password 페이지로 이동
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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setUserId('')
    setFoundUserId(null)
    setFindError(null)
    verificationProcessedRef.current = false
    resetVerification()
    router.push(`${pathname}?tab=${tab}`)
  }

  const handlePhoneVerify = () => {
    if (activeTab === 'findPassword' && !userId.trim()) {
      setFindError('아이디를 먼저 입력해주세요.')
      return
    }
    setFindError(null)
    requestVerification()
  }

  const handleGoLogin = () => {
    router.push('/login')
  }

  const handleRetry = () => {
    setFoundUserId(null)
    setFindError(null)
    verificationProcessedRef.current = false
    resetVerification()
  }

  const errorMessage = findError || verificationError

  // 아이디 찾기 결과 화면
  if (activeTab === 'findId' && foundUserId) {
    return (
      <div className={styles.findForm}>
        <h2 className={styles.title}>아이디 찾기</h2>
        <div className={styles.resultContainer}>
          <div className={styles.resultBox}>
            <p className={styles.resultLabel}>회원님의 아이디는</p>
            <p className={styles.resultUserId}>{foundUserId}</p>
            <p className={styles.resultLabel}>입니다.</p>
          </div>
          <div className={styles.resultButtons}>
            <Button
              type='button'
              variant='outline'
              size='medium'
              onClick={handleRetry}
              className={styles.resultButton}
            >
              다시 찾기
            </Button>
            <Button
              type='button'
              variant='primary'
              size='medium'
              onClick={handleGoLogin}
              className={styles.resultButton}
            >
              로그인
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.findForm}>
      <h2 className={styles.title}>{activeTab === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</h2>

      <div className={styles.tabContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.tabs}>
            <button
              type='button'
              className={`${styles.tab} ${activeTab === 'findId' ? styles.active : ''}`}
              onClick={() => handleTabChange('findId')}
            >
              아이디 찾기
            </button>
            <button
              type='button'
              className={`${styles.tab} ${activeTab === 'findPassword' ? styles.active : ''}`}
              onClick={() => handleTabChange('findPassword')}
            >
              비밀번호 찾기
            </button>
          </div>

          {activeTab === 'findId' && (
            <InfoBox
              contentAlign='center'
              messages={[
                'NICE 본인인증을 통해 가입된 아이디를 확인합니다.',
                '본인인증 완료 시 자동으로 아이디를 조회합니다.'
              ]}
              textColor='black'
            />
          )}

          {activeTab === 'findPassword' && (
            <InfoBox
              contentAlign='center'
              messages={[
                '아이디를 입력하고 본인인증을 완료하면',
                '비밀번호를 재설정할 수 있습니다.'
              ]}
              textColor='black'
            />
          )}

          {errorMessage && (
            <div className={styles.errorMessage}>
              <p>{errorMessage}</p>
            </div>
          )}

          <VerificationCards
            onPhoneVerify={handlePhoneVerify}
            phoneVerified={isVerified}
            phoneLoading={verificationLoading || findLoading}
            showIdInput={activeTab === 'findPassword'}
            userId={userId}
            onUserIdChange={setUserId}
          />
        </div>
      </div>
    </div>
  )
}
