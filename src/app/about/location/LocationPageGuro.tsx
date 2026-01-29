'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'
import { RouteChip } from '@/components/atoms/RouteChip/RouteChip'
import { TransportAccordion } from '@/components/molecules/TransportAccordion/TransportAccordion'
import { MapPlaceholder } from '@/components/molecules/MapPlaceholder/MapPlaceholder'
import { AddressSearchBar } from '@/components/molecules/AddressSearchBar/AddressSearchBar'
import { MapServiceLinks } from '@/components/molecules/MapServiceLinks/MapServiceLinks'
import { PlusIcon24 } from '@/components/icons/PlusIcon24'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { SubwayIcon } from '@/components/icons/SubwayIcon'
import { BusIcon } from '@/components/icons/BusIcon'
import { MapIcon } from '@/components/icons/MapIcon'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'

export function LocationPageGuro() {
  const { pageContent } = useHospital()
  const locationInfo = pageContent?.aboutLocation

  // 노선별 색상 매핑 함수
  const getLineColor = (lines: string): string => {
    if (lines.includes('1, 2호선') || lines.includes('1,2호선')) {
      return '#00a23f' // 초록
    } else if (lines.includes('1호선')) {
      return '#004a85' // 파랑
    } else if (lines.includes('2, 7호선') || lines.includes('2,7호선')) {
      return '#6e7e31' // 올리브
    }
    return '#00a23f' // 기본값
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
            <MapPlaceholder />

            {/* 주소 정보 및 검색 */}
            <AddressSearchBar jibun={locationInfo.address.jibun} road={locationInfo.address.road} />

            {/* 지도 서비스 링크 */}
            <MapServiceLinks
              naver={locationInfo.mapLinks.naver}
              daum={locationInfo.mapLinks.daum}
              google={locationInfo.mapLinks.google}
            />
          </section>

          {/* 자가용 정보 */}
          {locationInfo.car && locationInfo.car.length > 0 && (
            <TransportAccordion title='자가용' defaultExpanded={true}>
              <div className={styles.carDirections}>
                {/* 첫 번째 줄: 4개 버튼 */}
                <div className={styles.carDirectionsRow}>
                  {locationInfo.car.slice(0, 4).map((direction, index) => (
                    <button
                      key={index}
                      type='button'
                      className={`${styles.carDirectionButton} ${direction.isActive ? styles.carDirectionButtonActive : ''}`}
                    >
                      <span>{direction.label}</span>
                      <PlusIcon24 />
                    </button>
                  ))}
                </div>
                {/* 두 번째 줄: 나머지 버튼들 (5개) */}
                {locationInfo.car.length > 4 && (
                  <div className={styles.carDirectionsRow}>
                    {locationInfo.car.slice(4).map((direction, index) => (
                      <button
                        key={index + 4}
                        type='button'
                        className={`${styles.carDirectionButton} ${direction.isActive ? styles.carDirectionButtonActive : ''}`}
                      >
                        <span>{direction.label}</span>
                        <PlusIcon24 />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </TransportAccordion>
          )}

          {/* 셔틀버스 정보 */}
          {locationInfo.shuttle && (
            <TransportAccordion title='셔틀버스' defaultExpanded={true}>
              <div className={styles.shuttleContent}>
                {/* 운행노선 */}
                <div className={styles.shuttleSection}>
                  <ProcedureList label='운행노선' items={[]} />
                  <div className={styles.shuttleRouteMap}>
                    <Image
                      src='/images/Operation_route.png'
                      alt='운행노선'
                      width={1370}
                      height={140}
                      className={styles.shuttleRouteImage}
                    />
                  </div>
                </div>

                {/* 운행시간 */}
                <div className={`${styles.shuttleSection} ${styles.shuttleSectionNoGap}`}>
                  <ProcedureList
                    label='운행시간'
                    items={
                      locationInfo.shuttle?.schedules.map(schedule => ({
                        text: `${schedule.time} (${schedule.interval})${schedule.note ? ` / ${schedule.note}` : ''}`
                      })) || []
                    }
                  />
                  {locationInfo.shuttle?.note && <p className={styles.shuttleNote}>{locationInfo.shuttle.note}</p>}
                </div>

                {/* 탑승장소 */}
                <div className={styles.shuttleSection}>
                  <ProcedureList label='탑승장소' items={[]} />
                  <div className={styles.shuttleBoardingLocations}>
                    {locationInfo.shuttle?.boardingLocations.map((location, index) => (
                      <div key={index} className={styles.shuttleBoardingLocation}>
                        <div className={styles.shuttleBoardingImage}>
                          <Image
                            src={`/images/boarding_location_${index + 1}.png`}
                            alt={location.name}
                            fill
                            className={styles.shuttleBoardingImg}
                            sizes='(max-width: 768px) 100vw, 440px'
                          />
                        </div>
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
                                  {notice.label}
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
              <div className={styles.subwayRoutesContainer}>
                <button type='button' className={styles.subwaySearchButton}>
                  <span className={styles.subwaySearchButtonText}>지하철로 길찾기</span>
                  <SearchIcon width={16} height={16} fill='#ffffff' />
                </button>
                <div className={styles.subwayRoutesGrid}>
                  <div className={styles.subwayRoutesColumn}>
                    {locationInfo.subway.slice(0, 2).map((route, index) => (
                      <div key={index} className={styles.subwayRouteDetail}>
                        <ProcedureList label={`${route.lines} ${route.station}`} items={[]} />
                        <div className={styles.subwayRoutePath}>
                          <div className={styles.subwayRouteStep}>
                            <div
                              className={`${styles.subwayRouteIcon} ${styles[`subwayRouteIcon${route.lines.replace(/[,\s]/g, '')}`]}`}
                            >
                              <SubwayIcon width={40} height={40} fill='black' />
                            </div>
                            <p className={styles.subwayRouteStepName}>{route.station}</p>
                          </div>
                          <div className={styles.subwayRouteArrow}>
                            <ArrowRightIcon width={24} height={60} stroke={getLineColor(route.lines)} />
                          </div>
                          <div className={styles.subwayRouteStep}>
                            <div
                              className={`${styles.subwayRouteIcon} ${styles[`subwayRouteIcon${route.lines.replace(/[,\s]/g, '')}`]}`}
                            >
                              <BusIcon width={40} height={40} fill='black' />
                            </div>
                            <div className={styles.subwayRouteStepInfo}>
                              {route.busInfo &&
                                route.busInfo.map((info, i) => (
                                  <p key={i} className={styles.subwayRouteStepName}>
                                    {info}
                                  </p>
                                ))}
                            </div>
                          </div>
                          <div className={styles.subwayRouteArrow}>
                            <ArrowRightIcon width={24} height={60} stroke={getLineColor(route.lines)} />
                          </div>
                          <div className={styles.subwayRouteStep}>
                            <div
                              className={`${styles.subwayRouteIcon} ${styles[`subwayRouteIcon${route.lines.replace(/[,\s]/g, '')}`]}`}
                            >
                              <MapIcon width={40} height={40} fill='black' />
                            </div>
                            <p className={styles.subwayRouteStepName}>{route.destination}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.subwayRoutesDivider} />
                  <div className={styles.subwayRoutesColumn}>
                    {locationInfo.subway.slice(2).map((route, index) => (
                      <div key={index + 2} className={styles.subwayRouteDetail}>
                        <ProcedureList label={`${route.lines} ${route.station}`} items={[]} />
                        <div className={styles.subwayRoutePath}>
                          <div className={styles.subwayRouteStep}>
                            <div
                              className={`${styles.subwayRouteIcon} ${styles[`subwayRouteIcon${route.lines.replace(/[,\s]/g, '')}`]}`}
                            >
                              <SubwayIcon width={40} height={40} fill='black' />
                            </div>
                            <p className={styles.subwayRouteStepName}>{route.station}</p>
                          </div>
                          <div className={styles.subwayRouteArrow}>
                            <ArrowRightIcon width={24} height={60} stroke={getLineColor(route.lines)} />
                          </div>
                          <div className={styles.subwayRouteStep}>
                            <div
                              className={`${styles.subwayRouteIcon} ${styles[`subwayRouteIcon${route.lines.replace(/[,\s]/g, '')}`]}`}
                            >
                              <BusIcon width={40} height={40} fill='black' />
                            </div>
                            <div className={styles.subwayRouteStepInfo}>
                              {route.busInfo &&
                                route.busInfo.map((info, i) => (
                                  <p key={i} className={styles.subwayRouteStepName}>
                                    {info}
                                  </p>
                                ))}
                            </div>
                          </div>
                          <div className={styles.subwayRouteArrow}>
                            <ArrowRightIcon width={24} height={60} stroke={getLineColor(route.lines)} />
                          </div>
                          <div className={styles.subwayRouteStep}>
                            <div
                              className={`${styles.subwayRouteIcon} ${styles[`subwayRouteIcon${route.lines.replace(/[,\s]/g, '')}`]}`}
                            >
                              <MapIcon width={40} height={40} fill='black' />
                            </div>
                            <p className={styles.subwayRouteStepName}>{route.destination}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TransportAccordion>
          )}

          {/* 버스 정보 */}
          {locationInfo.bus && locationInfo.bus.length > 0 && (
            <TransportAccordion title='버스' defaultExpanded={true} contentBackground='white'>
              <div className={styles.busContent}>
                {locationInfo.bus.map((stop, stopIndex) => (
                  <div key={stopIndex} className={styles.busCategory}>
                    <div className={styles.busCategoryHeader}>
                      <h3 className={styles.busCategoryTitle}>{stop.name}</h3>
                    </div>
                    <div className={styles.busCategoryRoutes}>
                      {stop.directions[0]?.routes.map((route, routeIndex) => (
                        <RouteChip key={routeIndex} variant={route.type} size='small'>
                          {route.number}
                        </RouteChip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                        <div className={`${styles.airportBusTableCell} ${styles.airportBusRouteCell}`}>
                          {bus.route.map((routeText, index) => (
                            <span key={index} className={routeText.highlight ? styles.airportBusHighlight : undefined}>
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
            </TransportAccordion>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
