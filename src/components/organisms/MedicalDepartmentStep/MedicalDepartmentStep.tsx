'use client'

import React, { forwardRef, useImperativeHandle, useState, useMemo } from 'react'
import { LabelInputRow } from '@/components/molecules/LabelInputRow/LabelInputRow'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Button } from '@/components/atoms/Button/Button'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { useEnums } from '@/hooks'
import type { MedicalDepartmentStepData, StepRef } from '@/types/partner-application'
import styles from './MedicalDepartmentStep.module.scss'

export interface MedicalDepartmentStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
  /** 초기값 (임시저장 불러오기용) */
  defaultValues?: Partial<MedicalDepartmentStepData>
  /** 주요 보유 장비 섹션 표시 여부 (기본값: true) */
  showEquipment?: boolean
}

/** enum 옵션으로부터 기본 departments 객체 생성 */
const buildDefaultDepartments = (options: { value: string }[]): Record<string, { checked: boolean; count: string }> => {
  const map: Record<string, { checked: boolean; count: string }> = {}
  for (const opt of options) {
    map[opt.value] = { checked: false, count: '' }
  }
  return map
}

const DEFAULT_EQUIPMENT: Record<string, boolean> = {
  xray: false,
  mri: false,
  ct: false,
  pet: false,
  ultrasound: false,
  echocardiography: false,
  ekg: false,
  endoscopy: false,
  mammography: false,
  vfss: false,
  boneDensity: false,
  cpm: false,
  ventilator: false,
  homeVentilator: false,
  highFlowO2: false,
  portableO2Suction: false,
  pft: false,
  hemodialysis: false,
  crrt: false,
  infusionPump: false
}

export const MedicalDepartmentStep = forwardRef<StepRef<MedicalDepartmentStepData>, MedicalDepartmentStepProps>(
  ({ currentStep = 6, totalSteps = 8, defaultValues, showEquipment = true }, ref) => {
    const { getOptions, error: enumError } = useEnums()
    if (enumError) throw enumError

    // enum에서 진료과 목록 조회
    const departmentList = useMemo(() => {
      return getOptions('MedicalDepartment').map(opt => ({ key: opt.value, label: opt.label }))
    }, [getOptions])

    const defaultDepartments = useMemo(() => {
      return buildDefaultDepartments(getOptions('MedicalDepartment'))
    }, [getOptions])

    // 진료과 운영 현황 상태
    const [departments, setDepartments] = useState<Record<string, { checked: boolean; count: string }>>(
      defaultValues?.departments ?? defaultDepartments
    )

    // 주요 보유 장비 상태
    const [equipment, setEquipment] = useState<Record<string, boolean>>(defaultValues?.equipment ?? DEFAULT_EQUIPMENT)

    // 기타 장비 상태
    const [otherEquipment, setOtherEquipment] = useState<string[]>(defaultValues?.otherEquipment ?? ['', ''])

    useImperativeHandle(ref, () => ({
      getData: () => ({
        departments,
        equipment,
        otherEquipment
      }),
      validate: () => {
        const hasUncounted = Object.values(departments).some(d => d.checked && !d.count.trim())
        if (hasUncounted) return '체크한 진료과 전문의 수를 입력해주세요.'
        return null
      }
    }))

    // 숫자만 입력 가능한 핸들러 (최대 5자리 - 99,999)
    const handleNumberChange = (value: string, departmentKey: string) => {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 5)
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
              <span className={styles.stepNumber}>{currentStep}</span>
              <span className={styles.stepSeparator}>/</span>
              <span className={styles.stepTotal}>{totalSteps}</span>
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
        {showEquipment && (
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

            <div className={styles.otherEquipmentSection}>
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
              </div>
              <div className={styles.otherEquipmentButton}>
                <Button variant='primary' size='small' onClick={handleAddOtherEquipment} className={styles.addButton}>
                  <span className={styles.addButtonText}>기타항목 추가</span>
                  <PlusIcon width={20} height={20} stroke='#fff' strokeWidth={1.25} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }
)
MedicalDepartmentStep.displayName = 'MedicalDepartmentStep'
