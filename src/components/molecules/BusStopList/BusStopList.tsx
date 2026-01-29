'use client'

import React from 'react'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { RouteChip } from '@/components/atoms/RouteChip/RouteChip'
import type { BusStop } from '@/types/hospital'
import styles from './BusStopList.module.scss'

export interface BusStopListProps {
  /** 버스 정류장 목록 */
  stops: BusStop[]
  /** 추가 클래스명 */
  className?: string
}

export const BusStopList: React.FC<BusStopListProps> = ({ stops, className = '' }) => {
  return (
    <div className={className}>
      {stops.map((stop, stopIndex) => (
        <div key={stopIndex} className={styles.busStop}>
          <ProcedureList label={stop.name} items={[]} />
          <div
            className={`${styles.busDirections} ${stop.directions.length === 1 ? styles.busDirectionsSingle : ''}`}
          >
            {stop.directions.map((direction, dirIndex) => (
              <div key={dirIndex} className={styles.busDirection}>
                {direction.label && <div className={styles.busDirectionLabel}>{direction.label}</div>}
                <div className={styles.busRoutes}>
                  {direction.routes.map((route, routeIndex) => (
                    <RouteChip key={routeIndex} variant={route.type} size='small'>
                      {route.number}
                    </RouteChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
