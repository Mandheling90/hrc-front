'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { NaverLogo } from '@/components/icons/NaverLogo'
import { DaumLogo } from '@/components/icons/DaumLogo'
import { GoogleLogo } from '@/components/icons/GoogleLogo'
import styles from './page.module.scss'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { RouteChip } from '@/components/atoms/RouteChip/RouteChip'
import { TransportAccordion } from '@/components/molecules/TransportAccordion/TransportAccordion'

export function LocationPageAnam() {
  const { pageContent } = useHospital()
  const locationInfo = pageContent?.aboutLocation

  // locationInfo가 없으면 빈 화면 반환
  if (!locationInfo) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>오시는 길</h1>

          {/* 지도 영역 */}
          <section className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                <p>지도 영역</p>
                <p className={styles.mapNote}>지도 API 연동 필요</p>
              </div>
            </div>

            {/* 주소 정보 및 검색 */}
            <div className={styles.addressInfoWrapper}>
              <div className={styles.addressInfo}>
                <span className={styles.addressLabel}>주소</span>
                <div className={styles.addressTabGroup}>
                  <div className={styles.addressTab}>
                    <span className={styles.addressTabLabel}>지번</span>
                    <span className={styles.addressTabText}>{locationInfo.address.jibun}</span>
                  </div>
                  <div className={styles.addressTab}>
                    <span className={styles.addressTabLabel}>도로명</span>
                    <span className={styles.addressTabText}>{locationInfo.address.road}</span>
                  </div>
                </div>
              </div>
              <button type='button' className={styles.searchButton} aria-label='길찾기 검색'>
                <span className={styles.searchButtonText}>길찾기</span>
                <SearchIcon width={24} height={24} fill='#ffffff' />
              </button>
            </div>

            {/* 지도 서비스 링크 */}
            <div className={styles.mapLinks}>
              {locationInfo.mapLinks.naver && (
                <a
                  href={locationInfo.mapLinks.naver}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mapLink}
                >
                  <div className={styles.mapLinkLogo}>
                    <NaverLogo width={80} height={24} className={styles.mapLinkLogoImage} />
                  </div>
                  <span className={styles.mapLinkText}>네이버 지도</span>
                </a>
              )}
              {locationInfo.mapLinks.daum && (
                <a
                  href={locationInfo.mapLinks.daum}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mapLink}
                >
                  <div className={styles.mapLinkLogo}>
                    <DaumLogo width={80} height={24} className={styles.mapLinkLogoImage} />
                  </div>
                  <span className={styles.mapLinkText}>다음 지도</span>
                </a>
              )}
              {locationInfo.mapLinks.google && (
                <a
                  href={locationInfo.mapLinks.google}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mapLink}
                >
                  <div className={styles.mapLinkLogo}>
                    <GoogleLogo width={80} height={24} className={styles.mapLinkLogoImage} />
                  </div>
                  <span className={styles.mapLinkText}>구글지도</span>
                </a>
              )}
            </div>
          </section>

          {/* 지하철 정보 */}
          {locationInfo.subway && !Array.isArray(locationInfo.subway) && (
            <TransportAccordion title='지하철' defaultExpanded={true}>
              <div className={styles.subwayInfo}>
                <span className={styles.subwayLine}>{locationInfo.subway.line}</span>
                <span className={styles.subwayDescription}>{locationInfo.subway.description}</span>
              </div>
              <div className={styles.subwayMapContainer}>
                <div className={styles.subwayMapImage}>
                  <Image
                    src='/images/subway_map.png'
                    alt='지하철 노선도'
                    fill
                    className={styles.subwayMapImg}
                    sizes='(max-width: 768px) 100vw, (max-width: 1429px) 100vw, 100vw'
                  />
                </div>
                <div className={styles.subwayMapFooter}>
                  <button type='button' className={styles.subwaySearchButton}>
                    <span className={styles.subwaySearchButtonText}>지하철로 길찾기</span>
                    <SearchIcon width={20} height={20} fill='#ffffff' />
                  </button>
                  <p className={styles.subwayMapSource}>이미지 출처 : 서울교통공사</p>
                </div>
              </div>
            </TransportAccordion>
          )}

          {/* 버스 정보 */}
          {locationInfo.bus && locationInfo.bus.length > 0 && (
            <TransportAccordion title='버스' defaultExpanded={true} contentBackground='white'>
              {locationInfo.bus.map((stop, stopIndex) => (
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
            </TransportAccordion>
          )}

          {/* 인천공항 정보 */}
          {locationInfo.airport && !Array.isArray(locationInfo.airport) && (
            <TransportAccordion title='인천공항' defaultExpanded={true}>
              {(() => {
                const airport = locationInfo.airport as {
                  steps: Array<{ type: 'bus' | 'subway' | 'destination'; label: string }>
                }
                // 버스/지하철 노선과 목적지를 그룹화
                const groupedSteps: Array<{
                  route?: { type: 'bus' | 'subway'; label: string }
                  destination?: string
                  isFinal?: boolean
                }> = []

                let currentRoute: { type: 'bus' | 'subway'; label: string } | null = null
                let busIndex = 0
                let pendingSubwayLabel: string | null = null

                airport.steps.forEach(step => {
                  if (step.type === 'bus') {
                    busIndex++
                    // 이전에 처리되지 않은 route가 있으면 먼저 처리
                    if (currentRoute && pendingSubwayLabel) {
                      groupedSteps.push({
                        route: currentRoute,
                        destination: pendingSubwayLabel
                      })
                      currentRoute = null
                      pendingSubwayLabel = null
                    }
                    currentRoute = { type: step.type, label: step.label }
                  } else if (step.type === 'subway') {
                    // bus 다음에 subway가 오는 경우, subway의 label을 destination으로 사용
                    if (currentRoute && currentRoute.type === 'bus') {
                      pendingSubwayLabel = step.label
                    } else {
                      currentRoute = { type: step.type, label: step.label }
                    }
                  } else if (step.type === 'destination') {
                    if (currentRoute) {
                      // 버스/지하철 노선과 목적지가 함께 있는 경우
                      if (pendingSubwayLabel) {
                        // bus + subway 조합인 경우, subway label을 destination으로 사용
                        groupedSteps.push({
                          route: currentRoute,
                          destination: pendingSubwayLabel
                        })
                        pendingSubwayLabel = null
                      } else {
                        groupedSteps.push({
                          route: currentRoute,
                          destination: step.label
                        })
                      }
                      currentRoute = null
                    } else {
                      // 목적지만 있는 경우 (마지막 목적지)
                      groupedSteps.push({
                        destination: step.label,
                        isFinal: true
                      })
                    }
                  }
                })

                // 마지막에 남은 route가 있으면 처리
                if (currentRoute) {
                  if (pendingSubwayLabel) {
                    groupedSteps.push({
                      route: currentRoute,
                      destination: pendingSubwayLabel
                    })
                  } else {
                    groupedSteps.push({
                      route: currentRoute
                    })
                  }
                }

                return (
                  <div className={styles.airportRoute}>
                    {groupedSteps.map((group, groupIndex) => {
                      let routeVariant: 'deepblue' | 'green' = 'green'
                      let isFirstBus = false

                      if (group.route) {
                        if (group.route.type === 'bus') {
                          // 첫 번째 버스는 deepblue, 두 번째 버스는 초록색
                          isFirstBus = busIndex === 1 || groupIndex === 0
                          routeVariant = isFirstBus ? 'deepblue' : 'green'
                        } else {
                          // 지하철은 초록색
                          routeVariant = 'green'
                        }
                      }

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
              })()}
            </TransportAccordion>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
