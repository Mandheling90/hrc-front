'use client'

import React, { useState } from 'react'
import { LabelInputRow } from '@/components/molecules/LabelInputRow/LabelInputRow'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Button } from '@/components/atoms/Button/Button'
import { PlusIcon } from '@/components/icons/PlusIcon'
import styles from './MedicalDepartmentStep.module.scss'

export const MedicalDepartmentStep: React.FC = () => {
  // 진료과 운영 현황 상태
  const [departments, setDepartments] = useState<Record<string, { checked: boolean; count: string }>>({
    familyMedicine: { checked: true, count: '' },
    internalMedicine: { checked: false, count: '' },
    anesthesiology: { checked: false, count: '' },
    radiationOncology: { checked: true, count: '' },
    pathology: { checked: false, count: '' },
    urology: { checked: false, count: '' },
    obstetricsGynecology: { checked: false, count: '' },
    plasticSurgery: { checked: false, count: '' },
    pediatrics: { checked: false, count: '' },
    neurology: { checked: false, count: '' },
    neurosurgery: { checked: false, count: '' },
    nephrology: { checked: false, count: '' },
    ophthalmology: { checked: false, count: '' },
    radiology: { checked: false, count: '' },
    surgery: { checked: false, count: '' },
    emergencyMedicine: { checked: false, count: '' },
    otorhinolaryngology: { checked: false, count: '' },
    rehabilitationMedicine: { checked: false, count: '' },
    psychiatry: { checked: false, count: '' },
    orthopedicSurgery: { checked: false, count: '' },
    laboratoryMedicine: { checked: false, count: '' },
    dentistry: { checked: false, count: '' },
    dermatology: { checked: false, count: '' },
    cardiothoracicSurgery: { checked: false, count: '' },
    koreanMedicine: { checked: false, count: '' },
    other: { checked: false, count: '' }
  })

  // 주요 보유 장비 상태
  const [equipment, setEquipment] = useState<Record<string, boolean>>({
    xray: false,
    mri: true,
    ct: false,
    pet: false,
    ultrasound: false,
    echocardiography: true,
    ekg: true,
    endoscopy: true,
    mammography: false,
    vfss: true,
    boneDensity: false,
    cpm: false,
    ventilator: false,
    homeVentilator: true,
    highFlowO2: false,
    portableO2Suction: false,
    pft: false,
    hemodialysis: true,
    crrt: false,
    infusionPump: false
  })

  // 기타 장비 상태
  const [otherEquipment, setOtherEquipment] = useState<string[]>(['', ''])

  // 숫자만 입력 가능한 핸들러
  const handleNumberChange = (value: string, departmentKey: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    setDepartments(prev => ({
      ...prev,
      [departmentKey]: {
        ...prev[departmentKey],
        count: numericValue
      }
    }))
  }

  // 진료과 체크박스 변경 핸들러
  const handleDepartmentCheck = (departmentKey: string, checked: boolean) => {
    setDepartments(prev => ({
      ...prev,
      [departmentKey]: {
        ...prev[departmentKey],
        checked
      }
    }))
  }

  // 기타 장비 추가 핸들러
  const handleAddOtherEquipment = () => {
    setOtherEquipment(prev => [...prev, ''])
  }

  // 기타 장비 입력 변경 핸들러
  const handleOtherEquipmentChange = (index: number, value: string) => {
    setOtherEquipment(prev => {
      const newEquipment = [...prev]
      newEquipment[index] = value
      return newEquipment
    })
  }

  // 진료과 목록
  const departmentList = [
    { key: 'familyMedicine', label: '가정의학과' },
    { key: 'internalMedicine', label: '내과' },
    { key: 'anesthesiology', label: '마취통증의학과' },
    { key: 'radiationOncology', label: '방사선종양학과' },
    { key: 'pathology', label: '병리과' },
    { key: 'urology', label: '비뇨의학과' },
    { key: 'obstetricsGynecology', label: '산부인과' },
    { key: 'plasticSurgery', label: '성형외과' },
    { key: 'pediatrics', label: '소아청소년과' },
    { key: 'neurology', label: '신경과' },
    { key: 'neurosurgery', label: '신경외과' },
    { key: 'nephrology', label: '신장내과' },
    { key: 'ophthalmology', label: '안과' },
    { key: 'radiology', label: '영상의학과' },
    { key: 'surgery', label: '외과' },
    { key: 'emergencyMedicine', label: '응급의학과' },
    { key: 'otorhinolaryngology', label: '이비인후과' },
    { key: 'rehabilitationMedicine', label: '재활의학과' },
    { key: 'psychiatry', label: '정신건강의학과' },
    { key: 'orthopedicSurgery', label: '정형외과' },
    { key: 'laboratoryMedicine', label: '진단검사의학과' },
    { key: 'dentistry', label: '치과' },
    { key: 'dermatology', label: '피부과' },
    { key: 'cardiothoracicSurgery', label: '심장혈관흉부외과' },
    { key: 'koreanMedicine', label: '한의학과' },
    { key: 'other', label: '기타' }
  ]

  // 장비 목록
  const equipmentList = [
    { key: 'xray', label: 'X-RAY' },
    { key: 'mri', label: 'MRI' },
    { key: 'ct', label: 'CT' },
    { key: 'pet', label: 'PET' },
    { key: 'ultrasound', label: '초음파' },
    { key: 'echocardiography', label: '심장초음파' },
    { key: 'ekg', label: 'EKG' },
    { key: 'endoscopy', label: '내시경' },
    { key: 'mammography', label: 'mammography' },
    { key: 'vfss', label: 'VFSS' },
    { key: 'boneDensity', label: '골밀도 검사기' },
    { key: 'cpm', label: 'CPM' },
    { key: 'ventilator', label: 'Ventilator' },
    { key: 'homeVentilator', label: 'Home Ventilator' },
    { key: 'highFlowO2', label: 'High flow O2' },
    { key: 'portableO2Suction', label: 'Pratable O2/Suction' },
    { key: 'pft', label: 'PFT' },
    { key: 'hemodialysis', label: '혈액투석기' },
    { key: 'crrt', label: 'CRRT' },
    { key: 'infusionPump', label: '정맥주입기 (Infusion pump)' }
  ]

  return (
    <div className={styles.stepContainer}>
      {/* 진료과 운영 현황 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>진료과 운영 현황(전문의 수)</h3>
            <p className={styles.formSubtitle}>해당 항목에 체크해주시기 바랍니다. (숫자만 입력 가능)</p>
          </div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepNumber}>6</span>
            <span className={styles.stepSeparator}>/</span>
            <span className={styles.stepTotal}>8</span>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          <div className={styles.departmentGroup}>
            {departmentList.map(dept => (
              <LabelInputRow
                key={dept.key}
                labelType='checkbox'
                checkboxId={dept.key}
                checkboxName={dept.key}
                checked={departments[dept.key].checked}
                onCheckboxChange={checked => handleDepartmentCheck(dept.key, checked)}
                checkboxLabel={dept.label}
                inputId={`${dept.key}Count`}
                inputName={`${dept.key}Count`}
                placeholder=''
                value={departments[dept.key].count}
                onInputChange={e => handleNumberChange(e.target.value, dept.key)}
                disabled={!departments[dept.key].checked}
                labelMinWidth='165px'
              />
            ))}
          </div>
        </div>
      </div>

      {/* 주요 보유 장비 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>주요 보유 장비</h3>
            <p className={styles.formSubtitle}>해당 항목에 체크해주시기 바랍니다.</p>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          <div className={styles.departmentGroup}>
            {equipmentList.map(dept => (
              <Checkbox
                key={dept.key}
                id={dept.key}
                name={dept.key}
                checked={equipment[dept.key]}
                onChange={checked => setEquipment(prev => ({ ...prev, [dept.key]: checked }))}
                label={dept.label}
              />
            ))}
          </div>

          <div className={styles.otherEquipmentList}>
            {otherEquipment.map((value, index) => (
              <LabelInputRow
                key={index}
                labelType='text'
                textLabel='기타장비'
                textLabelAlign='left'
                labelMinWidth='60px'
                inputId={`otherEquipment${index}`}
                inputName={`otherEquipment${index}`}
                inputType='text'
                placeholder=''
                value={value}
                onInputChange={e => handleOtherEquipmentChange(index, e.target.value)}
              />
            ))}

            <div className={styles.otherEquipmentButton}>
              <Button variant='primary' size='small' onClick={handleAddOtherEquipment} className={styles.addButton}>
                <span className={styles.addButtonText}>기타항목 추가</span>
                <PlusIcon width={20} height={20} stroke='#fff' strokeWidth={1.25} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
