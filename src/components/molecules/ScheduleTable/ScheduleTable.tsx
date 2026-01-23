'use client'

import React from 'react'
import styles from './ScheduleTable.module.scss'

export interface ScheduleSlot {
  day: '월' | '화' | '수' | '목' | '금' | '토' | '일'
  period: '오전' | '오후'
  available: boolean
}

export interface ScheduleTableProps {
  schedule: ScheduleSlot[]
  className?: string
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule, className = '' }) => {
  const days = ['월', '화', '수', '목', '금', '토', '일']
  const periods = ['오전', '오후']

  return (
    <div className={`${styles.scheduleTable} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>구분</th>
            {days.map(day => (
              <th key={day} className={styles.headerCell}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map(period => (
            <tr key={period}>
              <td className={styles.periodCell}>{period}</td>
              {days.map(day => {
                const slot = schedule.find(s => s.day === day && s.period === period)
                const isAvailable = slot?.available || false
                return (
                  <td key={`${period}-${day}`} className={styles.slotCell}>
                    {isAvailable && <span className={styles.dot} />}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
