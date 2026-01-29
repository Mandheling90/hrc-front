import React from 'react'
import { ProcedureList, ProcedureListItem } from '@/components/molecules/ProcedureList/ProcedureList'
import { FlowArrowIcon } from '@/components/icons/FlowArrowIcon'
import styles from './ProcedureFlow.module.scss'

export interface FlowStep {
  chip: string
  items: ProcedureListItem[]
  stepIcon: React.ReactNode
}

export interface ProcedureFlowProps {
  steps: FlowStep[]
  className?: string
}

export const ProcedureFlow: React.FC<ProcedureFlowProps> = ({ steps, className = '' }) => {
  return (
    <div className={`${styles.flowRow} ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={styles.flowCard}>
            <span className={styles.flowChip}>{step.chip}</span>
            <ProcedureList items={step.items} />
            <div className={styles.flowStepNumber}>{step.stepIcon}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={styles.flowArrow}>
              <FlowArrowIcon />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
