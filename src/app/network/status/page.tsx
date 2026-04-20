'use client'

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { Select } from '@/components/atoms/Select/Select'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { ClinicCard } from '@/components/molecules/ClinicCard/ClinicCard'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import styles from './page.module.scss'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { useHospital, useSearchCollaboratingHospitals } from '@/hooks'
import { HospitalCode } from '@/graphql/__generated__/types'

interface ClinicData {
  id: string
  name: string
  type: 'hospital' | 'clinic'
  address: string
  baseAddress: string
  phone: string
  fax: string
  website: string
  latitude: number
  longitude: number
}

const HOSPITAL_CODE_MAP: Record<string, HospitalCode> = {
  anam: HospitalCode.Anam,
  guro: HospitalCode.Guro,
  ansan: HospitalCode.Ansan
}

// classificationCode → type 매핑 (의원 계열은 'clinic', 나머지는 'hospital')
// EHR InstitutionType 코드: 50=의원, 51=치과의원, 90=한방/한의원
const CLINIC_CLASSIFICATION_CODES = ['50', '51', '90']
function mapClassificationToType(code?: string): 'hospital' | 'clinic' {
  if (!code) return 'clinic'
  return CLINIC_CLASSIFICATION_CODES.includes(code) ? 'clinic' : 'hospital'
}

// 프론트 Select value → EHR hsptClsfCd (InstitutionType) 매핑
const HOSPITAL_TYPE_CODE_MAP: Record<string, string> = {
  'superior-general': '10', // 상급종합병원
  general: '20', // 종합병원
  hospital: '30', // 병원
  'dental-hospital': '31', // 치과병원
  mental: '32', // 정신병원
  nursing: '40', // 요양병원
  clinic: '50', // 의원
  'dental-clinic': '51', // 치과의원
  'public-health': '60', // 보건기관
  institution: '70', // 기관
  oriental: '90', // 한방 (anam 통합 옵션)
  'oriental-clinic': '90', // 한의원
  'oriental-hospital': '99' // 한방병원
}

// 주소 → 좌표 변환 (카카오 Geocoder)
function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  return new Promise(resolve => {
    if (!window.kakao?.maps?.services) {
      resolve(null)
      return
    }
    const geocoder = new window.kakao.maps.services.Geocoder()
    console.log('[Geocode] 요청 주소:', address)
    geocoder.addressSearch(address, (result, status) => {
      console.log('[Geocode] 응답:', address, status, result)
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) })
      } else {
        resolve(null)
      }
    })
  })
}

// 지역 옵션
const regionOptions = [
  { value: 'all', label: '지역 선택(전체)' },
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' }
]

// 병원별 유형 옵션
const hospitalTypeOptionsByHospital: Record<string, { value: string; label: string }[]> = {
  anam: [
    { value: 'all', label: '병원 유형(전체)' },
    { value: 'superior-general', label: '상급종합병원' },
    { value: 'general', label: '종합병원' },
    { value: 'hospital', label: '병원' },
    { value: 'nursing', label: '요양병원' },
    { value: 'oriental', label: '한방' },
    { value: 'clinic', label: '의원' }
  ],
  ansan: [
    { value: 'all', label: '병원 유형(전체)' },
    { value: 'superior-general', label: '상급종합병원' },
    { value: 'general', label: '종합병원' },
    { value: 'hospital', label: '병원' },
    { value: 'nursing', label: '요양병원' },
    { value: 'mental', label: '정신병원' },
    { value: 'dental-hospital', label: '치과병원' },
    { value: 'oriental-hospital', label: '한방병원' },
    { value: 'clinic', label: '의원' },
    { value: 'dental-clinic', label: '치과의원' },
    { value: 'oriental-clinic', label: '한의원' },
    { value: 'public-health', label: '보건기관' }
  ],
  guro: [
    { value: 'all', label: '병원 유형(전체)' },
    { value: 'superior-general', label: '상급종합병원' },
    { value: 'general', label: '종합병원' },
    { value: 'hospital', label: '병원' },
    { value: 'nursing', label: '요양병원' },
    { value: 'oriental-hospital', label: '한방병원' },
    { value: 'dental-hospital', label: '치과병원' },
    { value: 'mental', label: '정신병원' },
    { value: 'public-health', label: '보건기관' },
    { value: 'institution', label: '기관' },
    { value: 'clinic', label: '의원' },
    { value: 'dental-clinic', label: '치과의원' },
    { value: 'oriental-clinic', label: '한의원' }
  ]
}

export default function ClinicStatusPage() {
  const { hospitalId } = useHospital()
  const { searchHospitals, loading: apiLoading } = useSearchCollaboratingHospitals()
  const [clinics, setClinics] = useState<ClinicData[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedHospitalType, setSelectedHospitalType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedClinicId, setSelectedClinicId] = useState<string>('')
  const [dataLoading, setDataLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  const isLoading = dataLoading || apiLoading
  const itemsPerPage = 4
  const lastFiltersRef = useRef<{ hsptNm?: string; adrsNm?: string; hsptClsfCd?: string }>({})
  const geocodeCacheRef = useRef<Map<string, { lat: number; lng: number }>>(new Map())
  const hospitalTypeOptions = useMemo(
    () => hospitalTypeOptionsByHospital[hospitalId] ?? hospitalTypeOptionsByHospital.anam,
    [hospitalId]
  )

  // API 데이터 로드 + Geocoding
  const fetchClinics = useCallback(async (
    page: number,
    filters: { hsptNm?: string; adrsNm?: string; hsptClsfCd?: string } = {}
  ) => {
    const hospitalCode = HOSPITAL_CODE_MAP[hospitalId] || HospitalCode.Anam
    lastFiltersRef.current = filters
    setDataLoading(true)
    setCurrentPage(page)
    try {
      const result = await searchHospitals({
        hospitalCode,
        ...filters,
        pageCnt: itemsPerPage,
        offset: (page - 1) * itemsPerPage
      })
      if (!result) {
        setClinics([])
        setTotalCount(0)
        return
      }

      const mapped: ClinicData[] = result.hospitals.map((h, idx) => ({
        id: h.id || `hospital-${idx}`,
        name: h.name,
        type: mapClassificationToType(h.classificationCode ?? undefined),
        address: [h.address, h.addressDetail].filter(Boolean).join(' '),
        baseAddress: h.address || '',
        phone: h.phone || '',
        fax: h.faxNumber || '',
        website: h.website || '',
        latitude: 0,
        longitude: 0
      }))

      setClinics(mapped)
      setTotalCount(result.totalCount)
      if (mapped.length > 0) {
        setSelectedClinicId(mapped[0].id)
      } else {
        setSelectedClinicId('')
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      console.error('병원 데이터 조회 실패:', err)
      setClinics([])
      setTotalCount(0)
    } finally {
      setDataLoading(false)
    }
  }, [hospitalId, searchHospitals])


  const selectedClinic = clinics.find(c => c.id === selectedClinicId)

  // 카카오맵 관련
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markerRef = useRef<unknown>(null)
  const overlayRef = useRef<unknown>(null)

  // 카카오맵 SDK 로드
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY
    if (!apiKey) return

    if (window.kakao && window.kakao.maps) {
      setMapLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => setMapLoaded(true))
    }
    document.head.appendChild(script)
  }, [])

  // 지도 초기화
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const { kakao } = window
    const center = new kakao.maps.LatLng(
      selectedClinic?.latitude ?? 37.5665,
      selectedClinic?.longitude ?? 126.978
    )
    const map = new kakao.maps.Map(mapRef.current, { center, level: 4 })
    mapInstanceRef.current = map

    // 컨테이너 크기 변경 감지 → relayout
    const observer = new ResizeObserver(() => {
      (map as { relayout: () => void }).relayout()
    })
    observer.observe(mapRef.current)

    return () => {
      observer.disconnect()
      markerRef.current = null
      overlayRef.current = null
    }
  }, [mapLoaded])

  // 선택된 병원 변경 시 좌표 조회 후 마커 + CustomOverlay 표시
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !selectedClinic) return
    let cancelled = false

    const showMarker = async () => {
      let lat = selectedClinic.latitude
      let lng = selectedClinic.longitude

      // 좌표가 없으면 geocoding
      if (lat === 0 && lng === 0 && selectedClinic.baseAddress) {
        // 캐시 확인
        const cached = geocodeCacheRef.current.get(selectedClinic.baseAddress)
        if (cached) {
          lat = cached.lat
          lng = cached.lng
        } else {
          const coords = await geocodeAddress(selectedClinic.baseAddress)
          if (cancelled) return
          if (coords) {
            lat = coords.lat
            lng = coords.lng
            geocodeCacheRef.current.set(selectedClinic.baseAddress, coords)
          } else {
            return // geocoding 실패 시 마커 표시 안 함
          }
        }
      }

      if (cancelled) return

      const { kakao } = window
      const map = mapInstanceRef.current as {
        setCenter: (pos: unknown) => void
        panTo: (pos: unknown) => void
      }
      const position = new kakao.maps.LatLng(lat, lng)

    // 기존 마커/오버레이 제거
    if (markerRef.current) {
      (markerRef.current as { setMap: (m: unknown) => void }).setMap(null)
    }
    if (overlayRef.current) {
      (overlayRef.current as { setMap: (m: unknown) => void }).setMap(null)
    }

    // 마커 생성
    const marker = new kakao.maps.Marker({ map: mapInstanceRef.current, position })
    markerRef.current = marker

    // CustomOverlay용 DOM 생성
    const mapUrl = `https://map.kakao.com/?q=${encodeURIComponent(selectedClinic.address)}`

    const wrap = document.createElement('div')
    wrap.style.cssText = 'position:relative;'

    wrap.innerHTML = `
      <div style="
        position:relative;
        background:#fff;
        border:1px solid #ccc;
        border-radius:4px;
        box-shadow:0 2px 6px rgba(0,0,0,0.15);
        font-family:'Malgun Gothic','맑은 고딕',sans-serif;
        font-size:12px;
        min-width:280px;
        max-width:340px;
      ">
        <div style="padding:14px 36px 0 16px;">
          <button type="button" data-action="close" style="
            position:absolute;top:10px;right:10px;
            width:20px;height:20px;border:none;background:none;
            cursor:pointer;font-size:16px;color:#888;padding:0;line-height:1;
          ">&times;</button>
          <div style="margin-bottom:6px;">
            <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" style="
              font-size:15px;font-weight:bold;color:#333;text-decoration:none;
              display:inline-flex;align-items:center;gap:4px;
            ">
              ${selectedClinic.name}
              <svg width="14" height="14" viewBox="0 0 16 16" style="flex-shrink:0;">
                <circle cx="8" cy="8" r="8" fill="#3396ff"/>
                <path d="M7 5l3 3-3 3" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
          <div style="color:#666;font-size:12px;line-height:1.8;padding-bottom:10px;border-bottom:1px solid #eee;">
            <div>${selectedClinic.address}</div>
            <div>
              <a href="tel:${selectedClinic.phone}" style="color:#3396ff;text-decoration:none;">${selectedClinic.phone}</a>
              <span style="color:#ccc;margin:0 6px;">|</span>
              <span style="color:#888;">FAX ${selectedClinic.fax}</span>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:flex-end;padding:8px 16px;gap:8px;">
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" style="
            display:inline-flex;align-items:center;gap:4px;
            padding:5px 12px;border:1px solid #ddd;border-radius:3px;
            font-size:11px;color:#555;text-decoration:none;background:#fafafa;
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            카카오맵에서 보기
          </a>
        </div>
      </div>
      <div style="
        position:absolute;left:50%;transform:translateX(-50%);
        width:0;height:0;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-top:10px solid #fff;
        filter:drop-shadow(0 1px 1px rgba(0,0,0,0.1));
      "></div>
    `

    // 닫기 버튼 이벤트
    const closeBtn = wrap.querySelector('[data-action="close"]')
    closeBtn?.addEventListener('click', () => {
      (overlayRef.current as { setMap: (m: unknown) => void })?.setMap(null)
    })

    // CustomOverlay 생성
    const overlay = new kakao.maps.CustomOverlay({
      content: wrap,
      position,
      yAnchor: 1.35,
      xAnchor: 0.5,
    })
    overlay.setMap(mapInstanceRef.current)
    overlayRef.current = overlay

      // 지도 중심 이동
      map.panTo(position)
    }

    showMarker()

    return () => {
      cancelled = true
    }
  }, [mapLoaded, selectedClinicId, selectedClinic])

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return [
      { label: '', href: '/', icon: null },
      { label: 'network', href: '/network', icon: null },
      { label: 'status', href: '/network/status', icon: null }
    ]
  }, [])

  // 전체 페이지 수 (서버 totalCount 기반)
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // 초기 로드 + 지역/유형 필터 변경 시 API 재조회 (페이지 1로 리셋)
  useEffect(() => {
    const options: { adrsNm?: string; hsptClsfCd?: string } = {}
    if (selectedRegion !== 'all') {
      const regionLabel = regionOptions.find(r => r.value === selectedRegion)?.label
      if (regionLabel) options.adrsNm = regionLabel
    }
    if (selectedHospitalType !== 'all') {
      const code = HOSPITAL_TYPE_CODE_MAP[selectedHospitalType]
      if (code) options.hsptClsfCd = code
    }
    fetchClinics(1, options)
  }, [selectedRegion, selectedHospitalType, fetchClinics])

  // 검색 핸들러
  const handleSearch = () => {
    const options: { hsptNm?: string; adrsNm?: string; hsptClsfCd?: string } = {}
    if (searchQuery.trim()) {
      options.hsptNm = searchQuery.trim()
    }
    if (selectedRegion !== 'all') {
      const regionLabel = regionOptions.find(r => r.value === selectedRegion)?.label
      if (regionLabel) options.adrsNm = regionLabel
    }
    if (selectedHospitalType !== 'all') {
      const code = HOSPITAL_TYPE_CODE_MAP[selectedHospitalType]
      if (code) options.hsptClsfCd = code
    }
    fetchClinics(1, options)
  }

  const handlePageChange = (page: number) => {
    fetchClinics(page, lastFiltersRef.current)
  }

  // 지도 버튼 클릭 핸들러
  const handleMapClick = (clinicId: string) => {
    setSelectedClinicId(clinicId)
  }

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = (clinicId: string) => {
    const clinic = clinics.find(c => c.id === clinicId)
    if (clinic?.website) {
      const url = /^https?:\/\//.test(clinic.website) ? clinic.website : `https://${clinic.website}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력병의원 현황</h1>

          {/* 필터 섹션 */}
          <div className={styles.filterSection}>
            <div className={styles.filterRow}>
              <div className={styles.selectGroup}>
                <Select
                  options={regionOptions}
                  value={selectedRegion}
                  onChange={setSelectedRegion}
                  className={styles.regionSelect}
                />
                <Select
                  options={hospitalTypeOptions}
                  value={selectedHospitalType}
                  onChange={setSelectedHospitalType}
                  className={styles.hospitalTypeSelect}
                />
              </div>
              <div className={styles.searchGroup}>
                <div className={styles.searchWrapper}>
                  <Input
                    type='text'
                    placeholder='병원명, 전화번호를 입력해주세요.'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSearch()
                      }
                    }}
                    className={styles.searchInput}
                  />
                  <Button variant='primary' size='small' onClick={handleSearch} className={styles.searchButton}>
                    검색
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 및 병의원 리스트 */}
          <div className={styles.contentSection}>
            {/* 지도와 카드 영역 */}
            <div className={styles.mapAndListContainer}>
              {/* 지도 영역 */}
              <div className={styles.mapContainer}>
                <div ref={mapRef} className={styles.map} />
              </div>

              {/* 병의원 리스트 */}
              <div className={styles.clinicListWrapper}>
                <div className={styles.clinicList}>
                  {isLoading ? (
                    <>
                      {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className={styles.skeletonCard}>
                          <div className={styles.skeletonHeader}>
                            <div className={styles.skeletonNameGroup}>
                              <Skeleton variant='rounded' width={80} height={32} />
                              <Skeleton width={180} height={32} />
                            </div>
                            <div className={styles.skeletonButtonGroup}>
                              <Skeleton variant='circle' width={54} height={54} />
                              <Skeleton variant='circle' width={54} height={54} />
                            </div>
                          </div>
                          <div className={styles.skeletonContent}>
                            <Skeleton width='80%' height={20} />
                            <div className={styles.skeletonPhoneRow}>
                              <Skeleton width={200} height={20} />
                              <Skeleton width={200} height={20} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : clinics.length > 0 ? (
                    <>
                      {clinics.map((clinic, index) => (
                        <ClinicCard
                          key={clinic.id}
                          name={clinic.name}
                          type={clinic.type}
                          address={clinic.address}
                          phone={clinic.phone}
                          fax={clinic.fax}
                          highlighted={selectedClinicId === clinic.id}
                          onMapClick={() => handleMapClick(clinic.id)}
                          onHomeClick={() => handleHomeClick(clinic.id)}
                          showHomeButton={!!clinic.website}
                          onClick={() => setSelectedClinicId(clinic.id)}
                        />
                      ))}
                    </>
                  ) : (
                    <div className={styles.emptyState}>
                      <p>검색 결과가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
