'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { PaperclipIcon } from '@/components/icons/PaperclipIcon'
import { ArrowDownloadIcon } from '@/components/icons/ArrowDownloadIcon'
import { PrevNextNavigation } from '@/components/molecules/PrevNextNavigation/PrevNextNavigation'
import styles from './page.module.scss'

interface NoticeDetail {
  id: string
  title: string
  registeredDate: string
  content: string
  isNotice: boolean
  attachmentName?: string
}

// 임시 상세 데이터 (리스트와 동일한 구조를 가정)
// Figma 기준: notice-1은 이전 글이 있고, 다음 글이 없는 상태 (배열 마지막)
const mockNoticeDetails: NoticeDetail[] = [
  {
    id: '3',
    title: '2025년 12월 외래진료 시간표입니다.',
    registeredDate: '2025-12-01',
    isNotice: false,
    content: '2025년 12월 외래진료 시간표를 안내드립니다.'
  },
  {
    id: 'notice-2',
    title: '고려대학교 안암병원 협력병·의원장 무료주차 서비스 변경 안내',
    registeredDate: '2025-08-13',
    isNotice: true,
    content: '고려대학교 안암병원 협력병·의원장 무료주차 서비스 변경 안내입니다.'
  },
  {
    id: 'notice-1',
    title: '【진료의뢰-회송시범사업】중계포털 의뢰서 작성 방법 안내',
    registeredDate: '2024-09-26',
    isNotice: true,
    attachmentName: '중계포털 의뢰서 작성 안내.pdf',
    content:
      '진료의뢰-회송 시범사업 중계포털 의뢰서 작성 방법 리플릿을 첨부하오니 많은 이용 부탁드립니다.\n\n감사합니다.'
  }
]

export default function NoticeDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useHospitalRouter()

  const currentIndex = mockNoticeDetails.findIndex(notice => notice.id === params.id)
  const notice = currentIndex >= 0 ? mockNoticeDetails[currentIndex] : mockNoticeDetails[0]

  const prevNotice = currentIndex > 0 ? mockNoticeDetails[currentIndex - 1] : null
  const nextNotice =
    currentIndex >= 0 && currentIndex < mockNoticeDetails.length - 1 ? mockNoticeDetails[currentIndex + 1] : null

  const handleBackToList = () => {
    router.push('/notice/list')
  }

  const handlePrevClick = () => {
    if (prevNotice) {
      router.push(`/notice/list/${prevNotice.id}`)
    }
  }

  const handleNextClick = () => {
    if (nextNotice) {
      router.push(`/notice/list/${nextNotice.id}`)
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>공지사항</h1>

          {/* 제목 영역 */}
          <section className={styles.noticeHeaderSection}>
            <div className={styles.noticeHeaderBox}>
              <div className={styles.noticeTitleArea}>
                <h2 className={styles.noticeTitle}>{notice.title}</h2>
              </div>
              <div className={styles.headerDivider} />
              <div className={styles.noticeDateArea}>
                <span className={styles.noticeDate}>{notice.registeredDate}</span>
              </div>
            </div>
          </section>

          {/* 첨부파일 영역 */}
          {notice.attachmentName && (
            <section className={styles.attachmentSection}>
              <div className={styles.attachmentBox}>
                <PaperclipIcon width={24} height={24} className={styles.attachmentIcon} />
                <div className={styles.attachmentInfo}>
                  <span className={styles.attachmentName}>{notice.attachmentName}</span>
                  <button type='button' className={styles.attachmentDownloadButton}>
                    <ArrowDownloadIcon width={24} height={24} className={styles.attachmentDownloadIcon} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 본문 내용 */}
          <section className={styles.contentSection}>
            <p className={styles.contentText}>{notice.content}</p>
          </section>

          {/* 이전 글 / 다음 글 */}
          <PrevNextNavigation
            prev={prevNotice ? { title: prevNotice.title, onClick: handlePrevClick } : null}
            next={nextNotice ? { title: nextNotice.title, onClick: handleNextClick } : null}
          />

          {/* 목록 버튼 */}
          <section className={styles.backButtonSection}>
            <button type='button' className={styles.listButton} onClick={handleBackToList}>
              목록
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
