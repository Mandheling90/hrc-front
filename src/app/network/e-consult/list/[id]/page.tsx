'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useMutation } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { CONSULTANT_ECONSULT_BY_ID_QUERY } from '@/graphql/econsult/queries'
import { CONSULTANT_REPLY_ECONSULT_MUTATION } from '@/graphql/econsult/mutations'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Button } from '@/components/atoms/Button/Button'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

// API 응답 타입
interface ConsultantEConsultByIdData {
  consultantEConsultById: {
    id: string
    title: string
    content: string
    status: string
    createdAt: string
    answeredAt?: string
    expiresAt: string
    requester?: {
      id: string
      userName?: string
      email?: string
      phone?: string
      profile?: { hospName?: string }
    }
    consultant?: {
      id: string
      name?: string
      department?: string
      specialty?: string
      email?: string
    }
    reply?: {
      id: string
      content: string
      createdAt: string
      repliedById: string
      repliedBy?: { id: string; userName?: string }
    }
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

/** API 상태 → UI 상태 변환 */
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

export default function EConsultDetailPage() {
  const router = useHospitalRouter()
  const params = useParams()
  const id = params.id as string
  const [doctorId, setDoctorId] = useState<string | null>(null)

  useEffect(() => {
    const storedDoctorId = localStorage.getItem('econsult_doctor_id')
    setDoctorId(storedDoctorId)
  }, [])
  const [replyContent, setReplyContent] = useState('')

  const { data, loading } = useQuery<ConsultantEConsultByIdData>(CONSULTANT_ECONSULT_BY_ID_QUERY, {
    variables: { doctorId, id },
    skip: !doctorId,
    fetchPolicy: 'cache-and-network'
  })

  const [replyEConsult, { loading: replyLoading }] = useMutation(CONSULTANT_REPLY_ECONSULT_MUTATION, {
    refetchQueries: [{ query: CONSULTANT_ECONSULT_BY_ID_QUERY, variables: { doctorId, id } }]
  })

  const eConsultData = data?.consultantEConsultById

  const statusLabels: Record<string, string> = {
    waiting: '답변 대기',
    expired: '기간 만료',
    completed: '답변 완료'
  }

  const status = mapStatus(eConsultData?.status)
  const isCompleted = status === 'completed'
  const isExpired = status === 'expired'

  const applicant = eConsultData?.requester?.userName || '-'
  const hospitalName = eConsultData?.requester?.profile?.hospName || '-'
  const registeredDate = eConsultData?.createdAt ? formatDate(eConsultData.createdAt) : '-'
  const replyData = eConsultData?.reply
  const replyDate = replyData?.createdAt ? formatDateTime(replyData.createdAt) : undefined
  const replier = replyData?.repliedBy?.userName || eConsultData?.consultant?.name || '-'

  const maxLength = 1500
  const characterCount = replyContent.length

  const handleReplySubmit = async () => {
    if (!replyContent.trim() || !doctorId) return
    try {
      await replyEConsult({
        variables: {
          doctorId,
          id,
          input: { content: replyContent }
        }
      })
      setReplyContent('')
    } catch (err) {
      console.error('답변 등록 실패:', err)
    }
  }

  const handleBackToList = () => {
    router.push('/network/e-consult/list')
  }

  if (loading && !data) {
    return (
      <div className={styles.wrap}>
        <Header />
        <main className={styles.main}>
          <div className='container'>
            <h1 className={styles.pageTitle}>자문의 e-Consult 조회</h1>
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
            <h1 className={styles.pageTitle}>자문의 e-Consult 조회</h1>
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
                <>
                  <span className={styles.contentTitle}>{eConsultData.title}</span>
                  <span className={styles.contentDivider} />
                  <span className={styles.contentDate}>{registeredDate}</span>
                </>
              ) : (
                <>
                  <span className={styles.contentTitle}>{eConsultData.title}</span>
                </>
              )}
            </div>

            <div className={styles.contentBody}>
              <p>{eConsultData.content}</p>
            </div>
          </div>

          {/* 답변 완료: 답변 내용 표시 */}
          {isCompleted ? (
            <div className={styles.replyDisplaySection}>
              <div className={styles.replyDisplayHeader}>
                <span className={styles.replyDisplayTitle}>자문의 답변</span>
              </div>
              <div className={styles.replyDisplayContent}>
                <div className={styles.replyDisplayMeta}>
                  <span className={styles.replyDisplayName}>{replier || '-'}</span>
                  <span className={styles.replyMetaDivider} />
                  {replyDate && <span className={styles.replyDisplayDate}>{replyDate}</span>}
                </div>
                <div className={styles.replyDisplayText}>{replyData?.content || '답변 내용이 없습니다.'}</div>
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
                  <span className={styles.replierName}>{eConsultData?.consultant?.name || '-'}</span>
                  <span className={styles.replyLabel}></span>
                </div>
                <Textarea
                  id='reply'
                  name='reply'
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder='답변 내용을 입력해주세요.'
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
                  <Button
                    variant='primary'
                    size='medium'
                    onClick={handleReplySubmit}
                    className={styles.replyButton}
                    disabled={replyLoading || !replyContent.trim()}
                  >
                    답변등록
                  </Button>
                </div>
              </div>
            </div>
          )}

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
