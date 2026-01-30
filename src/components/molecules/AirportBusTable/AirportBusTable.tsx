'use client'

import React from 'react'
import { RouteChip } from '@/components/atoms/RouteChip/RouteChip'
import type { AirportBusDetail } from '@/types/hospital'
import styles from './AirportBusTable.module.scss'

export interface AirportBusTableProps {
  /** 공항버스 정보 배열 */
  buses: AirportBusDetail[]
  /** 추가 클래스명 */
  className?: string
}

export const AirportBusTable: React.FC<AirportBusTableProps> = ({ buses, className = '' }) => {
  return (
    <div className={`${styles.airportBusDetails} ${className}`}>
      {buses.map((bus, index) => (
        <div key={index} className={styles.airportBusDetail}>
          <RouteChip variant='deepblue' size='large'>
            {bus.number}
          </RouteChip>
          <div className={styles.airportBusTable}>
            <div className={styles.airportBusTableRow}>
              <div className={styles.airportBusTableHeader}>경유지</div>
              <div className={`${styles.airportBusTableCell} ${styles.airportBusRouteCell}`}>
                {bus.route.map((routeText, routeIndex) => (
                  <span key={routeIndex} className={routeText.highlight ? styles.airportBusHighlight : undefined}>
                    {routeText.text}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.airportBusTableRow}>
              <div className={styles.airportBusTableHeader}>운행시간</div>
              <div className={styles.airportBusTableCell}>
                <p>첫차 {bus.firstBus}</p>
                <p>막차 {bus.lastBus}</p>
              </div>
            </div>
            <div className={styles.airportBusTableRow}>
              <div className={styles.airportBusTableHeader}>운행간격(분)</div>
              <div className={styles.airportBusTableCell}>{bus.interval}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
