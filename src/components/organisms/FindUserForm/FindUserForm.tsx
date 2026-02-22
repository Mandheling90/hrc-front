'use client'

import { useSearchParams, usePathname } from 'next/navigation'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import React, { useState, useEffect } from 'react'
import styles from './FindUserForm.module.scss'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { VerificationCards } from '@/components/molecules/VerificationCards'

type TabType = 'findId' | 'findPassword'

export const FindUserForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useHospitalRouter()
  const pathname = usePathname()
  const tabParam = searchParams.get('tab') as TabType | null
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === 'findPassword' ? 'findPassword' : 'findId')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (tabParam === 'findPassword') {
      setActiveTab('findPassword')
    } else {
      setActiveTab('findId')
    }
  }, [tabParam])

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setUserId('')
    router.push(`${pathname}?tab=${tab}`)
  }

  const handlePhoneVerify = () => {
    // TODO: 본인 인증 로직 구현 (PASS 등)
    console.log('본인 인증 시작', activeTab === 'findPassword' ? `아이디: ${userId}` : '')
  }

  const handleIpinVerify = () => {
    // TODO: 아이핀 인증 로직 구현
    console.log('아이핀 인증 시작', activeTab === 'findPassword' ? `아이디: ${userId}` : '')
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
              messages={
                activeTab === 'findId'
                  ? [
                      '회원 가입 시와 동일하게 본인 인증 후 아이디를 찾아주세요.',
                      '휴대전화 본인 인증이나 아이핀 인증으로 아이디를 찾을 수 있습니다.'
                    ]
                  : [
                      '회원 가입 시와 동일하게 본인 인증 후 비밀번호를 재설정해주세요.',
                      '휴대전화 본인 인증이나 아이핀 인증으로 비밀번호를 찾을 수 있습니다.'
                    ]
              }
              textColor='black'
            />
          )}

          <VerificationCards
            onPhoneVerify={handlePhoneVerify}
            onIpinVerify={handleIpinVerify}
            showIdInput={activeTab === 'findPassword'}
            userId={userId}
            onUserIdChange={setUserId}
          />
        </div>
      </div>
    </div>
  )
}
