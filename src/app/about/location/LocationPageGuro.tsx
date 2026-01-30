'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'
import { TransportAccordion } from '@/components/molecules/TransportAccordion/TransportAccordion'
import { BusStopList } from '@/components/molecules/BusStopList/BusStopList'
import { AirportBusTable } from '@/components/molecules/AirportBusTable'
import { MapPlaceholder } from '@/components/molecules/MapPlaceholder/MapPlaceholder'
import { AddressSearchBar } from '@/components/molecules/AddressSearchBar/AddressSearchBar'
import { MapServiceLinks } from '@/components/molecules/MapServiceLinks/MapServiceLinks'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { SubwayIcon } from '@/components/icons/SubwayIcon'
import { BusIcon } from '@/components/icons/BusIcon'
import { MapIcon } from '@/components/icons/MapIcon'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { CarDirectionModal } from '@/components/molecules/CarDirectionModal/CarDirectionModal'
import { CarDirectionButtons } from '@/components/molecules/CarDirectionButtons'
import { ShuttleRouteMap } from '@/components/molecules/ShuttleRouteMap'
import type { CarDirection } from '@/types/hospital'

export function LocationPageGuro() {
  const { pageContent } = useHospital()
  const locationInfo = pageContent?.aboutLocation
  const [selectedDirection, setSelectedDirection] = useState<CarDirection | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
              <CarDirectionButtons
                directions={locationInfo.car}
                onDirectionClick={direction => {
                  setSelectedDirection(direction)
                  setIsModalOpen(true)
                }}
              />
            </TransportAccordion>
          )}

          {/* 셔틀버스 정보 */}
          {locationInfo.shuttle && (
            <TransportAccordion title='셔틀버스' defaultExpanded={true}>
              <div className={styles.shuttleContent}>
                {/* 운행노선 */}
                <div className={styles.shuttleSection}>
                  <ProcedureList label='운행노선' items={[]} />
                  <ShuttleRouteMap />
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
                    {/* 첫 번째 탑승장소 (전체 너비) */}
                    {locationInfo.shuttle?.boardingLocations[0] && (
                      <div className={`${styles.shuttleBoardingLocation} ${styles.shuttleBoardingLocationFirst}`}>
                        <div className={styles.shuttleBoardingImage}>
                          <Image
                            src={`/images/boarding_location_1.png`}
                            alt={locationInfo.shuttle.boardingLocations[0].name}
                            fill
                            className={styles.shuttleBoardingImg}
                            sizes='(max-width: 768px) 100vw, 608px'
                          />
                        </div>
                        <h4 className={styles.shuttleBoardingName}>{locationInfo.shuttle.boardingLocations[0].name}</h4>
                      </div>
                    )}
                    {/* 나머지 탑승장소 (2열 배치) */}
                    {locationInfo.shuttle?.boardingLocations && locationInfo.shuttle.boardingLocations.length > 1 && (
                      <div className={styles.shuttleBoardingLocationRow}>
                        {locationInfo.shuttle.boardingLocations.slice(1).map((location, index) => (
                          <div key={index + 1} className={styles.shuttleBoardingLocation}>
                            <div className={styles.shuttleBoardingImage}>
                              <Image
                                src={`/images/boarding_location_${index + 2}.png`}
                                alt={location.name}
                                fill
                                className={styles.shuttleBoardingImg}
                                sizes='(max-width: 768px) 100vw, 300px'
                              />
                            </div>
                            <div className={styles.shuttleBoardingInfo}>
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
                          </div>
                        ))}
                      </div>
                    )}
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
              <BusStopList stops={locationInfo.bus} />
            </TransportAccordion>
          )}

          {/* 공항버스 정보 */}
          {locationInfo.airport && Array.isArray(locationInfo.airport) && (
            <TransportAccordion title='공항버스' defaultExpanded={true}>
              <AirportBusTable buses={locationInfo.airport} />
            </TransportAccordion>
          )}
        </div>
      </main>
      <Footer />

      {/* 자가용 방면 팝업 */}
      {selectedDirection && selectedDirection.routes && (
        <CarDirectionModal
          isOpen={isModalOpen}
          title={selectedDirection.label}
          routes={selectedDirection.routes}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedDirection(null)
          }}
          closeOnBackdropClick={true}
        />
      )}
    </div>
  )
}
