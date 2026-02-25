'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import styles from './page.module.scss'
import { TransportAccordion } from '@/components/molecules/TransportAccordion/TransportAccordion'
import { KakaoMap } from '@/components/molecules/KakaoMap/KakaoMap'
import { AddressSearchBar } from '@/components/molecules/AddressSearchBar/AddressSearchBar'
import { MapServiceLinks } from '@/components/molecules/MapServiceLinks/MapServiceLinks'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { BusStopList } from '@/components/molecules/BusStopList/BusStopList'
import { FloorMapAnsan } from '@/components/molecules/FloorMapAnsan'
import { SubwayInfoAnsan } from '@/components/molecules/SubwayInfoAnsan'
import { AirportBusTableAnsan } from '@/components/molecules/AirportBusTableAnsan'
import type { SubwayRouteDetail } from '@/types/hospital'

export function LocationPageAnsan() {
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

          {/* 진료협력센터 섹션 */}
          {locationInfo.medicalCenter && (
            <TransportAccordion title='진료협력센터' defaultExpanded={true}>
              <div className={styles.medicalCenterContent}>
                <FloorMapAnsan
                  address={`(15355) ${locationInfo.medicalCenter.address} (에스컬레이터 옆)`}
                  phone={locationInfo.medicalCenter.phone}
                  imageSrc={locationInfo.medicalCenter.floorMapImage}
                />
              </div>
            </TransportAccordion>
          )}

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
          {locationInfo.subway && Array.isArray(locationInfo.subway) && (
            <TransportAccordion title='지하철' defaultExpanded={true}>
              <SubwayInfoAnsan subwayInfo={locationInfo.subway as SubwayRouteDetail[]} />
            </TransportAccordion>
          )}

          {/* 버스 정보 */}
          {locationInfo.bus && locationInfo.bus.length > 0 && (
            <TransportAccordion title='버스' defaultExpanded={true} contentBackground='white'>
              <BusStopList stops={locationInfo.bus} />
            </TransportAccordion>
          )}

          {/* 공항버스 정보 */}
          {locationInfo.ansanAirport && locationInfo.ansanAirport.length > 0 && (
            <TransportAccordion title='공항버스' defaultExpanded={true}>
              <div className={styles.ansanAirportContent}>
                {locationInfo.ansanAirport.map((busInfo, index) => (
                  <AirportBusTableAnsan key={index} busInfo={busInfo} />
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
