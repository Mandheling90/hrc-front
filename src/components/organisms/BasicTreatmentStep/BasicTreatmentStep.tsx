'use client'

import React, { useState } from 'react'
import { LabelInputRow } from '@/components/molecules/LabelInputRow/LabelInputRow'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Button } from '@/components/atoms/Button/Button'
import { PlusIcon } from '@/components/icons/PlusIcon'
import styles from './BasicTreatmentStep.module.scss'

export interface BasicTreatmentStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
}

export const BasicTreatmentStep: React.FC<BasicTreatmentStepProps> = ({ currentStep = 7, totalSteps = 8 }) => {
  // 관리 항목 상태
  const [management, setManagement] = useState<Record<string, boolean>>({
    tracheostomyCare: true,
    eTube: false,
    lTube: false,
    peg: false,
    foleyNelaton: true,
    drainageTube: false,
    centralVenousCatheter: false,
    chemoport: false
  })

  // 처방 항목 상태
  const [prescription, setPrescription] = useState<Record<string, boolean>>({
    bloodTransfusion: true,
    tpnPpn: false,
    antibiotics: false
  })

  // 드레싱 항목 상태
  const [dressing, setDressing] = useState<Record<string, boolean>>({
    pressureUlcerPrevention: true,
    vacuumManagement: false,
    simpleComplexDressing: false
  })

  // 처치 항목 상태
  const [treatment, setTreatment] = useState<Record<string, boolean>>({
    intubation: true,
    ventilatorCare: false,
    homeVentilator: false,
    highFlowO2: false,
    o2Therapy: true,
    suction: false,
    paracentesis: false,
    thoracentesis: false,
    chestTube: true,
    hemodialysis: false,
    peritonealDialysis: false,
    enema: false
  })

  // 기타 항목 상태
  const [otherItems, setOtherItems] = useState<string[]>(['', ''])

  // 기타 항목 추가 핸들러
  const handleAddOtherItem = () => {
    setOtherItems(prev => [...prev, ''])
  }

  // 기타 항목 입력 변경 핸들러
  const handleOtherItemChange = (index: number, value: string) => {
    setOtherItems(prev => {
      const newItems = [...prev]
      newItems[index] = value
      return newItems
    })
  }

  // 관리 항목 목록
  const managementList = [
    { key: 'tracheostomyCare', label: 'Tracheostomy care' },
    { key: 'eTube', label: 'E-tube' },
    { key: 'lTube', label: 'L-tube' },
    { key: 'peg', label: 'PEG' },
    { key: 'foleyNelaton', label: 'Foley/Nelaton(CIC)' },
    { key: 'drainageTube', label: '배액관(위루관, 장루, 요루 등)' },
    { key: 'centralVenousCatheter', label: '중심정맥관 삽입 및 관리' },
    { key: 'chemoport', label: 'Chemo-port 관리' }
  ]

  // 처방 항목 목록
  const prescriptionList = [
    { key: 'bloodTransfusion', label: '수혈(전혈, 적혈구, 혈소판)' },
    { key: 'tpnPpn', label: 'TPN/PPN' },
    { key: 'antibiotics', label: '항생제(1, 3세대, Vanco 등)' }
  ]

  // 드레싱 항목 목록
  const dressingList = [
    { key: 'pressureUlcerPrevention', label: '욕창 예방 및 치료' },
    { key: 'vacuumManagement', label: 'Vaccum 관리' },
    { key: 'simpleComplexDressing', label: '단순드레싱 및 복합드레싱' }
  ]

  // 처치 항목 목록
  const treatmentList = [
    { key: 'intubation', label: 'Intubation' },
    { key: 'ventilatorCare', label: 'Ventilator care' },
    { key: 'homeVentilator', label: 'Home Ventilator' },
    { key: 'highFlowO2', label: 'High flow O2' },
    { key: 'o2Therapy', label: 'O2 Therapy' },
    { key: 'suction', label: 'Suction' },
    { key: 'paracentesis', label: '복수천자' },
    { key: 'thoracentesis', label: '흉수천자' },
    { key: 'chestTube', label: '흉관 삽입 및 관리' },
    { key: 'hemodialysis', label: '혈액투석' },
    { key: 'peritonealDialysis', label: '복막투석' },
    { key: 'enema', label: 'Enema' }
  ]

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>기본 처치 가능 항목</h3>
            <p className={styles.formSubtitle}>해당 항목에 체크해주시기 바랍니다.</p>
          </div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepNumber}>{currentStep}</span>
            <span className={styles.stepSeparator}>/</span>
            <span className={styles.stepTotal}>{totalSteps}</span>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 관리 섹션 */}
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>관리</h4>
            <div className={styles.checkboxGroup}>
              {managementList.map(item => (
                <Checkbox
                  key={item.key}
                  id={item.key}
                  name={item.key}
                  checked={management[item.key]}
                  onChange={checked => setManagement(prev => ({ ...prev, [item.key]: checked }))}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* 처방 섹션 */}
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>처방</h4>
            <div className={styles.checkboxGroup}>
              {prescriptionList.map(item => (
                <Checkbox
                  key={item.key}
                  id={item.key}
                  name={item.key}
                  checked={prescription[item.key]}
                  onChange={checked => setPrescription(prev => ({ ...prev, [item.key]: checked }))}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* 드레싱 섹션 */}
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>드레싱</h4>
            <div className={styles.checkboxGroup}>
              {dressingList.map(item => (
                <Checkbox
                  key={item.key}
                  id={item.key}
                  name={item.key}
                  checked={dressing[item.key]}
                  onChange={checked => setDressing(prev => ({ ...prev, [item.key]: checked }))}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* 처치 섹션 */}
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>처치</h4>
            <div className={styles.checkboxGroup}>
              {treatmentList.map(item => (
                <Checkbox
                  key={item.key}
                  id={item.key}
                  name={item.key}
                  checked={treatment[item.key]}
                  onChange={checked => setTreatment(prev => ({ ...prev, [item.key]: checked }))}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* 기타 항목 섹션 */}
          <div className={styles.otherItemsSection}>
            <div className={styles.otherItemsList}>
              {otherItems.map((value, index) => (
                <LabelInputRow
                  key={index}
                  labelType='text'
                  textLabel='기타항목'
                  textLabelAlign='left'
                  labelMinWidth='60px'
                  inputId={`otherItem${index}`}
                  inputName={`otherItem${index}`}
                  inputType='text'
                  placeholder=''
                  value={value}
                  onInputChange={e => handleOtherItemChange(index, e.target.value)}
                />
              ))}
            </div>
            <div className={styles.otherItemsButton}>
              <Button variant='primary' size='small' onClick={handleAddOtherItem} className={styles.addButton}>
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
