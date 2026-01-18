'use client'

import React, { useEffect, useState, useRef } from 'react'
import styles from './ProgressSteps.module.scss'

export interface Step {
  id: number
  label: string
}

export interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep, className = '' }) => {
  const [isTabletOrUp, setIsTabletOrUp] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletOrUp(window.innerWidth >= 1440)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    const activeStepElement = stepRefs.current.get(currentStep)
    const container = containerRef.current

    if (activeStepElement && container && window.innerWidth <= 768) {
      const firstStep = steps[0]
      const lastStep = steps[steps.length - 1]
      const isFirstStep = currentStep === firstStep.id
      const isLastStep = currentStep === lastStep.id

      if (isFirstStep) {
        // 첫 번째 스텝: 제일 왼쪽으로 스크롤
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else if (isLastStep) {
        container.scrollTo({
          left: 9999,
          behavior: 'smooth'
        })
      } else {
        // 중간 스텝: 활성화된 step을 컨테이너의 왼쪽에 위치시키기
        const stepLeft = activeStepElement.offsetLeft
        container.scrollTo({
          left: stepLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [currentStep, steps])

  return (
    <div ref={containerRef} className={styles.progressStepsContainer}>
      <div className={`${styles.progressSteps} ${className}`}>
        <div className={styles.progressLine}></div>
        {steps.map(step => {
          const isActive = currentStep === step.id
          return isActive ? (
            <div
              key={step.id}
              ref={el => {
                if (el) {
                  stepRefs.current.set(step.id, el)
                }
              }}
              className={styles.stepWrapper}
            >
              <div className={`${styles.step} ${styles.active}`}>
                {isTabletOrUp && <span className={styles.stepNumber}>Step.0{step.id}</span>}
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            </div>
          ) : (
            <div
              key={step.id}
              ref={el => {
                if (el) {
                  stepRefs.current.set(step.id, el)
                }
              }}
              className={styles.step}
            >
              {isTabletOrUp && <span className={styles.stepNumber}>Step.0{step.id}</span>}
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
