import React from 'react'
import styles from '../AgreementStep.module.scss'

export const PersonalInfoOptionalContent: React.FC = () => {
  return (
    <div className={styles.privacySection}>
      {/* 1. 개인정보 수집 및 이용 목적 */}
      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>1. 개인정보 수집 및 이용 목적</p>
        <div className={styles.privacySectionContent}>
          <p>회송 시 환자의 질환에 의료진 선정</p>
        </div>
      </div>

      {/* 2. 수집하려는 개인정보의 항목 */}
      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>2. 수집하려는 개인정보의 항목</p>
        <div className={styles.privacySectionContent}>
          <p>- 선택 항목 : 병원홈페이지, FAX, 병상수, 세부전공, 수련병원</p>
          <p className={styles.captionText}>
            *서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수
            있습니다. (서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보)
          </p>
        </div>
      </div>

      {/* 3. 개인정보의 보유 이용기간 */}
      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>3. 개인정보의 보유 이용기간</p>
        <div className={styles.privacySectionContent}>
          <p>
            홈페이지 회원가입 탈퇴시까지 혹은 회원에서 제명 처리된 일까지 (즉시 파기 처리함) 단, 진료서비스 제공을
            위하여 수집된 경우 의료법 기준에 준함 (의료법 시행규칙 제15조에 명시된 기간)
          </p>
        </div>
      </div>

      {/* 4. 동의를 거부할 권리 / 동의거부에 따른 안내 */}
      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>4. 동의를 거부할 권리 / 동의거부에 따른 안내</p>
        <div className={styles.privacySectionContent}>
          <p>
            고객께서는 본 안내에 따른 개인정보 수집에 대하여, 거부할 수 있는 권리가 있습니다. 본 개인정보에 대해 거부할
            경우 회원에게 제공되는 서비스 이용에 제한될 수 있음을 알려드립니다.
          </p>
        </div>
      </div>
    </div>
  )
}
