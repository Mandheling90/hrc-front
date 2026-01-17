'use client'

import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletOrUp(window.innerWidth >= 769)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return (
    <div className={`${styles.progressSteps} ${className}`}>
      <div className={styles.progressLine}></div>
      {steps.map(step => {
        const isActive = currentStep === step.id
        return isActive ? (
          <div key={step.id} className={styles.stepWrapper}>
            <div className={`${styles.step} ${styles.active}`}>
              {isTabletOrUp && <span className={styles.stepNumber}>Step.0{step.id}</span>}
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          </div>
        ) : (
          <div key={step.id} className={styles.step}>
            {isTabletOrUp && <span className={styles.stepNumber}>Step.0{step.id}</span>}
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
        )
      })}
    </div>
  )
}
