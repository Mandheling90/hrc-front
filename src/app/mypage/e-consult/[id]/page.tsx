'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Button } from '@/components/atoms/Button/Button'
import styles from './page.module.scss'
import { PrevNextNavigation } from '@/components/molecules/PrevNextNavigation/PrevNextNavigation'

// e-Consult 상세 데이터 타입
interface EConsultDetailData {
  id: string
  number: number
  title: string
  content: string
  applicant: string
  hospitalName: string
  status: 'waiting' | 'expired' | 'completed'
  registeredDate: string
  replyContent?: string
  replyDate?: string
  replier?: string
}

// 임시 데이터 (답변 완료 상태)
const mockEConsultDetailCompleted: EConsultDetailData = {
  id: '3',
  number: 82,
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
  content:
    '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다.\n\n감사합니다.',
  applicant: '김철수',
  hospitalName: '소아청소년과',
  status: 'completed',
  registeredDate: '2025-11-25',
  replyContent:
    '진료협력 운영 현황을 검토한 결과, \n현재 협력병원 대응 프로세스는 기본적인 절차는 갖추고 있으나 병원 내부 전산과의 연동 및 협력기관 관리 체계에서 일부 개선 여지가 확인되었습니다. \n특히 의뢰·회송 환자 처리 과정에서 수기 입력 비중이 높아 업무 효율성이 저하되고 있으며, 협력병원별 신청·계약 관리 기준이 부서마다 상이해 데이터 일관성 확보가 어려운 점이 주요 이슈로 파악됩니다. \n이에 따라 API 기반의 의뢰·회송 연동 표준화, 협력병원 계약·자격 관리의 단일화된 체계 구축이 필요합니다. \n또한 협력기관 의뢰 패턴 분석, 의사 간 커뮤니케이션 채널 개선, 회송 환자 추적관리 기능 도입을 통해 협력 성과를 체계적으로 관리할 수 있습니다. \n향후 단계별 개선 로드맵을 마련해 협력병원 접근성 강화와 환자 중심의 진료 연속성 확보를 목표로 추진하는 것이 바람직합니다.',
  replyDate: '2025-11-25, 06:48',
  replier: '김철수'
}

// 임시 데이터 (답변 대기 상태)
const mockEConsultDetailWaiting: EConsultDetailData = {
  id: '1',
  number: 84,
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
  content: '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다. 감사합니다.',
  applicant: '김철수',
  hospitalName: '소아청소년과',
  status: 'waiting',
  registeredDate: '2025-11-25'
}

// 임시 데이터 (기간 만료 상태)
const mockEConsultDetailExpired: EConsultDetailData = {
  id: '2',
  number: 83,
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
  content: '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다. 감사합니다.',
  applicant: '김철수',
  hospitalName: '소아청소년과',
  status: 'expired',
  registeredDate: '2025-11-25'
}

// ID별 mock 데이터 매핑
const mockDataMap: Record<string, EConsultDetailData> = {
  '1': mockEConsultDetailWaiting,
  '2': mockEConsultDetailExpired,
  '3': mockEConsultDetailCompleted
}

// 이전글/다음글 데이터
const mockPrevPost = {
  id: '0',
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.'
}

const mockNextPost: { id: string; title: string } | null = null // 다음 글이 없는 경우

export default function MypageEConsultDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [replyContent, setReplyContent] = useState('')

  // URL params에서 ID를 가져와 해당하는 mock 데이터 선택
  const id = params.id as string
  const eConsult = mockDataMap[id] || mockEConsultDetailWaiting

  const statusLabels = {
    waiting: '답변 대기',
    expired: '기간 만료',
    completed: '답변 완료'
  }

  const isCompleted = eConsult.status === 'completed'
  const isExpired = eConsult.status === 'expired'

  const maxLength = 1500
  const characterCount = replyContent.length

  const handleReplySubmit = () => {
    // 답변 등록 로직
    console.log('답변 등록:', replyContent)
    // TODO: API 호출
  }

  const handleBackToList = () => {
    router.push('/mypage/e-consult')
  }

  const handlePrevPostClick = () => {
    if (mockPrevPost) {
      router.push(`/mypage/e-consult/${mockPrevPost.id}`)
    }
  }

  const handleNextPostClick = () => {
    if (mockNextPost) {
      router.push(`/mypage/e-consult/${mockNextPost.id}`)
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>e-Consult 조회</h1>

          {/* 신청자 정보 섹션 */}
          <div className={styles.applicantSection}>
            <div className={styles.applicantHeader}>
              <h2 className={styles.sectionTitle}>신청자 정보</h2>
              <div className={styles.sectionDivider} />
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>신청자명</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{eConsult.applicant}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>의료기관명</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{eConsult.hospitalName}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>신청일</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{eConsult.registeredDate}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>답변상태</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{statusLabels[eConsult.status]}</div>
              </div>
            </div>
          </div>

          {/* 자문 요청 내용 */}
          <div className={styles.contentSection}>
            <div className={styles.contentTitleBox}>
              {isCompleted || isExpired ? (
                /* 답변 완료/기간 만료: 제목 | 날짜 형식 */
                <>
                  <span className={styles.contentTitle}>{eConsult.title}</span>
                  <span className={styles.contentDivider} />
                  <span className={styles.contentDate}>{eConsult.registeredDate}</span>
                </>
              ) : (
                /* 답변 대기: 번호 | 제목 형식 */
                <>
                  <span className={styles.contentNumber}>{eConsult.number}</span>
                  <span className={styles.contentDivider} />
                  <span className={styles.contentTitle}>{eConsult.title}</span>
                </>
              )}
            </div>

            <div className={styles.contentBody}>
              <p>{eConsult.content}</p>
            </div>
          </div>

          {/* 답변 입력 섹션 (답변 대기 상태) 또는 답변 내용 (답변 완료 상태) 또는 만료 메시지 (기간 만료 상태) */}
          {isCompleted ? (
            /* 답변 완료: 답변 내용 표시 */
            <div className={styles.replyDisplaySection}>
              <div className={styles.replyDisplayHeader}>
                <span className={styles.replyDisplayTitle}>자문의 답변</span>
              </div>
              <div className={styles.replyDisplayContent}>
                <div className={styles.replyDisplayMeta}>
                  <span className={styles.replyDisplayName}>{eConsult.replier || eConsult.applicant}</span>
                  <span className={styles.replyMetaDivider} />
                  {eConsult.replyDate && <span className={styles.replyDisplayDate}>{eConsult.replyDate}</span>}
                </div>
                <div className={styles.replyDisplayText}>{eConsult.replyContent || '답변 내용이 없습니다.'}</div>
              </div>
            </div>
          ) : isExpired ? (
            /* 기간 만료: 만료 안내 메시지 */
            <div className={styles.expiredMessageSection}>
              <div className={styles.expiredMessageBox}>
                <p className={styles.expiredMessage}>답변기간이 만료되어 종료되었습니다.</p>
              </div>
            </div>
          ) : (
            /* 답변 대기: 답변 입력 폼 */
            <div className={styles.replySection}>
              <div className={styles.replyTop}>
                <div className={styles.replyHeader}>
                  <span className={styles.replierName}>{eConsult.applicant}</span>
                  <span className={styles.replyLabel}>답변 내용을 입력해주세요.</span>
                </div>
                <Textarea
                  id='reply'
                  name='reply'
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder=''
                  maxLength={maxLength}
                  borderless
                  disableFocusHighlight
                  className={styles.replyTextarea}
                />
              </div>

              <div className={styles.replyBottom}>
                <span className={styles.characterCount}>
                  {characterCount} / {maxLength}
                </span>
                <div className={styles.replyActions}>
                  <Button variant='primary' size='medium' onClick={handleReplySubmit} className={styles.replyButton}>
                    답변등록
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 이전글/다음글 네비게이션 */}
          <PrevNextNavigation
            prev={mockPrevPost ? { title: mockPrevPost.title, onClick: handlePrevPostClick } : null}
            next={mockNextPost ? { title: mockNextPost.title, onClick: handleNextPostClick } : null}
          />

          {/* 목록 버튼 */}
          <div className={styles.backButtonSection}>
            <Button variant='gray' size='medium' onClick={handleBackToList}>
              목록
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
