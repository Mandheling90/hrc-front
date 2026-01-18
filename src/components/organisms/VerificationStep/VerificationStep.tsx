'use client'

import { Button } from '@/components/atoms/Button/Button'
import { IPinIcon } from '@/components/icons/IPinIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { ShieldIcon } from '@/components/icons/ShieldIcon'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { NoticeList } from '@/components/molecules/NoticeList/NoticeList'
import React from 'react'
import styles from './VerificationStep.module.scss'

export interface VerificationStepProps {
  /** 휴대폰 인증 핸들러 */
  onPhoneVerification: () => void
  /** 아이핀 인증 핸들러 */
  onIpinVerification: () => void
  /** 이전 단계 핸들러 */
  onPrev: () => void
  /** 다음 단계 핸들러 */
  onNext: () => void
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  onPhoneVerification,
  onIpinVerification,
  onPrev,
  onNext
}) => {
  return (
    <>
      <InfoBox
        variant='guide'
        title='회원을 위한 본인 인증 안내'
        icon={<ShieldIcon width={110} height={110} />}
        messages={[
          '개인정보 보호법에 근거하여, 회원가입을 위해서는 본인인증이 필요합니다.',
          '본인확인은 아이핀(i-PIN)과 휴대폰 문자인증으로 확인합니다.'
        ]}
        showBullets={true}
        contentAlign='center'
        hideIconOnMobile={true}
        className={styles.verificationGuideBox}
      />

      <div className={styles.verificationCards}>
        <div className={styles.verificationCard}>
          <div className={styles.cardIcon}>
            <PhoneIcon width={60} height={60} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTextGroup}>
              <h4 className={styles.cardTitle}>본인 인증</h4>
              <p className={styles.cardDescription}>본인명의 휴대폰, 공동인증서</p>
            </div>
            <Button
              type='button'
              variant='primary'
              size='large'
              onClick={onPhoneVerification}
              className={styles.verifyButton}
            >
              인증하기
            </Button>
          </div>
        </div>

        <div className={styles.verificationCard}>
          <div className={styles.cardIcon}>
            <IPinIcon width={60} height={60} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTextGroup}>
              <h4 className={styles.cardTitle}>아이핀(i-PIN) 인증</h4>
              <p className={styles.cardDescription}>아이핀 ID / PW</p>
            </div>
            <Button
              type='button'
              variant='outline'
              size='large'
              onClick={onIpinVerification}
              className={styles.verifyButton}
            >
              인증하기
            </Button>
          </div>
        </div>
      </div>

      <NoticeList
        title='유의사항'
        icon={<InfoIcon width={24} height={24} fill='#828282' />}
        items={[
          {
            text: '본인인증 방법 선택 후 팝업창이 나타나지 않으면 브라우저의 팝업차단을 해제해 주시기 바랍니다.'
          },
          {
            paragraphs: [
              '아이핀(I-PIN) 인증 또는 휴대폰 인증시 장애가 있으신 경우는 나이스평가정보 실명확인 서비스 기관에 문의하시기 바랍니다.',
              '나이스평가정보 본인 인증 콜센터 : 1600-1522'
            ]
          }
        ]}
      />

      <div className={styles.buttonGroup}>
        <Button type='button' variant='gray' size='medium' onClick={onPrev}>
          이전
        </Button>
        <Button type='button' variant='primary' size='medium' onClick={onNext} disabled>
          다음 단계
        </Button>
      </div>
    </>
  )
}
