'use client'

import React, { useRef } from 'react'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './DepartmentSidebar.module.scss'

export interface Department {
  id: string
  name: string
  initial: string // 한글 초성 (ㄱ, ㄴ, ㄷ, ...)
}

export interface DepartmentSidebarProps {
  departments: Department[]
  selectedDepartmentId?: string
  onDepartmentSelect: (departmentId: string) => void
  onAllSelect?: () => void
  loading?: boolean
  className?: string
  height?: number | string
}

// 한글 초성 배열
const INITIALS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

export const DepartmentSidebar: React.FC<DepartmentSidebarProps> = ({
  departments,
  selectedDepartmentId,
  onDepartmentSelect,
  onAllSelect,
  loading = false,
  className = '',
  height
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

  // 진료과가 있는 초성만 필터링 (진료과 목록 표시용)
  const initialsWithDepts = React.useMemo(
    () => INITIALS.filter(i => (groupedDepartments[i]?.length ?? 0) > 0),
    [groupedDepartments]
  )

  const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId)

  const sidebarStyle = React.useMemo(() => {
    if (height === undefined) return {}
    return {
      height: typeof height === 'number' ? `${height}px` : height
    }
  }, [height])

  return (
    <div className={`${styles.sidebar} ${className}`} style={sidebarStyle}>
      <header className={styles.header}>
        <span className={styles.title}>진료과 목록</span>
        <span className={styles.titleColon}>:</span>
        <span className={styles.titleHighlight}>{selectedDepartment ? selectedDepartment.name : '전체'}</span>
      </header>

      <div className={styles.body}>
        <aside className={styles.initialNav}>
          {onAllSelect && (
            <button
              type='button'
              className={`${styles.initialButton} ${styles.allButton} ${!selectedDepartmentId ? styles.active : ''}`}
              onClick={onAllSelect}
            >
              ALL
            </button>
          )}
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
                  const el = groupRefs.current[initial]
                  if (el && listRef.current) {
                    listRef.current.scrollTo({ top: el.offsetTop - listRef.current.offsetTop, behavior: 'smooth' })
                  }
                }}
                disabled={!hasDepts}
                aria-label={`${initial}로 이동`}
              >
                {initial}
              </button>
            )
          })}
        </aside>

        <div ref={listRef} className={styles.departmentList}>
          {loading ? (
            <div className={styles.skeletonWrap}>
              <Skeleton width='100%' height={32} variant='rounded' count={8} gap={12} />
            </div>
          ) : (
            initialsWithDepts.map(initial => {
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
                  <div className={styles.initialBar}>{initial}</div>
                  <div className={styles.departments}>
                    {depts.map(dept => (
                      <button
                        key={dept.id}
                        type='button'
                        className={`${styles.departmentButton} ${selectedDepartmentId === dept.id ? styles.active : ''}`}
                        onClick={() => onDepartmentSelect(dept.id)}
                      >
                        {dept.name}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
