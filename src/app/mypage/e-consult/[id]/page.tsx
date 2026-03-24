'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useAuthContext } from '@/contexts/AuthContext'
import { ECONSULT_BY_ID_QUERY } from '@/graphql/econsult/queries'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Button } from '@/components/atoms/Button/Button'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

// API 응답 타입
interface EConsultByIdData {
  eConsultById: {
    id: string
    hospitalCode: string
    requesterId: string
    requester?: { userName?: string; email?: string; profile?: { hospName?: string } }
    consultantId: string
    consultant?: { name?: string; department?: string; email?: string }
    title: string
    content: string
    status: string
    reply?: {
      id: string
      content: string
      repliedById: string
      repliedBy?: { userName?: string }
      createdAt: string
    }
    answeredAt?: string
    expiresAt: string
    createdAt: string
  }
}

/** 날짜 포맷 (YYYY-MM-DD) */
const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** 날짜+시간 포맷 (YYYY-MM-DD, HH:mm) */
const formatDateTime = (dateStr: string): string => {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
}

export default function MypageEConsultDetailPage() {
  const router = useHospitalRouter()
  const { user } = useAuthContext()
  const params = useParams()
  const id = params.id as string

  const { data, loading } = useQuery<EConsultByIdData>(ECONSULT_BY_ID_QUERY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  })

  const eConsultData = data?.eConsultById

  const statusLabels: Record<string, string> = {
    waiting: '답변 대기',
    expired: '기간 만료',
    completed: '답변 완료'
  }

  const mapStatus = (s?: string): 'waiting' | 'expired' | 'completed' | undefined => {
    switch (s) {
      case 'PENDING':
        return 'waiting'
      case 'EXPIRED':
        return 'expired'
      case 'ANSWERED':
        return 'completed'
      default:
        return undefined
    }
  }
  const status = mapStatus(eConsultData?.status)
  const isCompleted = status === 'completed'
  const isExpired = status === 'expired'

  const applicant = eConsultData?.requester?.userName || user?.userName || '-'
  const hospitalName = eConsultData?.requester?.profile?.hospName || user?.profile?.hospName || eConsultData?.consultant?.department || '-'
  const registeredDate = eConsultData?.createdAt ? formatDate(eConsultData.createdAt) : '-'
  const replyContent = eConsultData?.reply?.content
  const replyDate = eConsultData?.reply?.createdAt ? formatDateTime(eConsultData.reply.createdAt) : undefined
  const consultantDepartment = eConsultData?.consultant?.department || '-'
  const consultantName = eConsultData?.consultant?.name || '-'

  const handleBackToList = () => {
    router.push('/mypage/e-consult')
  }

  if (loading && !data) {
    return (
      <div className={styles.wrap}>
        <Header />
        <main className={styles.main}>
          <div className='container'>
            <h1 className={styles.pageTitle}>e-Consult 조회</h1>
            <Skeleton width='100%' height={200} variant='rounded' count={3} gap={16} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!eConsultData) {
    return (
      <div className={styles.wrap}>
        <Header />
        <main className={styles.main}>
          <div className='container'>
            <h1 className={styles.pageTitle}>e-Consult 조회</h1>
            <p>데이터를 찾을 수 없습니다.</p>
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
                <div className={styles.infoCardValue}>{applicant}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>의료기관명</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{hospitalName}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>신청일</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{registeredDate}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardLabel}>답변상태</div>
                <div className={styles.infoCardDivider} />
                <div className={styles.infoCardValue}>{status ? statusLabels[status] : '-'}</div>
              </div>
            </div>
          </div>

          {/* 자문 요청 내용 */}
          <div className={styles.contentSection}>
            <div className={styles.contentTitleBox}>
              {isCompleted || isExpired ? (
                /* 답변 완료/기간 만료: 제목 | 날짜 형식 */
                <>
                  <span className={styles.contentTitle}>{eConsultData.title}</span>
                  <span className={styles.contentDivider} />
                  <span className={styles.contentDate}>{registeredDate}</span>
                </>
              ) : (
                /* 답변 대기: 제목만 표시 */
                <>
                  <span className={styles.contentTitle}>{eConsultData.title}</span>
                </>
              )}
            </div>

            <div className={styles.contentBody}>
              <p>{eConsultData.content}</p>
            </div>
          </div>

          {/* 답변 내용 (답변 완료 상태) 또는 만료 메시지 (기간 만료 상태) */}
          {isCompleted ? (
            /* 답변 완료: 답변 내용 표시 */
            <div className={styles.replyDisplaySection}>
              <div className={styles.replyDisplayHeader}>
                <span className={styles.replyDisplayTitle}>자문의 답변</span>
              </div>
              <div className={styles.replyDisplayContent}>
                <div className={styles.replyDisplayMeta}>
                  <span className={styles.replyDisplayName}>{consultantDepartment}</span>
                  <span className={styles.replyMetaDivider} />
                  <span className={styles.replyDisplayName}>{consultantName}</span>
                  {replyDate && (
                    <>
                      <span className={styles.replyMetaDivider} />
                      <span className={styles.replyDisplayDate}>{replyDate}</span>
                    </>
                  )}
                </div>
                <div className={styles.replyDisplayText}>{replyContent || '답변 내용이 없습니다.'}</div>
              </div>
            </div>
          ) : isExpired ? (
            /* 기간 만료: 만료 안내 메시지 */
            <div className={styles.expiredMessageSection}>
              <div className={styles.expiredMessageBox}>
                <p className={styles.expiredMessage}>답변기간이 만료되어 종료되었습니다.</p>
              </div>
            </div>
          ) : null}

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
