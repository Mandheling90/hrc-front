'use client'

import React from 'react'
import { RouteChip } from '@/components/atoms/RouteChip/RouteChip'
import type { AirportRoute } from '@/types/hospital'
import styles from './AirportRoute.module.scss'

export interface AirportRouteProps {
  /** 인천공항 경로 정보 */
  route: AirportRoute
  /** 마지막 목적지 텍스트 (기본값: "고대병원하차") */
  finalDestination?: string
  /** 추가 클래스명 */
  className?: string
}

export const AirportRoute: React.FC<AirportRouteProps> = ({
  route,
  finalDestination = '고대병원하차',
  className = ''
}) => {
  // 경로 그룹화: route와 destination을 쌍으로 묶기
  const groupedSteps: Array<{
    route?: { type: 'bus' | 'subway'; label: string }
    destination?: string
    isFinal?: boolean
  }> = []

  let currentRoute: { type: 'bus' | 'subway'; label: string } | null = null
  let busCount = 0

  for (let i = 0; i < route.steps.length; i++) {
    const step = route.steps[i]
    const nextStep = route.steps[i + 1]

    if (step.type === 'bus' || step.type === 'subway') {
      // 버스/지하철 노선인 경우
      if (step.type === 'bus') {
        busCount++
      }

      // 다음 step이 지하철이고 현재가 버스인 경우, 지하철을 destination으로 사용
      if (step.type === 'bus' && nextStep?.type === 'subway') {
        currentRoute = { type: step.type, label: step.label }
        // 다음 루프에서 지하철을 destination으로 처리
        continue
      }

      // 다음 step이 destination인 경우
      if (nextStep?.type === 'destination') {
        groupedSteps.push({
          route: { type: step.type, label: step.label },
          destination: nextStep.label
        })
        i++ // destination step 건너뛰기
      } else {
        // destination이 없는 경우 route만 저장
        currentRoute = { type: step.type, label: step.label }
      }
    } else if (step.type === 'destination') {
      // destination만 있는 경우 (마지막 목적지)
      if (currentRoute) {
        // 이전에 저장된 route와 함께 묶기
        groupedSteps.push({
          route: currentRoute,
          destination: step.label
        })
        currentRoute = null
      } else {
        // route 없이 destination만 있는 경우
        groupedSteps.push({
          destination: step.label,
          isFinal: true
        })
      }
    }
  }

  // 마지막에 남은 route 처리
  if (currentRoute) {
    groupedSteps.push({ route: currentRoute })
  }

  // 마지막 목적지가 없으면 finalDestination 추가
  if (!groupedSteps.some(step => step.isFinal)) {
    groupedSteps.push({
      destination: finalDestination,
      isFinal: true
    })
  }

  return (
    <div className={`${styles.airportRoute} ${className}`}>
      {groupedSteps.map((group, groupIndex) => {
        // 첫 번째 버스는 deepblue, 나머지는 green
        const routeVariant: 'deepblue' | 'green' =
          group.route?.type === 'bus' && busCount > 0 && groupIndex === 0 ? 'deepblue' : 'green'

        return (
          <React.Fragment key={groupIndex}>
            {group.route && (
              <div className={styles.airportStepGroup}>
                <RouteChip variant={routeVariant}>{group.route.label}</RouteChip>
                {group.destination && (
                  <span className={styles.airportDestinationText}>{group.destination}</span>
                )}
              </div>
            )}
            {!group.route && group.destination && (
              <span className={styles.airportFinalDestination}>{group.destination}</span>
            )}
            {groupIndex < groupedSteps.length - 1 && <span className={styles.airportArrow}>→</span>}
          </React.Fragment>
        )
      })}
    </div>
  )
}
