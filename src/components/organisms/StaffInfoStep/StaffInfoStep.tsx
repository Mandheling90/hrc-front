'use client'

import React, { forwardRef, useImperativeHandle, useState, useMemo } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { STAFF_DEPARTMENT_OPTIONS, MEDICAL_DEPARTMENT_OPTIONS } from '@/types/hospital-application'
import { useHospital, useEnums } from '@/hooks'
import type { StaffInfoStepData, StepRef } from '@/types/partner-application'
import styles from './StaffInfoStep.module.scss'

export interface StaffInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
  /** 초기값 (임시저장 불러오기용) */
  defaultValues?: Partial<StaffInfoStepData>
}

// 병원별 의료기관 유형 옵션
const ANAM_INSTITUTION_OPTIONS = [
  ['상급종합병원', '종합병원', '병원'],
  ['요양병원', '한방']
]

const GURO_INSTITUTION_OPTIONS = [
  ['상급종합병원', '종합병원', '병원'],
  ['요양병원', '한방병원', '치과병원'],
  ['정신병원', '보건기관', '기관']
]

const ANSAN_INSTITUTION_OPTIONS = [
  ['상급종합병원', '종합병원', '병원'],
  ['요양병원', '한방병원', '치과병원'],
  ['정신병원', '보건기관']
]

export const StaffInfoStep = forwardRef<StepRef<StaffInfoStepData>, StaffInfoStepProps>(
  ({ currentStep = 3, totalSteps = 8, defaultValues }, ref) => {
    const { isGuro, isAnsan } = useHospital()
    const { getOptions } = useEnums()

    // enum에서 가져온 옵션 (없으면 하드코딩 fallback)
    const staffDeptOptions = useMemo(() => {
      const enumOpts = getOptions('Division')
      return enumOpts.length > 0 ? enumOpts : STAFF_DEPARTMENT_OPTIONS
    }, [getOptions])

    const medicalDeptOptions = useMemo(() => {
      const enumOpts = getOptions('MedicalDepartment')
      return enumOpts.length > 0 ? enumOpts : MEDICAL_DEPARTMENT_OPTIONS
    }, [getOptions])

    const [staffName, setStaffName] = useState(defaultValues?.staffName ?? '')
    const [deptType, setDeptType] = useState<'부서' | '진료과'>(defaultValues?.deptType ?? '부서')
    const [department, setDepartment] = useState(defaultValues?.department ?? '')
    const [position, setPosition] = useState(defaultValues?.position ?? '')
    const [contactNumber, setContactNumber] = useState(defaultValues?.contactNumber ?? '')
    const [mobilePhone, setMobilePhone] = useState(defaultValues?.mobilePhone ?? '')
    const [medicalInstitutionType, setMedicalInstitutionType] = useState(defaultValues?.medicalInstitutionType ?? '상급종합병원')
    const [totalEmployees, setTotalEmployees] = useState(defaultValues?.totalEmployees ?? '')
    const [specialists, setSpecialists] = useState(defaultValues?.specialists ?? '')
    const [nurses, setNurses] = useState(defaultValues?.nurses ?? '')

    useImperativeHandle(ref, () => ({
      getData: () => ({
        staffName,
        deptType,
        department,
        position,
        contactNumber,
        mobilePhone,
        medicalInstitutionType,
        totalEmployees,
        specialists,
        nurses
      }),
      validate: () => {
        const missing: string[] = []
        if (!totalEmployees.trim()) missing.push('총 직원 수')
        if (!specialists.trim()) missing.push('전문의 수')
        if (!nurses.trim()) missing.push('간호사 수')
        if (missing.length > 0) return `다음 필수 항목을 입력해주세요:\n${missing.join(', ')}`
        return null
      }
    }))

    // 병원별 의료기관 유형 옵션 선택
    const institutionOptionRows = useMemo(() => {
      if (isGuro) return GURO_INSTITUTION_OPTIONS
      if (isAnsan) return ANSAN_INSTITUTION_OPTIONS
      return ANAM_INSTITUTION_OPTIONS
    }, [isGuro, isAnsan])

    return (
      <div className={styles.stepContainer}>
        {/* 실무자 정보 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
              <h3 className={styles.formTitle}>실무자 정보</h3>
              <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
            </div>
            <div className={styles.stepIndicator}>
              <span className={styles.stepNumber}>{currentStep}</span>
              <span className={styles.stepSeparator}>/</span>
              <span className={styles.stepTotal}>{totalSteps}</span>
            </div>
          </div>
          <div className={styles.formDivider}></div>

          <div className={styles.formContent}>
            {/* 실무자명 */}
            <FormField
              label='실무자명'
              required
              id='staffName'
              name='staffName'
              type='text'
              placeholder='이름을 입력해주세요.'
              value={staffName}
              onChange={e => setStaffName(e.target.value)}
            />

            {/* 부서/진료과 */}
            <div className={styles.formField}>
              <div className={styles.deptLabelRow}>
                <InputLabel htmlFor='department'>부서/진료과</InputLabel>
                <Radio
                  name='deptType'
                  value={deptType}
                  options={[
                    { value: '부서', label: '부서' },
                    { value: '진료과', label: '진료과' }
                  ]}
                  onChange={val => {
                    setDeptType(val as '부서' | '진료과')
                    setDepartment('')
                  }}
                  className={styles.deptTypeRadio}
                />
              </div>
              <Select
                id='department'
                name='department'
                placeholder='선택'
                value={department}
                onChange={setDepartment}
                options={deptType === '부서' ? staffDeptOptions : medicalDeptOptions}
              />
            </div>

            {/* 직급 */}
            <FormField
              label='직급'
              id='position'
              name='position'
              type='text'
              placeholder='직급명을 입력해주세요.'
              value={position}
              onChange={e => setPosition(e.target.value)}
            />

            {/* 연락처 */}
            <FormField
              label='연락처'
              id='contactNumber'
              name='contactNumber'
              type='tel'
              placeholder='-없이 입력해주세요.'
              value={contactNumber}
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '')
                setContactNumber(filtered)
              }}
            />

            {/* 휴대전화 */}
            <FormField
              label='휴대전화'
              id='mobilePhone'
              name='mobilePhone'
              type='tel'
              placeholder='-없이 입력해주세요.'
              value={mobilePhone}
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '')
                setMobilePhone(filtered)
              }}
            />

          </div>
        </div>

        {/* 의료기관 유형 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
              <h3 className={styles.formTitle}>의료기관 유형</h3>
              <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
            </div>
          </div>
          <div className={styles.formDivider}></div>

          <div className={styles.formContent}>
            <div className={styles.radioGroupContainer}>
              {institutionOptionRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.radioRow}>
                  <Radio
                    name='medicalInstitutionType'
                    value={medicalInstitutionType}
                    options={row.map(value => ({ value, label: value }))}
                    onChange={setMedicalInstitutionType}
                    className={styles.medicalInstitutionRadio}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 인력현황 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
              <h3 className={styles.formTitle}>인력현황</h3>
              <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
            </div>
          </div>
          <div className={styles.formDivider}></div>

          <div className={styles.formContent}>
            {/* 총 직원 수 */}
            <FormField
              label='총 직원 수'
              required
              id='totalEmployees'
              name='totalEmployees'
              type='text'
              placeholder='총 직원 수를 입력해주세요.'
              value={totalEmployees}
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '')
                setTotalEmployees(filtered)
              }}
            />

            {/* 전문의 수 */}
            <FormField
              label='전문의 수'
              required
              id='specialists'
              name='specialists'
              type='text'
              placeholder='전문의 수를 입력해주세요.'
              value={specialists}
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '')
                setSpecialists(filtered)
              }}
            />

            {/* 간호사 수 */}
            <FormField
              label='간호사 수'
              required
              id='nurses'
              name='nurses'
              type='text'
              placeholder='간호사 수를 입력해주세요.'
              value={nurses}
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '')
                setNurses(filtered)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
)
StaffInfoStep.displayName = 'StaffInfoStep'
