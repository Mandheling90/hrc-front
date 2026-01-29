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
import { RouteChip } from '@/components/atoms/RouteChip/RouteChip'
import { TransportAccordion } from '@/components/molecules/TransportAccordion/TransportAccordion'

export function LocationPageGuro() {
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

          {/* 자가용 정보 */}
          {locationInfo.car && locationInfo.car.length > 0 && (
            <TransportAccordion title='자가용' defaultExpanded={true}>
              <div className={styles.carDirections}>
                {locationInfo.car.map((direction, index) => (
                  <button
                    key={index}
                    type='button'
                    className={`${styles.carDirectionButton} ${direction.isActive ? styles.carDirectionButtonActive : ''}`}
                  >
                    {direction.label}
                  </button>
                ))}
              </div>
            </TransportAccordion>
          )}

          {/* 셔틀버스 정보 */}
          {locationInfo.shuttle && (
            <TransportAccordion title='셔틀버스' defaultExpanded={true}>
              <div className={styles.shuttleContent}>
                {/* 운행노선 */}
                <div className={styles.shuttleSection}>
                  <h3 className={styles.shuttleSectionTitle}>운행노선</h3>
                  <div className={styles.shuttleRouteMap}>
                    {locationInfo.shuttle?.routes.map((route, index) => (
                      <React.Fragment key={index}>
                        <div className={styles.shuttleRouteStop}>
                          <div className={styles.shuttleRouteStopCircle} />
                          <span className={styles.shuttleRouteStopName}>
                            {route.name}
                            {route.type === 'alighting' && (
                              <span className={styles.shuttleRouteStopNote}>(하차만)</span>
                            )}
                            {route.type === 'both' && <span className={styles.shuttleRouteStopNote}>(승하차)</span>}
                          </span>
                        </div>
                        {index < (locationInfo.shuttle?.routes.length ?? 0) - 1 && (
                          <div className={styles.shuttleRouteLine} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* 운행시간 */}
                <div className={styles.shuttleSection}>
                  <h3 className={styles.shuttleSectionTitle}>운행시간</h3>
                  <div className={styles.shuttleScheduleList}>
                    {locationInfo.shuttle?.schedules.map((schedule, index) => (
                      <div key={index} className={styles.shuttleScheduleItem}>
                        <span className={styles.shuttleScheduleTime}>{schedule.time}</span>
                        <span className={styles.shuttleScheduleInterval}>({schedule.interval})</span>
                        {schedule.note && <span className={styles.shuttleScheduleNote}>/ {schedule.note}</span>}
                      </div>
                    ))}
                    {locationInfo.shuttle?.note && <p className={styles.shuttleNote}>{locationInfo.shuttle.note}</p>}
                  </div>
                </div>

                {/* 탑승장소 */}
                <div className={styles.shuttleSection}>
                  <h3 className={styles.shuttleSectionTitle}>탑승장소</h3>
                  <div className={styles.shuttleBoardingLocations}>
                    {locationInfo.shuttle?.boardingLocations.map((location, index) => (
                      <div key={index} className={styles.shuttleBoardingLocation}>
                        {location.image && (
                          <div className={styles.shuttleBoardingImage}>
                            <Image
                              src={location.image}
                              alt={location.name}
                              fill
                              className={styles.shuttleBoardingImg}
                              sizes='(max-width: 768px) 100vw, 440px'
                            />
                          </div>
                        )}
                        <h4 className={styles.shuttleBoardingName}>{location.name}</h4>
                        {location.description && (
                          <p className={styles.shuttleBoardingDescription}>{location.description}</p>
                        )}
                        {location.notices && location.notices.length > 0 && (
                          <div className={styles.shuttleBoardingNotices}>
                            {location.notices.map((notice, noticeIndex) => (
                              <div key={noticeIndex} className={styles.shuttleBoardingNotice}>
                                <span
                                  className={`${styles.shuttleBoardingNoticeChip} ${
                                    notice.type === 'notice'
                                      ? styles.shuttleBoardingNoticeChipNotice
                                      : styles.shuttleBoardingNoticeChipInfo
                                  }`}
                                >
                                  {notice.type === 'notice' ? '공지' : '안내'}
                                </span>
                                <span className={styles.shuttleBoardingNoticeText}>{notice.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TransportAccordion>
          )}

          {/* 지하철 정보 */}
          {locationInfo.subway && Array.isArray(locationInfo.subway) && (
            <TransportAccordion title='지하철' defaultExpanded={true}>
              <div className={styles.subwayRoutes}>
                <button type='button' className={styles.subwaySearchButton}>
                  <span className={styles.subwaySearchButtonText}>지하철로 길찾기</span>
                  <SearchIcon width={16} height={16} fill='#ffffff' />
                </button>
                {locationInfo.subway.map((route, index) => (
                  <div key={index} className={styles.subwayRouteDetail}>
                    <h3 className={styles.subwayRouteTitle}>
                      {route.lines} {route.station}
                    </h3>
                    <div className={styles.subwayRoutePath}>
                      <div className={styles.subwayRouteStep}>
                        <div className={styles.subwayRouteIcon}>
                          <div className={styles.subwayRouteIconCircle} />
                        </div>
                        <p className={styles.subwayRouteStepName}>{route.station}</p>
                      </div>
                      <div className={styles.subwayRouteArrow}>→</div>
                      <div className={styles.subwayRouteStep}>
                        <div className={styles.subwayRouteIcon}>
                          <div className={styles.subwayRouteIconCircle} />
                        </div>
                        <div className={styles.subwayRouteStepInfo}>
                          {route.busInfo && (
                            <>
                              <p className={styles.subwayRouteStepName}>{route.busInfo.routes.join(', ')}</p>
                              {route.busInfo.description && (
                                <p className={styles.subwayRouteStepDescription}>{route.busInfo.description}</p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className={styles.subwayRouteArrow}>→</div>
                      <div className={styles.subwayRouteStep}>
                        <div className={styles.subwayRouteIcon}>
                          <div className={styles.subwayRouteIconCircle} />
                        </div>
                        <p className={styles.subwayRouteStepName}>{route.destination}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TransportAccordion>
          )}

          {/* 버스 정보 */}
          {locationInfo.bus && locationInfo.bus.length > 0 && (
            <TransportAccordion title='버스' defaultExpanded={true} contentBackground='white'>
              {locationInfo.bus.map((stop, stopIndex) => (
                <div key={stopIndex} className={styles.busStop}>
                  <h3 className={styles.busStopTitle}>{stop.name}</h3>
                  <div className={styles.busRoutes}>
                    {stop.directions[0]?.routes.map((route, routeIndex) => (
                      <RouteChip key={routeIndex} variant={route.type} size='small'>
                        {route.number}
                      </RouteChip>
                    ))}
                  </div>
                </div>
              ))}
            </TransportAccordion>
          )}

          {/* 공항버스 정보 */}
          {locationInfo.airport && Array.isArray(locationInfo.airport) && (
            <TransportAccordion title='공항버스' defaultExpanded={true}>
              <div className={styles.airportBusDetails}>
                {locationInfo.airport.map((bus, index) => (
                  <div key={index} className={styles.airportBusDetail}>
                    <RouteChip variant='deepblue' size='large'>
                      {bus.number}
                    </RouteChip>
                    <div className={styles.airportBusTable}>
                      <div className={styles.airportBusTableRow}>
                        <div className={styles.airportBusTableHeader}>경유지</div>
                        <div className={styles.airportBusTableCell}>{bus.route}</div>
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
            </TransportAccordion>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
