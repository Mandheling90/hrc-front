'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Button } from '@/components/atoms/Button/Button'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
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
  id: '1',
  number: 84,
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
  content: '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다. 감사합니다.',
  applicant: '김철수',
  hospitalName: '소아청소년과',
  status: 'completed',
  registeredDate: '2025-11-25',
  replyContent:
    '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다. 감사합니다.\n\n추가 답변 내용이 여기에 표시됩니다.',
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
  id: '1',
  number: 84,
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
  content: '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다. 감사합니다.',
  applicant: '김철수',
  hospitalName: '소아청소년과',
  status: 'expired',
  registeredDate: '2025-11-25'
}

// 이전글/다음글 데이터
const mockPrevPost = {
  id: '0',
  title: '소아청소년과 김철수 선생님 자문을 요청드립니다.'
}

const mockNextPost: { id: string; title: string } | null = null // 다음 글이 없는 경우

export default function EConsultDetailPage() {
  const router = useRouter()
  const [replyContent, setReplyContent] = useState('')

  // 실제로는 params.id로 데이터를 가져와야 함
  // 테스트를 위해 status에 따라 다른 데이터 사용
  const eConsult = mockEConsultDetailExpired // 또는 mockEConsultDetailWaiting, mockEConsultDetailCompleted

  const statusLabels = {
    waiting: '답변 대기',
    expired: '기간 만료',
    completed: '답변 완료'
  }

  const isCompleted = eConsult.status === 'waiting'
  const isExpired = eConsult.status === 'waiting'

  const maxLength = 1500
  const characterCount = replyContent.length

  const handleReplySubmit = () => {
    // 답변 등록 로직
    console.log('답변 등록:', replyContent)
    // TODO: API 호출
  }

  const handleBackToList = () => {
    router.push('/network/e-consult/list')
  }

  const handlePrevPostClick = () => {
    if (mockPrevPost) {
      router.push(`/network/e-consult/list/${mockPrevPost.id}`)
    }
  }

  const handleNextPostClick = () => {
    if (mockNextPost) {
      router.push(`/network/e-consult/list/${mockNextPost.id}`)
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>자문의 e-Consult 조회</h1>

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
            <div className={styles.contentNumberBox}>
              <span className={styles.contentNumber}>{eConsult.title}</span>
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
                <h3 className={styles.replyDisplayTitle}>자문의 답변</h3>
              </div>
              <div className={styles.replyDisplayContent}>
                <div className={styles.replyDisplayMeta}>
                  <span className={styles.replyDisplayName}>{eConsult.replier || eConsult.applicant}</span>
                  {eConsult.replyDate && <span className={styles.replyDisplayDate}>{eConsult.replyDate}</span>}
                </div>
                <div className={styles.replyDisplayText}>{eConsult.replyContent || '답변 내용이 없습니다.'}</div>
              </div>
            </div>
          ) : isExpired ? (
            /* 기간 만료: 만료 안내 메시지 */
            <div className={styles.expiredMessageSection}>
              <p className={styles.expiredMessage}>답변기간이 만료되어 종료되었습니다.</p>
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
