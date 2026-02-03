'use client'

import React, { useRef, useEffect } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { WeekSelector } from '@/components/molecules/WeekSelector/WeekSelector'
import { ScheduleTitle } from '@/components/molecules/ScheduleTitle/ScheduleTitle'
import { ScheduleTable, ScheduleSlot } from '@/components/molecules/ScheduleTable/ScheduleTable'
import { EConsultingIcon } from '@/components/icons/EConsultingIcon'
import { DoctorInfoIcon } from '@/components/icons/DoctorInfoIcon'
import { ScrollableBox } from '@/components/atoms/ScrollableBox/ScrollableBox'
import styles from './DepartmentPageTablet.module.scss'

export interface Department {
  id: string
  name: string
  initial: string
}

export interface Doctor {
  id: string
  name: string
  department: string
  imageUrl?: string
  specialties: string[]
  schedule: ScheduleSlot[]
  hasEConsulting: boolean
}

export interface DepartmentPageTabletProps {
  departments: Department[]
  doctors: Doctor[]
  selectedDepartmentId?: string
  onDepartmentSelect: (departmentId: string) => void
  onAllSelect: () => void
  currentWeek: Date
  weekDates: { startDate: Date; endDate: Date }
  onPreviousWeek: () => void
  onNextWeek: () => void
  onEConsultingClick: (doctorId: string) => void
  onDoctorInfoClick: (doctorId: string) => void
}

// 한글 초성 배열
const INITIALS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

export const DepartmentPageTablet: React.FC<DepartmentPageTabletProps> = ({
  departments,
  doctors,
  selectedDepartmentId,
  onDepartmentSelect,
  onAllSelect,
  currentWeek,
  weekDates,
  onPreviousWeek,
  onNextWeek,
  onEConsultingClick,
  onDoctorInfoClick
}) => {
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const listRef = useRef<HTMLDivElement>(null)

  // 초성별로 그룹화 (모든 초성에 대해)
  const groupedDepartments = React.useMemo(() => {
    const groups: Record<string, Department[]> = {}
    INITIALS.forEach(initial => {
      const depts = departments.filter(dept => dept.initial === initial)
      groups[initial] = depts
    })
    return groups
  }, [departments])

  // 진료과가 있는 초성만 필터링 (진료과 버튼 표시용)
  const initialsWithDepts = React.useMemo(
    () => INITIALS.filter(i => (groupedDepartments[i]?.length ?? 0) > 0),
    [groupedDepartments]
  )

  // 첫 번째 진료과 자동 선택
  useEffect(() => {
    if (!selectedDepartmentId && departments.length > 0) {
      onDepartmentSelect(departments[0].id)
    }
  }, [selectedDepartmentId, departments, onDepartmentSelect])

  const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId)

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>진료과 안내</h1>

          <div className={styles.content}>
            {/* 진료과 선택 영역 */}
            <div className={styles.departmentSection}>
              <div className={styles.departmentHeader}>
                <span className={styles.departmentLabel}>진료과 목록</span>
                <span className={styles.departmentSeparator}>:</span>
                <span className={styles.departmentName}>{selectedDepartment ? selectedDepartment.name : '전체'}</span>
              </div>

              {/* 초성 버튼들 */}
              <div className={styles.initialButtons}>
                <button
                  type='button'
                  className={`${styles.initialButton} ${!selectedDepartmentId ? styles.active : ''}`}
                  onClick={onAllSelect}
                >
                  ALL
                </button>
                {INITIALS.map(initial => {
                  const hasDepts = (groupedDepartments[initial]?.length ?? 0) > 0
                  const hasActiveDept = groupedDepartments[initial]?.some(dept => dept.id === selectedDepartmentId)
                  return (
                    <button
                      key={initial}
                      type='button'
                      className={`${styles.initialButton} ${hasActiveDept ? styles.active : ''} ${
                        !hasDepts ? styles.disabled : ''
                      }`}
                      onClick={() => {
                        if (hasDepts && groupedDepartments[initial]?.[0]) {
                          onDepartmentSelect(groupedDepartments[initial][0].id)
                        }
                      }}
                      disabled={!hasDepts}
                    >
                      {initial}
                    </button>
                  )
                })}
              </div>

              {/* 진료과 버튼들 */}
              <div className={styles.departmentButtons}>
                {initialsWithDepts.map(initial => {
                  const depts = groupedDepartments[initial]
                  if (!depts?.length) return null

                  return (
                    <div
                      key={initial}
                      ref={el => {
                        groupRefs.current[initial] = el
                      }}
                      className={styles.initialGroup}
                    >
                      {depts.map(dept => (
                        <button
                          key={dept.id}
                          type='button'
                          className={`${styles.departmentButton} ${
                            selectedDepartmentId === dept.id ? styles.active : ''
                          }`}
                          onClick={() => onDepartmentSelect(dept.id)}
                        >
                          {dept.name}
                        </button>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 의료진 일정 영역 */}
            <ScheduleTitle title='진료 일정표 확인' />

            <div className={styles.doctorsSection}>
              <div className={styles.weekSelectorWrapper}>
                <WeekSelector
                  startDate={weekDates.startDate}
                  endDate={weekDates.endDate}
                  onPreviousWeek={onPreviousWeek}
                  onNextWeek={onNextWeek}
                />
              </div>

              <ScrollableBox
                ref={listRef}
                className={styles.doctorsList}
                padding={null}
                hasBorder={false}
                hasBackground={false}
              >
                {doctors.length > 0 ? (
                  doctors.map(doctor => (
                    <div key={doctor.id} className={styles.doctorCard}>
                      <div className={styles.doctorInfo}>
                        <div className={styles.doctorHeader}>
                          <h3 className={styles.doctorName}>{doctor.name}</h3>
                          <span className={styles.doctorDepartment}>{doctor.department}</span>
                        </div>

                        <div className={styles.specialties}>
                          <span className={styles.specialtiesLabel}>전문분야</span>
                          <span className={styles.specialtiesText}>{doctor.specialties.join(', ')}</span>
                        </div>

                        <div className={styles.scheduleTable}>
                          <ScheduleTable schedule={doctor.schedule} />
                        </div>
                      </div>

                      <div className={styles.doctorActions}>
                        {doctor.hasEConsulting && (
                          <button
                            type='button'
                            className={styles.eConsultButton}
                            onClick={() => onEConsultingClick(doctor.id)}
                          >
                            <EConsultingIcon width={48} height={48} fill='white' />
                            <span>e-Consulting 신청</span>
                          </button>
                        )}
                        <button
                          type='button'
                          className={styles.doctorInfoButton}
                          onClick={() => onDoctorInfoClick(doctor.id)}
                        >
                          <DoctorInfoIcon width={48} height={48} stroke='var(--gray-9)' />
                          <span>의료진 소개</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>선택한 진료과의 의료진 정보가 없습니다.</p>
                  </div>
                )}
              </ScrollableBox>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
