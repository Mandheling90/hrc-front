'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import styles from './ImageViewerModal.module.scss'

export interface ImageViewerModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 검사 유형 배지 텍스트 (예: 영상 검사, 내시경 검사) */
  examType?: string
  /** 검사명 (예: Gastrofiberscopy [G]) */
  examName: string
  /** 이미지 URL 목록 */
  images: string[]
  /** 배경 클릭 시 닫기 여부 (기본값: true) */
  closeOnBackdropClick?: boolean
}

type ViewMode = 'grid' | 'detail'

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  examType = '영상 검사',
  examName,
  images,
  closeOnBackdropClick = true
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // 키보드 이벤트 처리 (ESC, 좌우 화살표)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewMode === 'detail') {
          // 상세 뷰에서는 목록으로 돌아가기
          setViewMode('grid')
        } else {
          onClose()
        }
      } else if (viewMode === 'detail' && selectedIndex !== null) {
        if (e.key === 'ArrowLeft') {
          // 이전 이미지
          setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1)
        } else if (e.key === 'ArrowRight') {
          // 다음 이미지
          setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, viewMode, selectedIndex, images.length])

  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // 모달이 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(null)
      setViewMode('grid')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  // 이미지 클릭 시 상세 보기로 전환
  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setViewMode('detail')
  }

  // 이전 이미지로 이동
  const handlePrevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1)
    }
  }

  // 다음 이미지로 이동
  const handleNextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0)
    }
  }

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setViewMode('grid')
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${viewMode === 'detail' ? styles.detailMode : ''}`}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.badge}>{examType}</span>
            <h2 className={styles.title}>{examName}</h2>
          </div>
          <button type='button' className={styles.closeButton} onClick={onClose} aria-label='닫기'>
            <CloseIcon />
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className={styles.content}>
          {viewMode === 'grid' ? (
            /* 그리드 뷰 (이미지 목록) */
            <div className={styles.imageSection}>
              <SectionTitle title='이미지' noMargin />
              <div className={styles.imageGrid}>
                {images.map((src, index) => (
                  <button
                    key={index}
                    type='button'
                    className={`${styles.imageItem} ${selectedIndex === index ? styles.selected : ''}`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={src}
                      alt={`${examName} 이미지 ${index + 1}`}
                      width={160}
                      height={160}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 상세 뷰 (확대 이미지) */
            <div className={styles.detailSection}>
              <div className={styles.detailViewer}>
                {/* 이전 버튼 */}
                <button type='button' className={styles.navButton} onClick={handlePrevImage} aria-label='이전 이미지'>
                  <ChevronLeftIcon width={24} height={24} stroke='#000000' />
                </button>

                {/* 이미지 및 카운터 */}
                <div className={styles.detailImageWrapper}>
                  <div className={styles.imageCounter}>
                    <span className={styles.currentIndex}>{(selectedIndex ?? 0) + 1}</span>
                    <span className={styles.totalCount}>/{images.length.toLocaleString()}</span>
                  </div>
                  {selectedIndex !== null && (
                    <Image
                      src={images[selectedIndex]}
                      alt={`${examName} 이미지 ${selectedIndex + 1}`}
                      width={512}
                      height={512}
                      className={styles.detailImage}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* 다음 버튼 */}
                <button type='button' className={styles.navButton} onClick={handleNextImage} aria-label='다음 이미지'>
                  <ChevronRightIcon width={24} height={24} stroke='#000000' />
                </button>
              </div>

              {/* 목록 버튼 */}
              <button type='button' className={styles.listButton} onClick={handleBackToList}>
                목록
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
