'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { DepartmentSidebar, Department } from '@/components/organisms/DepartmentSidebar/DepartmentSidebar'
import { WeekSelector } from '@/components/molecules/WeekSelector/WeekSelector'
import { DoctorCard } from '@/components/molecules/DoctorCard/DoctorCard'
import { ScheduleTitle } from '@/components/molecules/ScheduleTitle/ScheduleTitle'
import { SectionContainer } from '@/components/molecules/SectionContainer/SectionContainer'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { useMedicalStaff, MedicalStaffItem, WeeklyScheduleItem } from '@/hooks/useMedicalStaff'
import { DepartmentPageTablet, Department as TabletDepartment, Doctor } from './DepartmentPageTablet'
import styles from './page.module.scss'
import { ScheduleSlot } from '@/components/molecules/ScheduleTable/ScheduleTable'

// 한글 초성 추출 함수
function getInitial(char: string): string {
  if (!char || char.length === 0) return ''
  const code = char.charCodeAt(0)
  // 한글 유니코드 범위: 0xAC00 ~ 0xD7A3
  if (code < 0xac00 || code > 0xd7a3) return ''
  const initialCode = Math.floor((code - 0xac00) / 0x24c)
  const initials = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
  return initials[initialCode] || 'ㅇ' // 기본값은 ㅇ
}

/** Date → 'YYYYMMDD' 포맷 */
function formatYmd(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

// 주간 날짜 계산 함수
function getWeekDates(date: Date): { startDate: Date; endDate: Date } {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) // 월요일 기준
  const startDate = new Date(date)
  startDate.setDate(diff)
  startDate.setHours(0, 0, 0, 0)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 4) // 금요일까지
  endDate.setHours(23, 59, 59, 999)

  return { startDate, endDate }
}

/** 주간 스케줄 AmpmCd → ScheduleSlot 변환 ('Am'=오전, 'Pm'=오후, 'Al'=오전+오후) */
function parseAmpmCd(day: '월' | '화' | '수' | '목' | '금', code: string | null): ScheduleSlot[] {
  if (!code) return []
  const c = code.toLowerCase()
  const slots: ScheduleSlot[] = []
  if (c === 'am' || c === 'al') slots.push({ day, period: '오전', available: true })
  if (c === 'pm' || c === 'al') slots.push({ day, period: '오후', available: true })
  return slots
}

function scheduleItemToSlots(item: WeeklyScheduleItem): ScheduleSlot[] {
  return [
    ...parseAmpmCd('월', item.monAmpmCd),
    ...parseAmpmCd('화', item.tueAmpmCd),
    ...parseAmpmCd('수', item.wedAmpmCd),
    ...parseAmpmCd('목', item.thuAmpmCd),
    ...parseAmpmCd('금', item.friAmpmCd)
  ]
}

// API 응답 → 의사 카드 데이터 변환
function mapStaffToDoctor(item: MedicalStaffItem, scheduleMap: Map<string, ScheduleSlot[]>) {
  const specialties = item.bio ? item.bio.split(',').map(s => s.trim()).filter(Boolean) : []
  return {
    id: item.doctorId || '',
    name: item.doctorName || '',
    department: item.departmentName || '',
    imageUrl: item.photoUrl || undefined,
    specialties,
    schedule: scheduleMap.get(item.doctorId) ?? ([] as ScheduleSlot[]),
    hasEConsulting: item.frvsMdcrPsblYn === 'Y' || item.revsMdcrPsblYn === 'Y'
  }
}

export default function DepartmentPage() {
  const { departmentList, deptLoading, fetchMedicalStaff, staffList, loading: staffLoading, fetchWeeklySchedule, scheduleList, scheduleLoading } = useMedicalStaff()

  // 현재 주간 날짜 상태
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const weekDates = useMemo(() => getWeekDates(currentWeek), [currentWeek])

  // 선택된 진료과 상태
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | undefined>(undefined)

  // 높이 동기화를 위한 refs
  const mainContentRef = useRef<HTMLDivElement>(null)
  const sidebarHeightRef = useRef<number | null>(null)
  const [sidebarHeight, setSidebarHeight] = useState<number | undefined>(undefined)

  // 태블릿/모바일 여부 확인
  const [isTablet, setIsTablet] = useState(false)

  // 진료과 목록 → Department 형태로 변환
  const departments: Department[] = useMemo(() => {
    return departmentList
      .map(dept => ({
        id: dept.departmentCode,
        name: dept.departmentName,
        initial: getInitial(dept.departmentName[0])
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  }, [departmentList])

  // 첫 진료과 자동 선택
  useEffect(() => {
    if (departments.length > 0 && !selectedDepartmentId) {
      setSelectedDepartmentId(departments[0].id)
    }
  }, [departments, selectedDepartmentId])

  // 진료과 선택 시 의료진 목록 + 스케줄 조회
  useEffect(() => {
    if (selectedDepartmentId) {
      fetchMedicalStaff({ mcdpCd: selectedDepartmentId })
      fetchWeeklySchedule(selectedDepartmentId, formatYmd(weekDates.startDate))
    }
  }, [selectedDepartmentId, fetchMedicalStaff, fetchWeeklySchedule, weekDates.startDate])

  // 스케줄 데이터를 doctorId별 Map으로 변환
  const scheduleMap = useMemo(() => {
    const map = new Map<string, ScheduleSlot[]>()
    for (const item of scheduleList) {
      map.set(item.doctorId, scheduleItemToSlots(item))
    }
    return map
  }, [scheduleList])

  // 의료진 리스트 (서버에서 진료과별로 조회됨)
  const doctors = useMemo(() => {
    return staffList.map(item => mapStaffToDoctor(item, scheduleMap))
  }, [staffList, scheduleMap])

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return [
      {
        label: '',
        href: '/',
        icon: <HomeIcon width={16} height={16} fill='#666' />
      },
      {
        label: '진료의뢰',
        href: '/referral'
      },
      {
        label: '진료과 안내',
        icon: <LinkIcon width={16} height={16} fill='#666' />,
        iconAfter: true
      }
    ]
  }, [])

  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeek)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentWeek(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentWeek)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentWeek(newDate)
  }

  const scrollMainContentToTop = () => {
    if (mainContentRef.current) {
      const scrollable = mainContentRef.current.querySelector('[class*="scrollable"]')
      if (scrollable) {
        scrollable.scrollTo({ top: 0 })
      }
      mainContentRef.current.scrollTo({ top: 0 })
    }
  }

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartmentId(departmentId)
    scrollMainContentToTop()
  }

  const handleAllSelect = () => {
    setSelectedDepartmentId(undefined)
    scrollMainContentToTop()
  }

  const handleEConsultingClick = (doctorId: string) => {
    // e-Consulting 신청 로직
    console.log('e-Consulting 신청:', doctorId)
  }

  const handleDoctorInfoClick = (doctorId: string) => {
    // 의료진 소개 로직
    console.log('의료진 소개:', doctorId)
  }

  // 태블릿/모바일용 데이터 변환
  const tabletDepartments: TabletDepartment[] = useMemo(
    () =>
      departments.map(dept => ({
        id: dept.id,
        name: dept.name,
        initial: dept.initial
      })),
    [departments]
  )

  const tabletDoctors: Doctor[] = useMemo(
    () =>
      doctors.map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        department: doctor.department,
        imageUrl: doctor.imageUrl,
        specialties: doctor.specialties,
        schedule: doctor.schedule as ScheduleSlot[],
        hasEConsulting: doctor.hasEConsulting
      })),
    [doctors]
  )

  // 태블릿/모바일 여부 확인 useEffect
  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth <= 1429)
    }

    checkIsTablet()
    window.addEventListener('resize', checkIsTablet)

    return () => {
      window.removeEventListener('resize', checkIsTablet)
    }
  }, [])

  // mainContent 높이를 측정하여 sidebar 높이에 동기화 (데스크탑 전용)
  useEffect(() => {
    if (isTablet) return

    const updateSidebarHeight = () => {
      if (!mainContentRef.current) return

      const mainContentHeight = mainContentRef.current.offsetHeight

      // 높이가 변경된 경우에만 업데이트 (불필요한 리렌더링 방지)
      if (sidebarHeightRef.current !== mainContentHeight) {
        sidebarHeightRef.current = mainContentHeight
        setSidebarHeight(mainContentHeight)
      }
    }

    // 초기 높이 설정
    updateSidebarHeight()

    // ResizeObserver로 동적 높이 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      updateSidebarHeight()
    })

    if (mainContentRef.current) {
      resizeObserver.observe(mainContentRef.current)
    }

    // window resize 이벤트도 감지
    window.addEventListener('resize', updateSidebarHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateSidebarHeight)
    }
  }, [doctors, currentWeek, isTablet]) // doctors나 currentWeek이 변경될 때도 높이 재계산

  // 태블릿/모바일일 때 태블릿 컴포넌트 렌더링
  if (isTablet) {
    return (
      <DepartmentPageTablet
        departments={tabletDepartments}
        doctors={tabletDoctors}
        selectedDepartmentId={selectedDepartmentId}
        onDepartmentSelect={handleDepartmentSelect}
        onAllSelect={handleAllSelect}
        currentWeek={currentWeek}
        weekDates={weekDates}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onEConsultingClick={handleEConsultingClick}
        onDoctorInfoClick={handleDoctorInfoClick}
      />
    )
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>진료과 안내</h1>

          <div className={styles.content}>
            <aside className={styles.sidebar}>
              <DepartmentSidebar
                departments={departments}
                selectedDepartmentId={selectedDepartmentId}
                onDepartmentSelect={handleDepartmentSelect}
                onAllSelect={handleAllSelect}
                loading={deptLoading}
              />
            </aside>

            <div ref={mainContentRef} className={styles.mainContent}>
              <ScheduleTitle title='진료 일정표 확인' />
              <SectionContainer
                header={
                  <WeekSelector
                    startDate={weekDates.startDate}
                    endDate={weekDates.endDate}
                    onPreviousWeek={handlePreviousWeek}
                    onNextWeek={handleNextWeek}
                  />
                }
                scrollable
              >
                {staffLoading || scheduleLoading ? (
                  <Skeleton width='100%' height={160} variant='rounded' count={3} gap={16} />
                ) : doctors.length > 0 ? (
                  doctors.map(doctor => (
                    <DoctorCard
                      key={doctor.id}
                      name={doctor.name}
                      department={doctor.department}
                      imageUrl={doctor.imageUrl}
                      specialties={doctor.specialties}
                      schedule={doctor.schedule as ScheduleSlot[]}
                      hasEConsulting={doctor.hasEConsulting}
                      onEConsultingClick={() => handleEConsultingClick(doctor.id)}
                      onDoctorInfoClick={() => handleDoctorInfoClick(doctor.id)}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>선택한 진료과의 의료진 정보가 없습니다.</p>
                  </div>
                )}
              </SectionContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
