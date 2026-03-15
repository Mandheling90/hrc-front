'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'
import { TransportAccordion } from '@/components/molecules/TransportAccordion/TransportAccordion'
import { KakaoMap } from '@/components/molecules/KakaoMap/KakaoMap'
import { AddressSearchBar } from '@/components/molecules/AddressSearchBar/AddressSearchBar'
import { MapServiceLinks } from '@/components/molecules/MapServiceLinks/MapServiceLinks'
import { BusStopList } from '@/components/molecules/BusStopList/BusStopList'
import { AirportRoute } from '@/components/molecules/AirportRoute/AirportRoute'

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
            <KakaoMap
              latitude={locationInfo.coordinates.latitude}
              longitude={locationInfo.coordinates.longitude}
            />

            {/* 주소 정보 및 검색 */}
            <AddressSearchBar jibun={locationInfo.address.jibun} road={locationInfo.address.road} />

            {/* 지도 서비스 링크 */}
            <MapServiceLinks
              naver={locationInfo.mapLinks.naver}
              daum={locationInfo.mapLinks.daum}
              google={locationInfo.mapLinks.google}
            />
          </section>

          {/* 지하철 정보 */}
          {locationInfo.subway && !Array.isArray(locationInfo.subway) && (
            <TransportAccordion title='지하철' defaultExpanded={true}>
              <div className={styles.subwayContentWrapper}>
                <div className={styles.subwayInfo}>
                  <span className={styles.subwayLine}>{locationInfo.subway.line}</span>
                  <span className={styles.subwayDescription}>{locationInfo.subway.description}</span>
                </div>
                <div className={styles.subwayMapContainer}>
                  <div className={styles.subwayMapImage}>
                    <Image
                      src='/images/about/location/subway_map.png'
                      alt='지하철 노선도'
                      fill
                      className={styles.subwayMapImg}
                      sizes='(max-width: 768px) 100vw, (max-width: 1429px) 100vw, 100vw'
                    />
                  </div>
                  <div className={styles.subwayMapFooter}>
                    <a href='https://map.naver.com/p/subway/1000/-/-/-?c=14139483.8922834,4521084.3550941,15,0,0,0,dh' target='_blank' rel='noopener noreferrer' className={styles.subwaySearchButton}>
                      <span className={styles.subwaySearchButtonText}>지하철로 길찾기</span>
                      <div className={styles.subwaySearchButtonIcon}>
                        <SearchIcon width={16} height={16} fill='#ffffff' />
                      </div>
                    </a>
                    <p className={styles.subwayMapSource}>이미지 출처 : 서울교통공사</p>
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

          {/* 인천공항 정보 */}
          {locationInfo.airport && !Array.isArray(locationInfo.airport) && (
            <TransportAccordion title='인천공항' defaultExpanded={true}>
              <AirportRoute route={locationInfo.airport} />
            </TransportAccordion>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
