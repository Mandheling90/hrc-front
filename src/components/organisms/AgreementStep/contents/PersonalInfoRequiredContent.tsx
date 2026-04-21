import React from 'react'
import { useHospital } from '@/contexts/HospitalContext'
import styles from '../AgreementStep.module.scss'

export const PersonalInfoRequiredContent: React.FC = () => {
  const { isAnam, isGuro, isAnsan, hospital } = useHospital()

  if (isAnam || isGuro || isAnsan) {
    return <ReferralCenterPersonalInfoRequiredContent hospitalName={hospital.name.hospital} />
  }

  return (
    <>
      <div className={styles.agreementSection}>
        <p className={styles.agreementSubTitle}>1. 개인 정보의 수집 목적 및 이용</p>
        <p>
          {`"병원"은 수집한 개인정보를 다음의 목적을 위해 활용합니다.`}
          <br />
          이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며 이용 목적이 변경될 시에는 사전
          동의를 구할 것입니다.
        </p>
      </div>
      <div className={styles.agreementSection}>
        <div className={styles.agreementIndent}>
          <p className={styles.agreementSubTitle}>온라인 안내</p>
          <p>① 서비스제공</p>
          <p>
            홈페이지 내 서비스 이용에 따른 본인 확인 절차에 이용 고지사항 전달, 불만처리 등을 위한 원활한 의사소통
            경로의 확보, 새로운 서비스 및 행사정보 등의 안내
          </p>
          <p>② 회원관리</p>
          <p>③ 신규 서비스 개발과 개인 맞춤 서비스 제공을 위한 자료</p>
          <p>④ 건강 컨텐츠 및 임상연구정보 제공</p>
          <p>⑤ 소비자 기본법 제52조에 의거한 소비자 위해 정보 수집</p>
          <p>⑥ 영양상담, 복약상담, 고객의 소리 문의 시 답변내용 전달</p>
        </div>
      </div>
      <div className={styles.agreementSection}>
        <div className={styles.agreementIndent}>
          <p className={styles.agreementSubTitle}>오프라인 안내</p>
          <p>① 병원서비스 이용에 따른 본인 확인 절차에 사용</p>
          <p>② 고지사항 전달, 불만처리 등을 위한 원활한 의사소통경로의 확보, 새로운 서비스 및 행사정보 등의 안내</p>
          <p>③ 차별화된 의료컨텐츠 제공</p>
          <p>④ 증명서 발송 등 물품 배송</p>
          <p>⑤ 신규서비스 개발과 개인 맞춤 서비스 제공을 위한 자료</p>
          <p>⑥ 진단 및 치료를 위한 진료서비스와 진료비 청구, 수납, 환급 등의 원무서비스 제공</p>
          <p>⑦ 교육, 연구, 진료서비스에 필요한 최소한의 분석 자료</p>
          <p>⑧ 수탁검사 및 임상시험심사를 위한 기초자료</p>
          <p>⑨ 건강 컨텐츠 및 임상연구정보 제공</p>
          <p>⑩ 소비자 기본법 제 52조에 의거한 소비자 위해 정보 수집</p>
        </div>
      </div>
      <div className={styles.agreementSection}>
        <p className={styles.agreementSubTitle}>2. 수집하는 개인정보의 항목 및 수집방법</p>
        <p>
          {`"병원"은 이용자의 정보수집시 필요한 최소한의 정보를 수집합니다. 다음 사항을 필수 사항으로 하며 그 외 사항은 선택사항으로 합니다.`}
        </p>
      </div>
      <div className={styles.numberedItemsSection}>
        <div className={styles.numberedItem}>
          <p>① 일반 회원가입 시 수집항목</p>
          <p>필수항목 :</p>
          <p>
            성명,주민등록번호,외국인등록번호(외국인에한함),주소,전화번호,아이디,비밀번호,이메일,생년월일, 만14세 미만인
            경우 법정대리인 정보 서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로
            생성되어 수집될 수 있습니다.
          </p>
          <p>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 :</p>
        </div>
        <div className={styles.numberedItem}>
          <p>② 아이핀 회원가입 시 수집항목</p>
          <p>필수항목 :</p>
          <p>
            성명,아이핀번호,외국인등록번호(외국인에한함),주소,전화번호,아이디,비밀번호,이메일,생년월일, 서비스 이용
            과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
          </p>
          <p>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 :</p>
        </div>
        <div className={styles.numberedItem}>
          <p>③ 예약 시 수집항목</p>
          <p>필수항목 :</p>
          <p>
            병원등록번호, 성명(한글), 주민등록번호, 주소, 전화번호, 휴대폰번호, 이메일, 자동전화안내, 문자메시지, E-mail
            신청여부, 진료에 필요한 고객 건강상태 건강정보: 병력 및 가족력 등 진료서비스 제공을 위하여 의료진이
            필요하다고 판단되는 개인정보
          </p>
        </div>
        <div className={styles.numberedItem}>
          <p>④ 채용시 수집방법</p>
          <p>
            성명(한글, 한문, 영문), 생년월일, 성별, 비밀번호, 신장, 체중, 시력, 혈액형, 보훈사항, 종교, 연락처, 이메일,
            주소, 결혼여부, 병역사항, 학력사항, 경력사항, 자격 및 면허, 외국어, 가족사항, 교육사항, 상벌사항, 실습사항,
            사진, 취미, 특기, 건강사항, 장애여부 및 등급, 보훈사항, 자기소개
          </p>
          <p>
            정보 서비스 이용 과정이나 서비스 제공 업무 처리 과정에서 다음과 같은 정보들이 자동으로 생성되어 수집될 수
            있습니다.
          </p>
        </div>
        <div className={styles.numberedItem}>
          <p>⑤ 개인정보 수집방법</p>
          <p>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 :</p>
          <p>다음과 같은 방법으로 개인정보를 수집합니다.</p>
          <p>-홈페이지, 서면양식, 팩스, 전화, 상담 게시판, 이메일, 이벤트 응모</p>
          <p>-생성정보 수집 툴을 통한 수집(방문자 분석 툴과 같은 수집 툴 등)</p>
        </div>
      </div>
      <div className={styles.agreementSection}>
        <p className={styles.agreementSubTitle}>3. 개인정보 보유 및 이용기간</p>
        <p>
          {`병원은 회원님이 '홈페이지'에서 제공하는 서비스를 받는 동안 회원님의 개인 정보는 '홈페이지'에서 계속 보유하며 서비스 제공을 위해 이용하게 됩니다. 단, 개인정보 수집목적 달성을 하거나 탈퇴, 회원자격 상실 사유에 의해 회원 자격을 제한 및 정지시키는 경우에는 해당 개인의 정보는 재생할 수 없는 기술적 방법에 의해 삭제되며 어떠한 용도로도 열람 또는 이용될 수 없도록 처리됩니다.`}
        </p>
      </div>
    </>
  )
}

const ReferralCenterPersonalInfoRequiredContent: React.FC<{ hospitalName: string }> = ({ hospitalName }) => {
  return (
    <div className={styles.privacySection}>
      <p>{`${hospitalName}은 개인정보보호법에 의거하여 귀하의 개인정보를 수집함에 있어 아래의 내용을 안내하고 있습니다.`}</p>

      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>1. 개인정보 수집 및 이용 목적</p>
        <div className={styles.privacySectionContent}>
          <p>홈페이지 회원가입 및 관리, 홈페이지 이용 관련 서비스 제공</p>
        </div>
      </div>

      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>2. 수집하려는 개인정보의 항목</p>
        <div className={styles.privacySectionContent}>
          <p>
            - 필수 항목 : 아이디, 비밀번호, 성명, 생년월일, 회원구분, 의사면허번호, 휴대전화, SMS수신여부, E-mail,
            E-mail 수신여부, 회신서 수신 동의 여부, 병원명, 요양기관번호, 주소, 대표전화
          </p>
        </div>
      </div>

      <div className={styles.privacySectionItem}>
        <p className={styles.privacySectionTitle}>3. 개인정보의 보유 이용기간</p>
        <div className={styles.privacySectionContent}>
          <p>
            홈페이지 회원가입 탈퇴시까지 혹은 회원에서 제명 처리된 일까지 (즉시 파기 처리함) 단, 진료서비스 제공을
            위하여 수집된 경우 의료법 기준에 준함 (의료법 시행규칙 제15조에 명시된 기간)
          </p>
        </div>
      </div>

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
