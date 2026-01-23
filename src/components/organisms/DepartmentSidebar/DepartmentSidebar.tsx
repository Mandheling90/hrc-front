'use client'

import React from 'react'
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
  className?: string
}

// 한글 초성 배열
const INITIALS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

export const DepartmentSidebar: React.FC<DepartmentSidebarProps> = ({
  departments,
  selectedDepartmentId,
  onDepartmentSelect,
  onAllSelect,
  className = ''
}) => {
  // 초성별로 그룹화
  const groupedDepartments = React.useMemo(() => {
    const groups: Record<string, Department[]> = {}
    
    INITIALS.forEach(initial => {
      groups[initial] = departments.filter(dept => dept.initial === initial)
    })

    return groups
  }, [departments])

  // 선택된 진료과 이름 찾기
  const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId)

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          진료과 목록 : {selectedDepartment ? selectedDepartment.name : '전체'}
        </h2>
      </div>

      {onAllSelect && (
        <button
          type='button'
          className={`${styles.allButton} ${!selectedDepartmentId ? styles.active : ''}`}
          onClick={onAllSelect}
        >
          ALL
        </button>
      )}

      <div className={styles.departmentList}>
        {INITIALS.map(initial => {
          const depts = groupedDepartments[initial]
          if (depts.length === 0) return null

          return (
            <div key={initial} className={styles.initialGroup}>
              <div className={styles.initialLabel}>{initial}</div>
              <div className={styles.departments}>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
