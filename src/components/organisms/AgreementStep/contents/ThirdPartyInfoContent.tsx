import React from 'react'
import styles from '../AgreementStep.module.scss'

export const ThirdPartyInfoContent: React.FC = () => {
  return (
    <>
      <div className={styles.agreementSection}>
        <p className={styles.agreementSubTitle}>1. 제3자 정보제공</p>
        <p>
          고려대학교병원은 회원이 고려대학교의료원 및 산하병원의 서비스를 편리하게 이용할 수 있도록 하기 위하여 통합
          회원제도를 운영하고 있습니다. 이를 위해 병원이 수집한 개인정보는 아래와 같이 제공됩니다.
        </p>
      </div>
      <div className={styles.agreementSection}>
        <div className={styles.agreementIndent}>
          <p className={styles.agreementSubTitle}>온라인 안내</p>
          <div className={styles.thirdPartyTable}>
            {/* 헤더 행 */}
            <div className={`${styles.tableRow} ${styles.tableHeaderRow}`}>
              <div className={styles.tableCell}>수탁업체</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>위탁업무의 내용</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>위탁개인정보</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>개인정보 보유기간</div>
            </div>
            {/* 데이터 행 1 */}
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>씨지</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>이메일 및 뉴스레터</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>성명, 이메일</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>위탁계약 종료시까지</div>
            </div>
            {/* 데이터 행 2 */}
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>메일플러그</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>이메일 및 뉴스레터</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>성명, 이메일</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>위탁계약 종료시까지</div>
            </div>
            {/* 데이터 행 3 */}
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>(주)레브히트</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>홈페이지 유지보수</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                이름, 병원등록번호, 생년월일, 전화번호, 이메일
              </div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>위탁계약 종료시까지</div>
            </div>
            {/* 데이터 행 4 - 나이스평가정보 (복잡한 구조) */}
            <div className={styles.tableRowComplex}>
              {/* 수탁업체 (세로 전체 span) */}
              <div className={styles.tableCellVertical}>나이스평가정보</div>
              <div className={styles.tableDividerVertical} />
              {/* 중간 섹션: 위탁업무의 내용 + 위탁개인정보 */}
              <div className={styles.tableMiddleSection}>
                {/* 본인인증 서브 행 */}
                <div className={styles.tableSubRow}>
                  <div className={styles.tableCellTask}>홈페이지 본인인증</div>
                  <div className={styles.tableDivider} />
                  <div className={styles.tableCellInfoContainer}>
                    <div className={styles.tableCellInfoItem}>
                      휴대폰인증 : 생년월일, 성별, 내/외국인, 성명, 휴대폰번호, 통신사
                    </div>
                    <div className={styles.tableCellInfoItem}>
                      범용공인인증서인증 : 주민등록번호(법률 등이 정하는 기간 동안만 수집)
                    </div>
                    <div className={styles.tableCellInfoItem}>아이핀 인증 : 아이핀 서비스의 아이디, 패스워드</div>
                  </div>
                </div>
                {/* 서브 행 구분선 */}
                <div className={styles.tableSubRowDivider} />
                {/* 실명인증 서브 행 */}
                <div className={styles.tableSubRow}>
                  <div className={styles.tableCellTask}>홈페이지 실명인증</div>
                  <div className={styles.tableDivider} />
                  <div className={styles.tableCellInfoContainer}>
                    <div className={styles.tableCellInfoItem}>이름, 주민등록번호</div>
                  </div>
                </div>
              </div>
              <div className={styles.tableDividerVertical} />
              {/* 개인정보 보유기간 (세로 전체 span) */}
              <div className={styles.tableCellVertical}>위탁계약 종료시까지</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.agreementSection}>
        <div className={styles.agreementIndent}>
          <p className={styles.agreementSubTitle}>오프라인 안내</p>
          <p>
            본원은 보다 나은 서비스 제공, 고객편의 제공 등 원활한 업무수행을 위하여 아래와 같이 개인정보의 처리를
            위탁하고 있으며, 관계법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고
            있습니다. 본원의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.
          </p>
          <div className={styles.thirdPartyTable}>
            {/* 헤더 행 */}
            <div className={`${styles.tableRow} ${styles.tableHeaderRow}`}>
              <div className={styles.tableCell}>수탁업체</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>위탁업무의 내용</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>위탁개인정보</div>
            </div>
            {/* 데이터 행들 */}
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>녹십자의료재단</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>진단검사용 검체검사</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>이름, 생년월일, 연락처</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>녹십자의료재단</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>분자병리검사업무</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>이름, 고유번호</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>유니에스</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>
                콜센터 업무
                <br />
                (진료상담, 예약, 변경, 취소 등)
              </div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                이름, 주민번호, 핸드폰번호, 주소, 수진이력
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>통인웨어하우스</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>문서보관외주용역</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>환자 의료정보 보관 및 폐기</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>엠티케어</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>구급차</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                이름, 질병명, 주소, 연락처 (이송환자에 한하여 제공)
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>휴넷</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>직원대상 온라인교육</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                원내 직원 이름, 사번, 직위, 부서, 전화번호, 이메일
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>C&S자산관리</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>주차관리</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>등록번호, 진료 여부</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜포씨게이트</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>키오스크 단말 운영</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                등록번호, 주민번호, 이름, 신용카드번호
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>MTS컴퍼니</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>진료/입원 및 검사 일정에 대한 안내 발송</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>성명, 연락처, 진료/입원 및 검사 일정</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>삼손 치과기공소</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>치과기공</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>위탁계약 종료시까지</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>센트릭 치과기공소</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>치과기공</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>성명, 등록번호</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜투비콘</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>의료증명서 인터넷 발급</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                의료증명서 (진료비영수증, 진료비납입확인서, 진료비세부내역서)
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>한국영상의원</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>의료 영상 외주 판독</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                성명, 생년월일, 등록번호, 진료기록 (X-ray, CT 등의 의료영상)
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜씨어스테크놀로지</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>홀터심전도</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                등록번호, 성명, 성별, 생년월일, 처방의, 심전도, 주소, 전화번호
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜휴이노</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>홀터심전도</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                등록번호, 성명, 성별, 생년월일, 처방의, 심전도, 인공심장박동기유무, 전화번호
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜스카이랩스</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>24시간 혈압</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>등록번호, 성명, 생년월일, 혈압, 맥박</div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜이노크라스코리아</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>Raw data(FASTAQ)의 정제후 분석</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                whole genome sequencing 검사를 통해 추출되는 원시데이터(FASTAQ), 검체식별 가명화정보, 진단 및 치료에
                필요한 임상정보
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>차케어스</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>안내데스크 운영</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                이름, 주민번호, 등록번호, 주소, 전화번호, 진료/입원 및 검사일정
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>11번가</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>금융정보저장서비스 (병원 하이패스)</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                카드정보(카드번호, 유효기간, 생년월일), 고객 관리번호
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>휴니버스글로벌</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>정보시스템 관리 및 제반 프로그램 개발</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                등록번호, 주민번호, 이름, 주소, 전화번호, 이메일, 진료정보, 신용카드번호
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>㈜로완</div>
              <div className={styles.tableDivider} />
              <div className={styles.tableCell}>인지중재치료 프로그램 시행</div>
              <div className={styles.tableDivider} />
              <div className={`${styles.tableCell} ${styles.tableCellWide}`}>
                이름, 생년월일, 성별, 인지, 수준, 학력, 환자연락처 (선택정보: 보호자 연락처, 직업, 병록번호)
              </div>
            </div>
          </div>
          <p>
            다만, 수집목적 또는 제공받은 목적이 달성된 경우에도 상법 등 법령의 규정에 의하여 보존할 필요성이 있는
            경우에는 귀하의 개인정보를 보유할 수 있습니다.
          </p>
        </div>
      </div>
      <div className={styles.agreementSection}>
        <p className={styles.agreementSubTitle}>2. 거부권 및 불이익</p>
        <p>
          이용자는 개인정보 수집 및 이용에 거부할 권리가 있으며 다만, 이를 거부할 때에는 회원제 서비스의 이용이 제한될
          수 있습니다.
        </p>
      </div>
    </>
  )
}
