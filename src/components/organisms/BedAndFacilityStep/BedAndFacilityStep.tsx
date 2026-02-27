'use client'

import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { LabelInputRowGroup } from '@/components/molecules/LabelInputRowGroup/LabelInputRowGroup'
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup/CheckboxGroup'
import type { BedAndFacilityStepData, StepRef } from '@/types/partner-application'
import styles from './BedAndFacilityStep.module.scss'

export interface BedAndFacilityStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
  /** 초기값 (임시저장 불러오기용) */
  defaultValues?: Partial<BedAndFacilityStepData>
}

export const BedAndFacilityStep = forwardRef<StepRef<BedAndFacilityStepData>, BedAndFacilityStepProps>(
  ({ currentStep = 4, totalSteps = 8, defaultValues }, ref) => {
    // 병상 운영 현황 상태
    const [totalBedCount, setTotalBedCount] = useState(defaultValues?.totalBedCount ?? '')
    const [operatingBeds, setOperatingBeds] = useState(defaultValues?.operatingBeds ?? '')
    const [premiumRoomChecked, setPremiumRoomChecked] = useState(defaultValues?.premiumRoomChecked ?? true)
    const [premiumRoomCount, setPremiumRoomCount] = useState(defaultValues?.premiumRoomCount ?? '')
    const [multiPersonRoomChecked, setMultiPersonRoomChecked] = useState(defaultValues?.multiPersonRoomChecked ?? true)
    const [multiPersonRoomCount, setMultiPersonRoomCount] = useState(defaultValues?.multiPersonRoomCount ?? '')
    const [isolationRoomChecked, setIsolationRoomChecked] = useState(defaultValues?.isolationRoomChecked ?? false)
    const [isolationRoomCount, setIsolationRoomCount] = useState(defaultValues?.isolationRoomCount ?? '')

    // 시설 운영 현황 상태
    const [icuChecked, setIcuChecked] = useState(defaultValues?.icuChecked ?? true)
    const [icuCount, setIcuCount] = useState(defaultValues?.icuCount ?? '')
    const [emergencyRoomChecked, setEmergencyRoomChecked] = useState(defaultValues?.emergencyRoomChecked ?? false)
    const [emergencyRoomCount, setEmergencyRoomCount] = useState(defaultValues?.emergencyRoomCount ?? '')
    const [dialysisRoom, setDialysisRoom] = useState(defaultValues?.dialysisRoom ?? '유')
    const [surgeryRoom, setSurgeryRoom] = useState(defaultValues?.surgeryRoom ?? '유')
    const [hospice, setHospice] = useState(defaultValues?.hospice ?? '유')
    const [psychiatricWard, setPsychiatricWard] = useState(
      defaultValues?.psychiatricWard ?? {
        general: false,
        closed: false
      }
    )
    const [rehabilitationTherapy, setRehabilitationTherapy] = useState(
      defaultValues?.rehabilitationTherapy ?? {
        physical: true,
        occupational: false,
        speech: false,
        swallowing: false,
        isolation: false
      }
    )

    useImperativeHandle(ref, () => ({
      getData: () => ({
        totalBedCount,
        operatingBeds,
        premiumRoomChecked,
        premiumRoomCount,
        multiPersonRoomChecked,
        multiPersonRoomCount,
        isolationRoomChecked,
        isolationRoomCount,
        icuChecked,
        icuCount,
        emergencyRoomChecked,
        emergencyRoomCount,
        dialysisRoom,
        surgeryRoom,
        hospice,
        psychiatricWard,
        rehabilitationTherapy
      }),
      validate: () => {
        const missing: string[] = []
        if (!totalBedCount.trim()) missing.push('총 병상 수')
        if (!operatingBeds.trim()) missing.push('가동 병상 수')
        if (missing.length > 0) return `다음 필수 항목을 입력해주세요:\n${missing.join(', ')}`
        return null
      }
    }))

    // 숫자만 입력 가능한 핸들러
    const handleNumberChange = (value: string, setter: (value: string) => void) => {
      const numericValue = value.replace(/[^0-9]/g, '')
      setter(numericValue)
    }

    return (
      <div className={styles.stepContainer}>
        {/* 병상 운영 현황 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
              <h3 className={styles.formTitle}>병상 운영 현황</h3>
              <p className={styles.formSubtitle}>숫자만 입력 가능</p>
            </div>
            <div className={styles.stepIndicator}>
              <span className={styles.stepNumber}>{currentStep}</span>
              <span className={styles.stepSeparator}>/</span>
              <span className={styles.stepTotal}>{totalSteps}</span>
            </div>
          </div>
          <div className={styles.formDivider}></div>

          <div className={styles.formContent}>
            {/* 총 병상 수 */}
            <div className={styles.operatingBedsField}>
              <FormField
                label='총 병상 수'
                required
                id='totalBedCount'
                name='totalBedCount'
                type='text'
                placeholder='총 병상 수를 입력해주세요.'
                value={totalBedCount}
                onChange={e => handleNumberChange(e.target.value, setTotalBedCount)}
                rightElement={<span className={styles.unit}>병상</span>}
              />
            </div>

            {/* 가동 병상 수 */}
            <div className={styles.operatingBedsField}>
              <FormField
                label='가동 병상 수'
                required
                id='operatingBeds'
                name='operatingBeds'
                type='text'
                placeholder='가동 병상 수를 입력해주세요.'
                value={operatingBeds}
                onChange={e => handleNumberChange(e.target.value, setOperatingBeds)}
                rightElement={<span className={styles.unit}>병상</span>}
              />
            </div>

            {/* 병실 운영 현황 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='roomOperation' required>
                병실 운영 현황
              </InputLabel>
              <LabelInputRowGroup
                options={[
                  {
                    labelType: 'checkbox',
                    checkboxId: 'premiumRoom',
                    checkboxName: 'premiumRoom',
                    checked: premiumRoomChecked,
                    onCheckboxChange: setPremiumRoomChecked,
                    checkboxLabel: '상급병실',
                    inputId: 'premiumRoomCount',
                    inputName: 'premiumRoomCount',
                    placeholder: '병실 수를 입력해주세요.',
                    value: premiumRoomCount,
                    onInputChange: e => handleNumberChange(e.target.value, setPremiumRoomCount),
                    disabled: !premiumRoomChecked
                  },
                  {
                    labelType: 'checkbox',
                    checkboxId: 'multiPersonRoom',
                    checkboxName: 'multiPersonRoom',
                    checked: multiPersonRoomChecked,
                    onCheckboxChange: setMultiPersonRoomChecked,
                    checkboxLabel: '다인실',
                    inputId: 'multiPersonRoomCount',
                    inputName: 'multiPersonRoomCount',
                    placeholder: '병실 수를 입력해주세요.',
                    value: multiPersonRoomCount,
                    onInputChange: e => handleNumberChange(e.target.value, setMultiPersonRoomCount),
                    disabled: !multiPersonRoomChecked
                  },
                  {
                    labelType: 'checkbox',
                    checkboxId: 'isolationRoom',
                    checkboxName: 'isolationRoom',
                    checked: isolationRoomChecked,
                    onCheckboxChange: setIsolationRoomChecked,
                    checkboxLabel: '격리병실',
                    inputId: 'isolationRoomCount',
                    inputName: 'isolationRoomCount',
                    placeholder: '병실 수를 입력해주세요.',
                    value: isolationRoomCount,
                    onInputChange: e => handleNumberChange(e.target.value, setIsolationRoomCount),
                    disabled: !isolationRoomChecked
                  }
                ]}
                labelMinWidth='100px'
              />
            </div>
          </div>
        </div>

        {/* 시설 운영 현황 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
              <h3 className={styles.formTitle}>시설 운영 현황</h3>
              <p className={styles.formSubtitle}>해당 항목에 체크해주시기 바랍니다. (숫자만 입력 가능)</p>
            </div>
          </div>
          <div className={styles.formDivider}></div>

          <div className={styles.formContent}>
            <LabelInputRowGroup
              options={[
                {
                  labelType: 'checkbox',
                  checkboxId: 'icu',
                  checkboxName: 'icu',
                  checked: icuChecked,
                  onCheckboxChange: setIcuChecked,
                  checkboxLabel: '중환자실',
                  inputId: 'icuCount',
                  inputName: 'icuCount',
                  placeholder: '병실 수를 입력해주세요.',
                  value: icuCount,
                  onInputChange: e => handleNumberChange(e.target.value, setIcuCount),
                  disabled: !icuChecked
                },
                {
                  labelType: 'checkbox',
                  checkboxId: 'emergencyRoom',
                  checkboxName: 'emergencyRoom',
                  checked: emergencyRoomChecked,
                  onCheckboxChange: setEmergencyRoomChecked,
                  checkboxLabel: '응급실',
                  inputId: 'emergencyRoomCount',
                  inputName: 'emergencyRoomCount',
                  placeholder: '병실 수를 입력해주세요.',
                  value: emergencyRoomCount,
                  onInputChange: e => handleNumberChange(e.target.value, setEmergencyRoomCount),
                  disabled: !emergencyRoomChecked
                }
              ]}
              labelMinWidth='100px'
            />
            {/* 인공신장실 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='dialysisRoom' required>
                인공신장실
              </InputLabel>
              <Radio
                name='dialysisRoom'
                value={dialysisRoom}
                options={[
                  { value: '유', label: '유' },
                  { value: '무', label: '무' }
                ]}
                onChange={setDialysisRoom}
              />
            </div>

            {/* 수술실 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='surgeryRoom' required>
                수술실
              </InputLabel>
              <Radio
                name='surgeryRoom'
                value={surgeryRoom}
                options={[
                  { value: '유', label: '유' },
                  { value: '무', label: '무' }
                ]}
                onChange={setSurgeryRoom}
              />
            </div>

            {/* 호스피스 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='hospice' required>
                호스피스
              </InputLabel>
              <Radio
                name='hospice'
                value={hospice}
                options={[
                  { value: '유', label: '유' },
                  { value: '무', label: '무' }
                ]}
                onChange={setHospice}
              />
            </div>

            {/* 정신과병동 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='psychiatricWard'>정신과병동</InputLabel>
              <CheckboxGroup
                options={[
                  {
                    id: 'psychiatricGeneral',
                    name: 'psychiatricGeneral',
                    checked: psychiatricWard.general,
                    onChange: checked => setPsychiatricWard(prev => ({ ...prev, general: checked })),
                    label: '일반병동'
                  },
                  {
                    id: 'psychiatricClosed',
                    name: 'psychiatricClosed',
                    checked: psychiatricWard.closed,
                    onChange: checked => setPsychiatricWard(prev => ({ ...prev, closed: checked })),
                    label: '폐쇄병동'
                  }
                ]}
                minWidth='100px'
              />
            </div>

            {/* 재활치료실 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='rehabilitationTherapy'>재활치료실</InputLabel>
              <CheckboxGroup
                minWidth='100px'
                options={[
                  {
                    id: 'rehabPhysical',
                    name: 'rehabPhysical',
                    checked: rehabilitationTherapy.physical,
                    onChange: checked => setRehabilitationTherapy(prev => ({ ...prev, physical: checked })),
                    label: '물리치료'
                  },
                  {
                    id: 'rehabOccupational',
                    name: 'rehabOccupational',
                    checked: rehabilitationTherapy.occupational,
                    onChange: checked => setRehabilitationTherapy(prev => ({ ...prev, occupational: checked })),
                    label: '작업치료'
                  },
                  {
                    id: 'rehabSpeech',
                    name: 'rehabSpeech',
                    checked: rehabilitationTherapy.speech,
                    onChange: checked => setRehabilitationTherapy(prev => ({ ...prev, speech: checked })),
                    label: '언어재활'
                  },
                  {
                    id: 'rehabSwallowing',
                    name: 'rehabSwallowing',
                    checked: rehabilitationTherapy.swallowing,
                    onChange: checked => setRehabilitationTherapy(prev => ({ ...prev, swallowing: checked })),
                    label: '연하재활'
                  },
                  {
                    id: 'rehabIsolation',
                    name: 'rehabIsolation',
                    checked: rehabilitationTherapy.isolation,
                    onChange: checked => setRehabilitationTherapy(prev => ({ ...prev, isolation: checked })),
                    label: '격리재활'
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
BedAndFacilityStep.displayName = 'BedAndFacilityStep'
