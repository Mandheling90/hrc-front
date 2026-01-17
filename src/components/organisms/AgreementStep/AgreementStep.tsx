'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { AgreementContent } from '@/components/molecules/AgreementContent/AgreementContent'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import React from 'react'
import styles from './AgreementStep.module.scss'

export interface AgreementStepProps {
  /** 동의 상태 객체 */
  agreements: {
    termsOfUse: boolean
    personalInfoRequired: boolean
    personalInfoOptional1: boolean
    personalInfoOptional2: boolean
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
          />

          <AgreementContent
            scrollableContent={
              <>
                <p className={styles.agreementTitle}>1. 개인 정보의 수집 목적 및 이용</p>
                <div className={styles.agreementText}>
                  <p>
                    "병원"은 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                    <br />
                    이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며 이용 목적이 변경될
                    시에는 사전 동의를 구할 것입니다.
                  </p>
                  <p>&nbsp;</p>
                  <p>온라인 안내</p>
                  <ul>
                    <li>① 서비스제공</li>
                    <li>
                      진료 및 건진 예약, 예약조회 및 회원제 서비스 이용에 따른 본인 확인 절차에 이용 고지사항 전달,
                      불만처리 등을 위한 원활한 의사소통 경로의 확보, 새로운 서비스 및 행사정보 등의 안내
                    </li>
                    <li>② 회원관리</li>
                    <li>③ 신규 서비스 개발과 개인 맞춤 서비스 제공을 위한 자료</li>
                  </ul>
                </div>
              </>
            }
            wrapAllInScrollBox={true}
          />
        </div>

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
          />
          <AgreementContent
            scrollableContent={
              <p>
                개인정보 수집 및 이용에 관한 약관 내용이 들어갑니다.
                <br />
                <br />
                수집하는 개인정보 항목:
                <br />
                - 이름, 연락처, 이메일 등 기본 정보
                <br />
                - 서비스 이용 기록
                <br />- 기타 서비스 제공에 필요한 정보
              </p>
            }
          />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional1}
            onChange={onAgreementChange('personalInfoOptional1')}
            label={
              <>
                개인정보 수집 및 이용 목적에 동의합니다. <span className={styles.highlightText}>(선택사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
          />
          <AgreementContent scrollableContent={<p>선택사항 개인정보 수집 및 이용 약관 내용입니다.</p>} />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional2}
            onChange={onAgreementChange('personalInfoOptional2')}
            label={
              <>
                개인정보 수집 및 이용 목적에 동의합니다. <span className={styles.highlightText}>(선택사항)</span>
              </>
            }
            className={styles.agreementCheckbox}
          />
          <AgreementContent scrollableContent={<p>선택사항 개인정보 수집 및 이용 약관 내용입니다.</p>} />
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.allAgreements}
            onChange={onAllAgreementsChange}
            label='서비스 전체 약관에 동의합니다.'
            className={styles.agreementCheckbox}
          />
        </div>
      </div>

      <div className={styles.warningSection}>
        <InfoBox
          variant='warning'
          title='비동의 시 제한사항'
          icon={
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
                fill='currentColor'
              />
            </svg>
          }
          messages={[
            '귀하는 위 항목에 대하여 동의를 거부할 수 있으며, 동의 후에도 언제든지 철회 가능합니다.',
            '다만, 수집하는 개인정보는 원활한 서비스 제공을 위해 필요한 최소한의 기본정보로서, 동의를 거부하실 경우에는 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.'
          ]}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button type='button' variant='gray' size='medium' onClick={onCancel}>
          취소
        </Button>
        <Button type='button' variant='primary' size='medium' onClick={onNext}>
          다음 단계
        </Button>
      </div>
    </>
  )
}
