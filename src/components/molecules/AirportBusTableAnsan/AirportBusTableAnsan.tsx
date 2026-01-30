'use client'

import React from 'react'
import styles from './AirportBusTableAnsan.module.scss'
import type { AnsanAirportBusInfo } from '@/types/hospital'

interface AirportBusTableAnsanProps {
  busInfo: AnsanAirportBusInfo
}

export function AirportBusTableAnsan({ busInfo }: AirportBusTableAnsanProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{busInfo.title}</h3>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.header}>정차장 번호</div>
          <div className={styles.cell}>{busInfo.stopNumber}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.header}>경유지</div>
          <div className={styles.cell}>{busInfo.route}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.header}>첫차</div>
          <div className={styles.cell}>{busInfo.firstBus}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.header}>막차</div>
          <div className={styles.cell}>{busInfo.lastBus}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.header}>운행간격</div>
          <div className={styles.cell}>{busInfo.interval}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.header}>소요시간</div>
          <div className={styles.cell}>{busInfo.duration}</div>
        </div>
      </div>
    </div>
  )
}
