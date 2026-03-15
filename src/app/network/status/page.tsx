'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
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
import { useHospital } from '@/hooks'

// 임시 데이터 타입
interface ClinicData {
  id: string
  name: string
  type: 'hospital' | 'clinic'
  address: string
  phone: string
  fax: string
  latitude: number
  longitude: number
}

// 임시 데이터
const mockClinics: ClinicData[] = [
  {
    id: '1',
    name: '서울송도병원',
    type: 'hospital',
    address: '서울특별시 영등포구 경인로 767(문래동3가)',
    phone: '02-6950-4114',
    fax: '02-6950-4118',
    latitude: 37.5170,
    longitude: 126.8946
  },
  {
    id: '2',
    name: '서울송도의원',
    type: 'clinic',
    address: '서울특별시 중구 다산로 78(신당동)',
    phone: '02-2231-0900',
    fax: '02-2231-0931',
    latitude: 37.5575,
    longitude: 127.0073
  },
  {
    id: '3',
    name: '서울숭인병원',
    type: 'hospital',
    address: '서울특별시 종로구 종로 386',
    phone: '02-737-7582',
    fax: '02-737-7541',
    latitude: 37.5759,
    longitude: 127.0181
  },
  {
    id: '4',
    name: '서울스마트요양병원',
    type: 'hospital',
    address: '서울특별시 양천구 중앙로 181(신정동) 복합메디컬타운 8F',
    phone: '02-2135-7601',
    fax: '02-2135-7622',
    latitude: 37.5172,
    longitude: 126.8561
  },
  {
    id: '5',
    name: '서울강남의원',
    type: 'clinic',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    fax: '02-1234-5679',
    latitude: 37.5000,
    longitude: 127.0365
  },
  {
    id: '6',
    name: '서울강북병원',
    type: 'hospital',
    address: '서울특별시 강북구 도봉로 456',
    phone: '02-2345-6789',
    fax: '02-2345-6790',
    latitude: 37.6397,
    longitude: 127.0255
  },
  {
    id: '7',
    name: '서울서초의원',
    type: 'clinic',
    address: '서울특별시 서초구 서초대로 789',
    phone: '02-3456-7890',
    fax: '02-3456-7891',
    latitude: 37.4837,
    longitude: 127.0074
  },
  {
    id: '8',
    name: '서울마포병원',
    type: 'hospital',
    address: '서울특별시 마포구 홍대입구로 321',
    phone: '02-4567-8901',
    fax: '02-4567-8902',
    latitude: 37.5568,
    longitude: 126.9237
  }
]

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
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedHospitalType, setSelectedHospitalType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedClinicId, setSelectedClinicId] = useState<string>(mockClinics[0]?.id || '')
  const itemsPerPage = 4

  const hospitalTypeOptions = useMemo(
    () => hospitalTypeOptionsByHospital[hospitalId] ?? hospitalTypeOptionsByHospital.anam,
    [hospitalId]
  )

  const selectedClinic = mockClinics.find(c => c.id === selectedClinicId)

  // 카카오맵 관련
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markerRef = useRef<unknown>(null)
  const overlayRef = useRef<unknown>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // 카카오맵 SDK 로드
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY
    if (!apiKey) return

    if (window.kakao && window.kakao.maps) {
      setMapLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
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

    return () => {
      markerRef.current = null
      overlayRef.current = null
    }
  }, [mapLoaded])

  // 선택된 병원 변경 시 마커 + CustomOverlay 표시
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !selectedClinic) return

    const { kakao } = window
    const map = mapInstanceRef.current as {
      setCenter: (pos: unknown) => void
      panTo: (pos: unknown) => void
    }
    const position = new kakao.maps.LatLng(selectedClinic.latitude, selectedClinic.longitude)

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
  }, [mapLoaded, selectedClinicId, selectedClinic])

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return [
      { label: '', href: '/', icon: null },
      { label: 'network', href: '/network', icon: null },
      { label: 'status', href: '/network/status', icon: null }
    ]
  }, [])

  // 필터링된 데이터
  const filteredClinics = useMemo(() => {
    return mockClinics.filter(clinic => {
      // 지역 필터 (임시로 모든 데이터 통과)
      if (selectedRegion !== 'all') {
        // 실제로는 지역 정보로 필터링
      }

      // 병원 유형 필터 (임시로 모든 데이터 통과)
      if (selectedHospitalType !== 'all') {
        // 실제로는 병원 유형으로 필터링
      }

      // 검색어 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          clinic.name.toLowerCase().includes(query) ||
          clinic.address.toLowerCase().includes(query) ||
          clinic.phone.includes(query)
        )
      }

      return true
    })
  }, [selectedRegion, selectedHospitalType, searchQuery])

  // 페이지네이션된 데이터
  const paginatedClinics = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredClinics.slice(startIndex, endIndex)
  }, [filteredClinics, currentPage])

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredClinics.length / itemsPerPage)

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  // 지도 버튼 클릭 핸들러
  const handleMapClick = (clinicId: string) => {
    setSelectedClinicId(clinicId)
    // TODO: 지도 표시 또는 지도 페이지로 이동
    console.log('지도 보기:', clinicId)
  }

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = (clinicId: string) => {
    // TODO: 병의원 홈페이지로 이동
    console.log('홈페이지 보기:', clinicId)
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
                  onChange={value => {
                    setSelectedRegion(value)
                    setCurrentPage(1)
                  }}
                  className={styles.regionSelect}
                />
                <Select
                  options={hospitalTypeOptions}
                  value={selectedHospitalType}
                  onChange={value => {
                    setSelectedHospitalType(value)
                    setCurrentPage(1)
                  }}
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
            {/* 위치 기반 검색 안내 */}

            <InfoNote message='현재 내 위치에서 가장 가까운 병의원이 검색됩니다.' />

            {/* 지도와 카드 영역 */}
            <div className={styles.mapAndListContainer}>
              {/* 지도 영역 */}
              <div className={styles.mapContainer}>
                <div ref={mapRef} className={styles.map} />
              </div>

              {/* 병의원 리스트 */}
              <div className={styles.clinicListWrapper}>
                <div className={styles.clinicList}>
                  {paginatedClinics.length > 0 ? (
                    <>
                      {paginatedClinics.map((clinic, index) => (
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
                onPageChange={setCurrentPage}
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
