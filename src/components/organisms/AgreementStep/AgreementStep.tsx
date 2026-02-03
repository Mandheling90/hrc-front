'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { AgreementContent } from '@/components/molecules/AgreementContent/AgreementContent'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import React from 'react'
import styles from './AgreementStep.module.scss'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import {
  TermsOfUseContent,
  PersonalInfoRequiredContent,
  PersonalInfoOptionalContent,
  ThirdPartyInfoContent
} from './contents'

export interface AgreementStepProps {
  /** 동의 상태 객체 */
  agreements: {
    termsOfUse: boolean
    personalInfoRequired: boolean
    personalInfoOptional1: boolean
    personalInfoOptional2: boolean
    marketingAgreement: boolean
    allAgreements: boolean
  }
  /** 개별 동의 변경 핸들러 */
  onAgreementChange: (key: keyof AgreementStepProps['agreements']) => (checked: boolean) => void
  /** 전체 동의 변경 핸들러 */
  onAllAgreementsChange: (checked: boolean) => void
  /** 취소 핸들러 */
  onCancel: () => void
  /** 다음 단계 핸들러 */
  onNext: () => void
}

export const AgreementStep: React.FC<AgreementStepProps> = ({
  agreements,
  onAgreementChange,
  onAllAgreementsChange,
  onCancel,
  onNext
}) => {
  return (
    <>
      <div className={styles.agreementsSection}>
        {/* 이용약관 동의 */}
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.termsOfUse}
            onChange={onAgreementChange('termsOfUse')}
            label={
              <>
                이용약관에 동의합니다. <span className={styles.highlightText}>(필수사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
            alwaysDark
          />
          <AgreementContent scrollableContent={<TermsOfUseContent />} wrapAllInScrollBox={true} />
        </div>

        {/* 개인정보 수집 및 이용 목적 (필수) */}
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoRequired}
            onChange={onAgreementChange('personalInfoRequired')}
            label={
              <>
                개인정보 수집 및 이용 목적에 동의합니다. <span className={styles.highlightText}>(필수사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
            alwaysDark
          />
          <AgreementContent scrollableContent={<PersonalInfoRequiredContent />} wrapAllInScrollBox={true} />
        </div>

        {/* 개인정보 수집 및 이용 목적 (선택) */}
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional1}
            onChange={onAgreementChange('personalInfoOptional1')}
            label={
              <>
                수집하는 개인정보 및 마케팅 광고 활용에 동의합니다.{' '}
                <span className={styles.optionalText}>(선택사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
            alwaysDark
          />
          <AgreementContent scrollableContent={<PersonalInfoOptionalContent />} wrapAllInScrollBox={true} />
        </div>

        {/* 제3자 정보제공 동의 */}
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional2}
            onChange={onAgreementChange('personalInfoOptional2')}
            label={
              <>
                제3자 정보 제공에 동의합니다. <span className={styles.highlightText}>(필수사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
            alwaysDark
          />
          <AgreementContent scrollableContent={<ThirdPartyInfoContent />} wrapAllInScrollBox={true} />
        </div>

        {/* 마케팅 광고 활용 동의 */}
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.marketingAgreement}
            onChange={onAgreementChange('marketingAgreement')}
            label={
              <>
                수집하는 개인정보 및 마케팅 광고활용 <span className={styles.optionalText}>(선택사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
            alwaysDark
          />
          <div className={styles.simpleAgreementBox}>
            <p>수집하는 개인정보의 마케팅 및 광고 활용의 이용목적에 동의합니다.</p>
          </div>
        </div>

        {/* 전체 동의 */}
        <div className={`${styles.agreementItem} ${styles.allAgreementsItem}`}>
          <Checkbox
            checked={agreements.allAgreements}
            onChange={onAllAgreementsChange}
            label={
              <>
                <span className={styles.allAgreementsText}>서비스 전체 약관에 동의합니다.</span>
              </>
            }
            className={`${styles.agreementCheckbox} ${styles.allAgreementsCheckbox}`}
            alwaysDark
          />
        </div>
      </div>

      <div className={styles.warningSection}>
        <SectionTitle title='비동의 시 제한사항' className={styles.sectionTitle} />
        <InfoBox
          messages={[
            '귀하는 위 항목에 대하여 동의를 거부할 수 있으며, 동의 후에도 언제든지 철회 가능합니다. 다만, 수집하는 개인정보는 원활한 서비스 제공을 위해 필요한 최소한의 기본정보로서, 동의를 거부하실 경우에는 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.'
          ]}
          contentAlign='left'
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button variant='outline' size='large' onClick={onCancel}>
          이전 단계
        </Button>
        <Button variant='primary' size='large' onClick={onNext}>
          다음 단계
        </Button>
      </div>
    </>
  )
}
