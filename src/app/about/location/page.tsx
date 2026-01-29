'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { NaverLogo } from '@/components/icons/NaverLogo'
import { DaumLogo } from '@/components/icons/DaumLogo'
import { GoogleLogo } from '@/components/icons/GoogleLogo'
import { ServiceTitleIcon } from '@/components/icons/ServiceTitleIcon'
import styles from './page.module.scss'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'

export default function LocationPage() {
  const { pageContent, hospital } = useHospital()
  const locationInfo = pageContent?.aboutLocation

  // 확장/축소 상태
  const [expandedSections, setExpandedSections] = useState({
    subway: true,
    bus: true,
    airport: true
  })

  const toggleSection = (section: 'subway' | 'bus' | 'airport') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

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
          {locationInfo.subway && (
            <section className={styles.transportSection}>
              <button
                type='button'
                className={styles.transportHeader}
                onClick={() => toggleSection('subway')}
                aria-expanded={expandedSections.subway}
              >
                <div className={styles.transportHeaderLeft}>
                  <ServiceTitleIcon className={styles.transportIcon} />
                  <h2 className={styles.transportTitle}>지하철</h2>
                </div>
                {expandedSections.subway ? (
                  <ChevronUpIcon width={24} height={24} stroke='#636363' />
                ) : (
                  <ChevronDownIcon width={24} height={24} fill='#636363' />
                )}
              </button>

              {expandedSections.subway && (
                <div className={styles.transportContent}>
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
                </div>
              )}
            </section>
          )}

          {/* 버스 정보 */}
          {locationInfo.bus && locationInfo.bus.length > 0 && (
            <section className={styles.transportSection}>
              <button
                type='button'
                className={styles.transportHeader}
                onClick={() => toggleSection('bus')}
                aria-expanded={expandedSections.bus}
              >
                <div className={styles.transportHeaderLeft}>
                  <ServiceTitleIcon className={styles.transportIcon} />
                  <h2 className={styles.transportTitle}>버스</h2>
                </div>
                {expandedSections.bus ? (
                  <ChevronUpIcon width={24} height={24} stroke='#636363' />
                ) : (
                  <ChevronDownIcon width={24} height={24} fill='#636363' />
                )}
              </button>

              {expandedSections.bus && (
                <div className={styles.busContent}>
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
                                <span
                                  key={routeIndex}
                                  className={`${styles.busRoute} ${styles[`busRoute${route.type.charAt(0).toUpperCase() + route.type.slice(1)}`]}`}
                                >
                                  {route.number}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 인천공항 정보 */}
          {locationInfo.airport && (
            <section className={styles.transportSection}>
              <button
                type='button'
                className={styles.transportHeader}
                onClick={() => toggleSection('airport')}
                aria-expanded={expandedSections.airport}
              >
                <div className={styles.transportHeaderLeft}>
                  <ServiceTitleIcon className={styles.transportIcon} />
                  <h2 className={styles.transportTitle}>인천공항</h2>
                </div>
                {expandedSections.airport ? (
                  <ChevronUpIcon width={24} height={24} stroke='#636363' />
                ) : (
                  <ChevronDownIcon width={24} height={24} fill='#636363' />
                )}
              </button>

              {expandedSections.airport && (
                <div className={styles.transportContent}>
                  <div className={styles.airportRoute}>
                    {locationInfo.airport.steps.map((step, index) => {
                      // 첫 번째 bus는 파란색, 두 번째 bus는 초록색
                      const busCount = locationInfo.airport.steps
                        .slice(0, index + 1)
                        .filter(s => s.type === 'bus').length
                      const isFirstBus = busCount === 1

                      return (
                        <React.Fragment key={index}>
                          {step.type === 'bus' && (
                            <span
                              className={`${styles.airportStep} ${isFirstBus ? styles.airportBus : styles.airportSubway}`}
                            >
                              {step.label}
                            </span>
                          )}
                          {step.type === 'subway' && (
                            <span className={`${styles.airportStep} ${styles.airportDestination}`}>{step.label}</span>
                          )}
                          {step.type === 'destination' && (
                            <span className={`${styles.airportStep} ${styles.airportDestination}`}>{step.label}</span>
                          )}
                          {index < locationInfo.airport!.steps.length - 1 && (
                            <span className={styles.airportArrow}>→</span>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
