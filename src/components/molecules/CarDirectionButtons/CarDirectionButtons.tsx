import React from 'react'
import { PlusIcon24 } from '@/components/icons/PlusIcon24'
import { ArrowRightIcon16 } from '@/components/icons/ArrowRightIcon16'
import type { CarDirection } from '@/types/hospital'
import styles from './CarDirectionButtons.module.scss'

export interface CarDirectionButtonsProps {
  directions: CarDirection[]
  onDirectionClick: (direction: CarDirection) => void
}

export const CarDirectionButtons: React.FC<CarDirectionButtonsProps> = ({ directions, onDirectionClick }) => {
  return (
    <div className={styles.carDirections}>
      {/* 데스크톱: 첫 줄 4개, 둘째 줄 나머지 */}
      <div className={styles.desktopLayout}>
        <div className={styles.carDirectionsRow}>
          {directions.slice(0, 4).map((direction, index) => (
            <button
              key={index}
              type='button'
              className={`${styles.carDirectionButton} `}
              onClick={() => {
                if (direction.routes && direction.routes.length > 0) {
                  onDirectionClick(direction)
                }
              }}
            >
              <span>{direction.label}</span>
              <PlusIcon24 />
            </button>
          ))}
        </div>
        {directions.length > 4 && (
          <div className={styles.carDirectionsRow}>
            {directions.slice(4).map((direction, index) => (
              <button
                key={index + 4}
                type='button'
                className={`${styles.carDirectionButton} `}
                onClick={() => {
                  if (direction.routes && direction.routes.length > 0) {
                    onDirectionClick(direction)
                  }
                }}
              >
                <span>{direction.label}</span>
                <PlusIcon24 />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 테블릿: 3개씩 3줄 */}
      <div className={styles.tabletLayout}>
        <div className={styles.carDirectionsRow}>
          {directions.slice(0, 3).map((direction, index) => (
            <button
              key={index}
              type='button'
              className={`${styles.carDirectionButton} `}
              onClick={() => {
                if (direction.routes && direction.routes.length > 0) {
                  onDirectionClick(direction)
                }
              }}
            >
              <span>{direction.label}</span>
              <PlusIcon24 />
            </button>
          ))}
        </div>
        {directions.length > 3 && (
          <div className={styles.carDirectionsRow}>
            {directions.slice(3, 6).map((direction, index) => (
              <button
                key={index + 3}
                type='button'
                className={`${styles.carDirectionButton} `}
                onClick={() => {
                  if (direction.routes && direction.routes.length > 0) {
                    onDirectionClick(direction)
                  }
                }}
              >
                <span>{direction.label}</span>
                <PlusIcon24 />
              </button>
            ))}
          </div>
        )}
        {directions.length > 6 && (
          <div className={styles.carDirectionsRow}>
            {directions.slice(6).map((direction, index) => (
              <button
                key={index + 6}
                type='button'
                className={`${styles.carDirectionButton} `}
                onClick={() => {
                  if (direction.routes && direction.routes.length > 0) {
                    onDirectionClick(direction)
                  }
                }}
              >
                <span>{direction.label}</span>
                <PlusIcon24 />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 모바일: 세로 나열 */}
      <div className={styles.mobileLayout}>
        {directions.map((direction, index) => (
          <button
            key={index}
            type='button'
            className={`${styles.carDirectionButtonMobile} `}
            onClick={() => {
              if (direction.routes && direction.routes.length > 0) {
                onDirectionClick(direction)
              }
            }}
          >
            <span>{direction.label}</span>
            <ArrowRightIcon16 />
          </button>
        ))}
      </div>
    </div>
  )
}
