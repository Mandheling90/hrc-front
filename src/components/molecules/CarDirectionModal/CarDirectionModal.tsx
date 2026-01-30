'use client'

import React, { useEffect } from 'react'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { CarIcon } from '@/components/icons/CarIcon'
import { RoadIcon } from '@/components/icons/RoadIcon'
import { BridgeIcon } from '@/components/icons/BridgeIcon'
import { MapIcon } from '@/components/icons/MapIcon'
import type { CarDirectionRoute } from '@/types/hospital'
import styles from './CarDirectionModal.module.scss'

export interface CarDirectionModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 방면 제목 */
  title: string
  /** 경로 정보 배열 */
  routes: CarDirectionRoute[]
  /** 닫기 핸들러 */
  onClose: () => void
  /** 배경 클릭 시 닫기 여부 (기본값: false) */
  closeOnBackdropClick?: boolean
}

export const CarDirectionModal: React.FC<CarDirectionModalProps> = ({
  isOpen,
  title,
  routes,
  onClose,
  closeOnBackdropClick = false
}) => {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

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

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type='button' className={styles.closeButton} onClick={onClose} aria-label='닫기'>
            <CloseIcon width={40} height={40} />
          </button>
        </div>

        {/* 경로 맵 영역 */}
        <div className={styles.routeMap}>
          <div className={styles.routeMapLine}></div>
          <div className={styles.routeMapIcons}>
            <div className={styles.routeMapIcon}>
              <CarIcon width={56} height={56} fill='black' />
            </div>
            <div className={styles.routeMapIcon}>
              <RoadIcon width={56} height={56} fill='black' />
            </div>
            <div className={styles.routeMapIcon}>
              <RoadIcon width={56} height={56} fill='black' />
            </div>
            <div className={styles.routeMapIcon}>
              <BridgeIcon width={56} height={56} fill='black' stroke='black' />
            </div>
            <div className={styles.routeMapIcon}>
              <MapIcon width={56} height={56} fill='black' />
            </div>
          </div>
        </div>

        {/* 경로 목록 */}
        <div className={styles.routesList}>
          {routes.map((route, routeIndex) => (
            <div key={routeIndex} className={styles.routeCard}>
              <div className={styles.routeCardHeader}>
                <div className={styles.routeCardBullet}></div>
                <h3 className={styles.routeCardTitle}>{route.title}</h3>
              </div>
              <div className={styles.routeCardSteps}>
                {route.steps.map((step, stepIndex) => (
                  <React.Fragment key={stepIndex}>
                    <div className={styles.routeCardStep}>
                      <p className={styles.routeCardStepText}>{step.text}</p>
                    </div>
                    {stepIndex < route.steps.length - 1 && (
                      <div className={styles.routeCardArrow}>
                        <ArrowRightIcon stroke='#4568F2' />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
