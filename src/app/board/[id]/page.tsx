'use client'

import React, { Suspense, useCallback, useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { PaperclipIcon } from '@/components/icons/PaperclipIcon'
import { ArrowDownloadIcon } from '@/components/icons/ArrowDownloadIcon'
import { PrevNextNavigation } from '@/components/molecules/PrevNextNavigation/PrevNextNavigation'
import {
  BOARD_POST_BY_ID_QUERY,
  BOARD_POSTS_QUERY,
  ATTACHMENTS_QUERY
} from '@/graphql/menu/queries'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

interface BoardPostDetail {
  id: string
  title: string
  content: string
  createdAt: string
  thumbnailUrl: string | null
  isPinned: boolean
  viewCount: number
}

interface Attachment {
  id: string
  originalName: string
  storedPath: string
  mimeType: string
  fileSize: number
  createdAt: string
}

interface BoardPostByIdData {
  boardPostById: BoardPostDetail | null
}

interface BoardPostsData {
  boardPosts: {
    items: BoardPostDetail[]
    totalCount: number
  }
  pinnedPosts: BoardPostDetail[]
}

interface AttachmentsData {
  attachments: Attachment[]
}

export default function BoardDetailPage() {
  return (
    <Suspense>
      <BoardDetailPageInner />
    </Suspense>
  )
}

function BoardDetailPageInner() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const boardId = searchParams.get('boardId')
  const router = useHospitalRouter()

  // 현재 게시글 조회
  const { data, loading, error } = useQuery<BoardPostByIdData>(BOARD_POST_BY_ID_QUERY, {
    variables: { boardId, id: params.id },
    skip: !boardId || !params.id,
    fetchPolicy: 'network-only'
  })

  // 같은 게시판의 전체 글 목록 (이전/다음 글 네비게이션용)
  const { data: listData } = useQuery<BoardPostsData>(BOARD_POSTS_QUERY, {
    variables: { boardId },
    skip: !boardId,
    fetchPolicy: 'cache-first'
  })

  // 첨부파일 조회
  const { data: attachmentsData } = useQuery<AttachmentsData>(ATTACHMENTS_QUERY, {
    variables: { entityId: params.id, entityType: 'BOARD' },
    skip: !params.id,
    fetchPolicy: 'network-only'
  })

  const post = data?.boardPostById
  const attachments = attachmentsData?.attachments ?? []

  // 이전/다음 글 계산 (고정글 + 일반글 합쳐서 검색)
  const { prevPost, nextPost } = useMemo(() => {
    const items = listData?.boardPosts.items ?? []
    const pinned = listData?.pinnedPosts ?? []
    // 고정글을 앞에, 일반글을 뒤에 배치 (리스트 페이지와 동일한 순서)
    const pinnedIds = new Set(pinned.map(p => p.id))
    const normalItems = items.filter(item => !pinnedIds.has(item.id))
    const allItems = [...pinned, ...normalItems]
    const currentIndex = allItems.findIndex(item => item.id === params.id)
    return {
      prevPost: currentIndex > 0 ? allItems[currentIndex - 1] : null,
      nextPost: currentIndex >= 0 && currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null
    }
  }, [listData, params.id])

  const handleDownload = useCallback(async (attachment: Attachment) => {
    const storageBase = process.env.NEXT_PUBLIC_STORAGE_BASE_URL || ''
    const url = attachment.storedPath.startsWith('http')
      ? attachment.storedPath
      : `${storageBase}/${attachment.storedPath}`
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = attachment.originalName
      link.click()
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(url, '_blank')
    }
  }, [])

  const handleBackToList = () => {
    router.push(`/board?boardId=${boardId}`)
  }

  const handlePrevClick = () => {
    if (prevPost) router.push(`/board/${prevPost.id}?boardId=${boardId}`)
  }

  const handleNextClick = () => {
    if (nextPost) router.push(`/board/${nextPost.id}?boardId=${boardId}`)
  }

  const formatDate = (dateStr: string) => dateStr.slice(0, 10)

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          {loading && (
            <div>
              <Skeleton width='100%' height={32} variant='rounded' />
              <div style={{ height: 16 }} />
              <Skeleton width='30%' height={16} variant='text' />
              <div style={{ height: 24 }} />
              <Skeleton width='100%' height={200} variant='rounded' />
            </div>
          )}
          {error && <div className={styles.error}>게시글을 불러올 수 없습니다.</div>}
          {post && (
            <>
              {/* 제목 영역 */}
              <section className={styles.headerSection}>
                <div className={styles.headerBox}>
                  <div className={styles.titleArea}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                  </div>
                  <div className={styles.headerDivider} />
                  <div className={styles.dateArea}>
                    <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </section>

              {/* 첨부파일 영역 */}
              {attachments.length > 0 && (
                <section className={styles.attachmentSection}>
                  {attachments.map(attachment => (
                    <div key={attachment.id} className={styles.attachmentBox}>
                      <PaperclipIcon width={24} height={24} className={styles.attachmentIcon} />
                      <div className={styles.attachmentInfo}>
                        <span className={styles.attachmentName}>{attachment.originalName}</span>
                        <button
                          type='button'
                          className={styles.attachmentDownloadButton}
                          onClick={() => handleDownload(attachment)}
                        >
                          <ArrowDownloadIcon width={24} height={24} className={styles.attachmentDownloadIcon} />
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* 본문 내용 */}
              <section className={styles.contentSection}>
                <div
                  className={styles.contentBody}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </section>

              {/* 이전 글 / 다음 글 */}
              <PrevNextNavigation
                prev={prevPost ? { title: prevPost.title, onClick: handlePrevClick } : null}
                next={nextPost ? { title: nextPost.title, onClick: handleNextClick } : null}
              />

              {/* 목록 버튼 */}
              <section className={styles.backButtonSection}>
                <button type='button' className={styles.listButton} onClick={handleBackToList}>
                  목록
                </button>
              </section>
            </>
          )}
          {!loading && !error && !post && (
            <div className={styles.error}>게시글을 찾을 수 없습니다.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
