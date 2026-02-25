'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './KakaoMap.module.scss'

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void
        LatLng: new (lat: number, lng: number) => unknown
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => unknown
        Marker: new (options: { map: unknown; position: unknown }) => unknown
      }
    }
  }
}

export interface KakaoMapProps {
  latitude: number
  longitude: number
  level?: number
  markerTitle?: string
  className?: string
}

export const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude, level = 3, className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY

    if (!apiKey) {
      setHasError(true)
      return
    }

    // 이미 SDK가 로드되어 있는 경우
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true)
      })
    }

    script.onerror = () => {
      setHasError(true)
    }

    document.head.appendChild(script)

    return () => {
      // 다른 인스턴스가 사용할 수 있으므로 스크립트는 제거하지 않음
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    const { kakao } = window
    const center = new kakao.maps.LatLng(latitude, longitude)
    const map = new kakao.maps.Map(mapRef.current, {
      center,
      level
    })

    new kakao.maps.Marker({
      map,
      position: center
    })
  }, [isLoaded, latitude, longitude, level])

  if (hasError) {
    return (
      <div className={`${styles.mapContainer} ${className}`}>
        <div className={styles.fallback}>
          <p>지도 영역</p>
          <p className={styles.fallbackNote}>카카오맵 API 키 설정이 필요합니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.mapContainer} ${className}`}>
      {!isLoaded && (
        <div className={styles.fallback}>
          <p>지도를 불러오는 중...</p>
        </div>
      )}
      <div ref={mapRef} className={styles.map} style={{ display: isLoaded ? 'block' : 'none' }} />
    </div>
  )
}
