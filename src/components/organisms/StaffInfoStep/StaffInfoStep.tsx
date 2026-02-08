'use client'

import React, { useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { STAFF_DEPARTMENT_OPTIONS, MEDICAL_DEPARTMENT_OPTIONS } from '@/types/hospital-application'
import styles from './StaffInfoStep.module.scss'

export interface StaffInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
}

export const StaffInfoStep: React.FC<StaffInfoStepProps> = ({ currentStep = 3, totalSteps = 8 }) => {
  const [staffName, setStaffName] = useState('')
  const [deptType, setDeptType] = useState<'부서' | '진료과'>('부서')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [medicalInstitutionType, setMedicalInstitutionType] = useState('')
  const [totalEmployees, setTotalEmployees] = useState('')
  const [specialists, setSpecialists] = useState('')
  const [nurses, setNurses] = useState('')

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
            id='staffName'
            name='staffName'
            type='text'
            placeholder='이름을 입력해주세요.'
            value={staffName}
            onChange={e => setStaffName(e.target.value)}
            buttonText='병원찾기'
            onButtonClick={() => {}}
            buttonIcon={<SearchIcon width={22} height={22} fill='#fff' />}
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
              options={deptType === '부서' ? STAFF_DEPARTMENT_OPTIONS : MEDICAL_DEPARTMENT_OPTIONS}
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
            onChange={e => setContactNumber(e.target.value)}
          />

          {/* 휴대전화 */}
          <FormField
            label='휴대전화'
            id='mobilePhone'
            name='mobilePhone'
            type='tel'
            placeholder='-없이 입력해주세요.'
            value={mobilePhone}
            onChange={e => setMobilePhone(e.target.value)}
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
            <div className={styles.radioRow}>
              <Radio
                name='medicalInstitutionType'
                value={medicalInstitutionType}
                options={[
                  { value: '상급종합병원', label: '상급종합병원' },
                  { value: '종합병원', label: '종합병원' },
                  { value: '병원', label: '병원' }
                ]}
                onChange={setMedicalInstitutionType}
                className={styles.medicalInstitutionRadio}
              />
            </div>
            <div className={styles.radioRow}>
              <Radio
                name='medicalInstitutionType'
                value={medicalInstitutionType}
                options={[
                  { value: '전문병원', label: '전문병원' },
                  { value: '요양병원', label: '요양병원' },
                  { value: '한방병원', label: '한방병원' }
                ]}
                onChange={setMedicalInstitutionType}
                className={styles.medicalInstitutionRadio}
              />
            </div>
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
            onChange={e => setTotalEmployees(e.target.value)}
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
            onChange={e => setSpecialists(e.target.value)}
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
            onChange={e => setNurses(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
