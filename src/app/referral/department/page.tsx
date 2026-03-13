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
import { useMedicalStaff, MedicalStaffItem } from '@/hooks/useMedicalStaff'
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

// API 응답 → 의사 카드 데이터 변환
function mapStaffToDoctor(item: MedicalStaffItem) {
  const specialties = item.bio ? item.bio.split(',').map(s => s.trim()).filter(Boolean) : []
  return {
    id: item.doctorId || '',
    name: item.doctorName || '',
    department: item.departmentName || '',
    imageUrl: item.photoUrl || undefined,
    specialties,
    schedule: [] as ScheduleSlot[],
    hasEConsulting: item.frvsMdcrPsblYn === 'Y' || item.revsMdcrPsblYn === 'Y'
  }
}

export default function DepartmentPage() {
  const { fetchMedicalStaff, staffList, loading: staffLoading } = useMedicalStaff()

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

  // 초기 로드: 전체 자문의 목록 가져오기
  useEffect(() => {
    fetchMedicalStaff()
  }, [fetchMedicalStaff])

  // API 응답에서 진료과 목록 추출
  const departments: Department[] = useMemo(() => {
    const deptMap = new Map<string, string>()
    for (const staff of staffList) {
      if (staff.departmentCode && staff.departmentName) {
        deptMap.set(staff.departmentCode, staff.departmentName)
      }
    }
    return Array.from(deptMap.entries())
      .map(([code, name]) => ({
        id: code,
        name,
        initial: getInitial(name[0])
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  }, [staffList])

  // 첫 진료과 자동 선택
  useEffect(() => {
    if (departments.length > 0 && !selectedDepartmentId) {
      setSelectedDepartmentId(departments[0].id)
    }
  }, [departments, selectedDepartmentId])

  // 선택된 진료과의 의료진 필터링
  const doctors = useMemo(() => {
    if (!selectedDepartmentId) return staffList.map(mapStaffToDoctor)
    return staffList
      .filter(s => s.departmentCode === selectedDepartmentId)
      .map(mapStaffToDoctor)
  }, [staffList, selectedDepartmentId])

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
                loading={staffLoading}
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
                {staffLoading ? (
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
