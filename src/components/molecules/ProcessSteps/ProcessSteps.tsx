'use client'

import React from 'react'
import styles from './ProcessSteps.module.scss'

export interface ProcessStep {
  /** 단계 번호 (예: "01", "02") */
  stepNumber: string
  /** 단계 제목 */
  title: string
  /** 단계 아이콘 */
  icon: React.ReactNode
}

export interface ProcessStepsProps {
  /** 절차 단계 배열 */
  steps: ProcessStep[]
  /** 추가 클래스명 */
  className?: string
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps, className = '' }) => {
  return (
    <div className={`${styles.processSteps} ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <div className={styles.stepIcon}>{step.icon}</div>
          <div className={styles.stepNumber}>STEP.{step.stepNumber}</div>
          <div className={styles.stepTitle}>{step.title}</div>
        </div>
      ))}
    </div>
  )
}
