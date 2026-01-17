'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';
import styles from './SignupForm.module.scss';

export const SignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreements, setAgreements] = useState({
    termsOfUse: false,
    personalInfoRequired: false,
    personalInfoOptional1: false,
    personalInfoOptional2: false,
    allAgreements: false,
  });

  const handleAgreementChange = (key: keyof typeof agreements) => {
    return (checked: boolean) => {
      setAgreements((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };
  };

  const handleAllAgreementsChange = (checked: boolean) => {
    setAgreements({
      termsOfUse: checked,
      personalInfoRequired: checked,
      personalInfoOptional1: checked,
      personalInfoOptional2: checked,
      allAgreements: checked,
    });
  };

  const handleCancel = () => {
    // TODO: 취소 로직 구현
    console.log('Cancel signup');
  };

  const handleNext = () => {
    // TODO: 다음 단계로 이동
    console.log('Next step');
  };

  const steps = [
    { id: 1, label: '약관동의' },
    { id: 2, label: '본인 인증' },
    { id: 3, label: '회원정보 입력' },
    { id: 4, label: '회원가입 완료' },
  ];

  return (
    <div className={styles.signupForm}>
      <h1 className={styles.title}>회원가입</h1>

      <div className={styles.progressSteps}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.step} ${currentStep === step.id ? styles.active : ''}`}
          >
            <span className={styles.stepNumber}>Step.0{step.id}</span>
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.agreementsSection}>
        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.termsOfUse}
            onChange={handleAgreementChange('termsOfUse')}
            label="이용약관에 동의합니다. (필수사항)"
            className={styles.agreementCheckbox}
          />
          <div className={styles.agreementContent}>
            <h3 className={styles.subTitle}>1. 개인정보의 수집 목적 및 이용</h3>
            <p className={styles.contentText}>
              병원은 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
            </p>
            <div className={styles.radioGroup}>
              <span className={styles.radioLabel}>온라인 안내</span>
              <label className={styles.radio}>
                <input type="radio" name="terms1" value="service" defaultChecked />
                <span>① 서비스제공</span>
              </label>
            </div>
            <div className={styles.scrollableBox}>
              <div className={styles.scrollableContent}>
                <p>
                  여기에 약관 내용이 들어갑니다. 실제 약관 내용은 서비스 제공자에 의해 결정됩니다.
                  <br />
                  <br />
                  약관의 상세 내용은 다음과 같습니다:
                  <br />
                  - 서비스 이용에 관한 기본 사항
                  <br />
                  - 회원의 권리와 의무
                  <br />
                  - 서비스 제공 및 변경
                  <br />
                  - 개인정보 보호에 관한 사항
                  <br />
                  - 기타 서비스 이용에 필요한 사항
                  <br />
                  <br />
                  이 약관은 회원가입 시 동의함으로써 효력이 발생합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoRequired}
            onChange={handleAgreementChange('personalInfoRequired')}
            label="개인정보 수집 및 이용 목적에 동의합니다. (필수사항)"
            className={styles.agreementCheckbox}
          />
          <div className={styles.agreementContent}>
            <h3 className={styles.subTitle}>1. 개인정보의 수집 목적 및 이용</h3>
            <p className={styles.contentText}>
              병원은 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
            </p>
            <div className={styles.radioGroup}>
              <span className={styles.radioLabel}>온라인 안내</span>
              <label className={styles.radio}>
                <input type="radio" name="terms2" value="service" defaultChecked />
                <span>① 서비스제공</span>
              </label>
            </div>
            <div className={styles.scrollableBox}>
              <div className={styles.scrollableContent}>
                <p>
                  개인정보 수집 및 이용에 관한 약관 내용이 들어갑니다.
                  <br />
                  <br />
                  수집하는 개인정보 항목:
                  <br />
                  - 이름, 연락처, 이메일 등 기본 정보
                  <br />
                  - 서비스 이용 기록
                  <br />
                  - 기타 서비스 제공에 필요한 정보
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional1}
            onChange={handleAgreementChange('personalInfoOptional1')}
            label="개인정보 수집 및 이용 목적에 동의합니다. (선택사항)"
            className={styles.agreementCheckbox}
          />
          <div className={styles.agreementContent}>
            <h3 className={styles.subTitle}>1. 개인정보의 수집 목적 및 이용</h3>
            <p className={styles.contentText}>
              병원은 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
            </p>
            <div className={styles.radioGroup}>
              <span className={styles.radioLabel}>온라인 안내</span>
              <label className={styles.radio}>
                <input type="radio" name="terms3" value="service" defaultChecked />
                <span>① 서비스제공</span>
              </label>
            </div>
            <div className={styles.scrollableBox}>
              <div className={styles.scrollableContent}>
                <p>선택사항 개인정보 수집 및 이용 약관 내용입니다.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.personalInfoOptional2}
            onChange={handleAgreementChange('personalInfoOptional2')}
            label="개인정보 수집 및 이용 목적에 동의합니다. (선택사항)"
            className={styles.agreementCheckbox}
          />
          <div className={styles.agreementContent}>
            <p className={styles.contentText}>
              수집하는 개인정보의 마케팅 및 광고 활용의 이용목적에 동의합니다.
            </p>
          </div>
        </div>

        <div className={styles.agreementItem}>
          <Checkbox
            checked={agreements.allAgreements}
            onChange={handleAllAgreementsChange}
            label="서비스 전체 약관에 동의합니다."
            className={styles.agreementCheckbox}
          />
        </div>
      </div>

      <div className={styles.warningBox}>
        <div className={styles.warningIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.warningContent}>
          <h4 className={styles.warningTitle}>비동의 시 제한사항</h4>
          <p className={styles.warningText}>
            귀하는 위 항목에 대하여 동의를 거부할 수 있으며 동의 후에도 언제든지 철회 가능합니다. 다만, 수집하는 개인정보는 원활한 서비스 제공을 위해 필요한 최소한의 기본정보로서, 동의를 거부하실 경우에는 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.
          </p>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
        <button
          type="button"
          className={styles.nextButton}
          onClick={handleNext}
          disabled={!agreements.termsOfUse || !agreements.personalInfoRequired}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
};
