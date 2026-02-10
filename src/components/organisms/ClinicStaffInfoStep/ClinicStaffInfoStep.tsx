'use client'

import React, { useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup/CheckboxGroup'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { LabelInputRowGroup } from '@/components/molecules/LabelInputRowGroup/LabelInputRowGroup'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { STAFF_DEPARTMENT_OPTIONS, MEDICAL_DEPARTMENT_OPTIONS } from '@/types/hospital-application'
import { useHospital } from '@/hooks'
import styles from './ClinicStaffInfoStep.module.scss'

export interface ClinicStaffInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
}

export const ClinicStaffInfoStep: React.FC<ClinicStaffInfoStepProps> = ({ currentStep = 3, totalSteps = 4 }) => {
  const { isGuro, isAnsan } = useHospital()
  const showMedicalInstitutionType = isGuro || isAnsan

  // 의료기관 유형 상태
  const [medicalInstitutionType, setMedicalInstitutionType] = useState<string>('의원')

  // 실무자 정보 상태
  const [staffName, setStaffName] = useState<string>('')
  const [deptType, setDeptType] = useState<'부서' | '진료과'>('부서')
  const [department, setDepartment] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [contactNumber, setContactNumber] = useState<string>('')
  const [mobilePhone, setMobilePhone] = useState<string>('')

  // 병상 및 직원 수 상태
  const [totalBeds, setTotalBeds] = useState<string>('')
  const [totalStaff, setTotalStaff] = useState<string>('')
  const [specialists, setSpecialists] = useState<string>('')
  const [nurses, setNurses] = useState<string>('')
  const [mainEquipment, setMainEquipment] = useState<string>('')

  // 병원 세부 정보 상태
  const [physicalTherapyRoom, setPhysicalTherapyRoom] = useState<string>('유')
  const [dialysis, setDialysis] = useState<Record<string, boolean>>({
    blood: true,
    peritoneal: false
  })
  const [medication, setMedication] = useState<string>('G-CSF 피하주사 투여 가능')
  const [dermatology, setDermatology] = useState<Record<string, boolean>>({
    phototherapy: false,
    excimerLaser: false
  })
  const [otolaryngology, setOtolaryngology] = useState<Record<string, boolean>>({
    earSurgeryDisinfection: true,
    betadineSoaking: false
  })
  const [other, setOther] = useState<Record<string, boolean>>({
    surgicalSiteDisinfection: true,
    stitchOut: false,
    chemoportNeedleOut: false
  })

  // 숫자만 입력 가능한 핸들러
  const handleNumberChange = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    setter(numericValue)
  }

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

      {/* 의료기관 유형 섹션 (구로/안산만 표시) */}
      {showMedicalInstitutionType && (
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
              <h3 className={styles.formTitle}>의료기관 유형</h3>
              <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
            </div>
          </div>
          <div className={styles.formDivider}></div>

          <div className={styles.formContent}>
            <Radio
              name='medicalInstitutionType'
              value={medicalInstitutionType}
              options={[
                { value: '의원', label: '의원' },
                { value: '치과의원', label: '치과의원' },
                { value: '한의원', label: '한의원' }
              ]}
              onChange={setMedicalInstitutionType}
              minWidth='180px'
            />
          </div>
        </div>
      )}

      {/* 병상, 시설 및 장비 현황 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>병상, 시설 및 장비 현황</h3>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 병상 및 직원 수 */}
          <div className={styles.subSection}>
            <h4 className={styles.subSectionTitle}>병상 및 직원 수</h4>
            <LabelInputRowGroup
              options={[
                {
                  labelType: 'text',
                  textLabel: '총 병상 수',
                  inputId: 'totalBeds',
                  inputName: 'totalBeds',
                  inputType: 'text',
                  placeholder: '가동 병상 수를 입력해주세요.',
                  value: totalBeds,
                  onInputChange: e => handleNumberChange(e.target.value, setTotalBeds)
                },
                {
                  labelType: 'text',
                  textLabel: '총 직원 수',
                  inputId: 'totalStaff',
                  inputName: 'totalStaff',
                  inputType: 'text',
                  placeholder: '가동 병상 수를 입력해주세요.',
                  value: totalStaff,
                  onInputChange: e => handleNumberChange(e.target.value, setTotalStaff)
                },
                {
                  labelType: 'text',
                  textLabel: '전문의 수',
                  inputId: 'specialists',
                  inputName: 'specialists',
                  inputType: 'text',
                  placeholder: '가동 병상 수를 입력해주세요.',
                  value: specialists,
                  onInputChange: e => handleNumberChange(e.target.value, setSpecialists)
                },
                {
                  labelType: 'text',
                  textLabel: '간호사 수',
                  inputId: 'nurses',
                  inputName: 'nurses',
                  inputType: 'text',
                  placeholder: '가동 병상 수를 입력해주세요.',
                  value: nurses,
                  onInputChange: e => handleNumberChange(e.target.value, setNurses)
                }
              ]}
              textLabelAlign='left'
              labelMinWidth='75px'
              gap='16px'
            />
          </div>

          {/* 주요 보유 장비 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='mainEquipment'>주요 보유 장비</InputLabel>
            <Textarea
              id='mainEquipment'
              name='mainEquipment'
              placeholder='주요 보유 장비를 작성해 주시기 바랍니다.'
              value={mainEquipment}
              onChange={e => setMainEquipment(e.target.value)}
              className={styles.equipmentTextarea}
            />
          </div>
        </div>
      </div>

      {/* 병원 세부 정보 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>병원 세부 정보</h3>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 물리치료실 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='physicalTherapyRoom'>물리치료실</InputLabel>
            <Radio
              name='physicalTherapyRoom'
              value={physicalTherapyRoom}
              options={[
                { value: '유', label: '유' },
                { value: '무', label: '무' }
              ]}
              onChange={value => setPhysicalTherapyRoom(value)}
              minWidth='75px'
            />
          </div>

          {/* 투석 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='dialysis'>투석</InputLabel>
            <CheckboxGroup
              minWidth='80px'
              options={[
                {
                  id: 'dialysisBlood',
                  name: 'dialysisBlood',
                  checked: dialysis.blood,
                  onChange: checked => setDialysis(prev => ({ ...prev, blood: checked })),
                  label: '혈액'
                },
                {
                  id: 'dialysisPeritoneal',
                  name: 'dialysisPeritoneal',
                  checked: dialysis.peritoneal,
                  onChange: checked => setDialysis(prev => ({ ...prev, peritoneal: checked })),
                  label: '복막'
                }
              ]}
            />
          </div>

          {/* 투약 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='medication'>투약</InputLabel>
            <Radio
              name='medication'
              value={medication}
              options={[
                { value: '불가능', label: '불가능' },
                { value: 'G-CSF 피하주사 투여 가능', label: 'G-CSF 피하주사 투여 가능' }
              ]}
              onChange={value => setMedication(value)}
              minWidth='100px'
            />
          </div>

          {/* 피부과 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='dermatology'>피부과</InputLabel>
            <CheckboxGroup
              minWidth='100px'
              options={[
                {
                  id: 'dermatologyPhototherapy',
                  name: 'dermatologyPhototherapy',
                  checked: dermatology.phototherapy,
                  onChange: checked => setDermatology(prev => ({ ...prev, phototherapy: checked })),
                  label: '광선치료'
                },
                {
                  id: 'dermatologyExcimerLaser',
                  name: 'dermatologyExcimerLaser',
                  checked: dermatology.excimerLaser,
                  onChange: checked => setDermatology(prev => ({ ...prev, excimerLaser: checked })),
                  label: '엑시머레이저'
                }
              ]}
            />
          </div>

          {/* 이비인후과 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='otolaryngology'>이비인후과</InputLabel>
            <CheckboxGroup
              minWidth='250px'
              options={[
                {
                  id: 'otolaryngologyEarSurgery',
                  name: 'otolaryngologyEarSurgery',
                  checked: otolaryngology.earSurgeryDisinfection,
                  onChange: checked => setOtolaryngology(prev => ({ ...prev, earSurgeryDisinfection: checked })),
                  label: '귀 수술환자 단순 소독'
                },
                {
                  id: 'otolaryngologyBetadine',
                  name: 'otolaryngologyBetadine',
                  checked: otolaryngology.betadineSoaking,
                  onChange: checked => setOtolaryngology(prev => ({ ...prev, betadineSoaking: checked })),
                  label: 'Betadine Soaking'
                }
              ]}
            />
          </div>

          {/* 기타 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='other'>기타</InputLabel>
            <CheckboxGroup
              minWidth='250px'
              options={[
                {
                  id: 'otherSurgicalSite',
                  name: 'otherSurgicalSite',
                  checked: other.surgicalSiteDisinfection,
                  onChange: checked => setOther(prev => ({ ...prev, surgicalSiteDisinfection: checked })),
                  label: '수술부위 단순 소독'
                },
                {
                  id: 'otherStitchOut',
                  name: 'otherStitchOut',
                  checked: other.stitchOut,
                  onChange: checked => setOther(prev => ({ ...prev, stitchOut: checked })),
                  label: 'stich out'
                },
                {
                  id: 'otherChemoport',
                  name: 'otherChemoport',
                  checked: other.chemoportNeedleOut,
                  onChange: checked => setOther(prev => ({ ...prev, chemoportNeedleOut: checked })),
                  label: 'Chemoport needle out'
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
