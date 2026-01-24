'use client'

import React, { useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Radio } from '@/components/atoms/Radio/Radio'
import styles from './BedAndFacilityStep.module.scss'

export const BedAndFacilityStep: React.FC = () => {
  // 병상 운영 현황 상태
  const [operatingBeds, setOperatingBeds] = useState('')
  const [premiumRoomChecked, setPremiumRoomChecked] = useState(true)
  const [premiumRoomCount, setPremiumRoomCount] = useState('')
  const [multiPersonRoomChecked, setMultiPersonRoomChecked] = useState(true)
  const [multiPersonRoomCount, setMultiPersonRoomCount] = useState('')
  const [isolationRoomChecked, setIsolationRoomChecked] = useState(false)
  const [isolationRoomCount, setIsolationRoomCount] = useState('')

  // 시설 운영 현황 상태
  const [icuChecked, setIcuChecked] = useState(true)
  const [icuCount, setIcuCount] = useState('')
  const [emergencyRoomChecked, setEmergencyRoomChecked] = useState(false)
  const [emergencyRoomCount, setEmergencyRoomCount] = useState('')
  const [dialysisRoom, setDialysisRoom] = useState('유')
  const [surgeryRoom, setSurgeryRoom] = useState('유')
  const [hospice, setHospice] = useState('유')
  const [psychiatricWard, setPsychiatricWard] = useState({
    general: false,
    closed: false
  })
  const [rehabilitationTherapy, setRehabilitationTherapy] = useState({
    physical: true,
    occupational: false,
    speech: false,
    swallowing: false,
    isolation: false
  })

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
          <span className={styles.stepNumber}>4</span>
          <span className={styles.stepSeparator}>/</span>
          <span className={styles.stepTotal}>8</span>
        </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 가동 병상 수 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='operatingBeds' required>
              가동 병상 수
            </InputLabel>
            <div className={styles.inputWithUnit}>
              <Input
                type='text'
                id='operatingBeds'
                name='operatingBeds'
                placeholder='가동 병상 수를 입력해주세요.'
                value={operatingBeds}
                onChange={e => handleNumberChange(e.target.value, setOperatingBeds)}
              />
              <span className={styles.unit}>병상</span>
            </div>
          </div>

          {/* 병실 운영 현황 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='roomOperation' required>
              병실 운영 현황
            </InputLabel>
            <div className={styles.checkboxInputGroup}>
              {/* 상급병실 */}
              <div className={styles.checkboxInputRow}>
                <Checkbox
                  id='premiumRoom'
                  name='premiumRoom'
                  checked={premiumRoomChecked}
                  onChange={setPremiumRoomChecked}
                  label='상급병실'
                />
                <Input
                  type='text'
                  id='premiumRoomCount'
                  name='premiumRoomCount'
                  placeholder='병실 수를 입력해주세요.'
                  value={premiumRoomCount}
                  onChange={e => handleNumberChange(e.target.value, setPremiumRoomCount)}
                  disabled={!premiumRoomChecked}
                />
              </div>

              {/* 다인실 */}
              <div className={styles.checkboxInputRow}>
                <Checkbox
                  id='multiPersonRoom'
                  name='multiPersonRoom'
                  checked={multiPersonRoomChecked}
                  onChange={setMultiPersonRoomChecked}
                  label='다인실'
                />
                <Input
                  type='text'
                  id='multiPersonRoomCount'
                  name='multiPersonRoomCount'
                  placeholder='병실 수를 입력해주세요.'
                  value={multiPersonRoomCount}
                  onChange={e => handleNumberChange(e.target.value, setMultiPersonRoomCount)}
                  disabled={!multiPersonRoomChecked}
                />
              </div>

              {/* 격리병실 */}
              <div className={styles.checkboxInputRow}>
                <Checkbox
                  id='isolationRoom'
                  name='isolationRoom'
                  checked={isolationRoomChecked}
                  onChange={setIsolationRoomChecked}
                  label='격리병실'
                />
                <Input
                  type='text'
                  id='isolationRoomCount'
                  name='isolationRoomCount'
                  placeholder='Input Text'
                  value={isolationRoomCount}
                  onChange={e => handleNumberChange(e.target.value, setIsolationRoomCount)}
                  disabled={!isolationRoomChecked}
                />
              </div>
            </div>
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
          {/* 중환자실 */}
          <div className={styles.checkboxInputRow}>
            <Checkbox id='icu' name='icu' checked={icuChecked} onChange={setIcuChecked} label='중환자실' />
            <Input
              type='text'
              id='icuCount'
              name='icuCount'
              placeholder='병실 수를 입력해주세요.'
              value={icuCount}
              onChange={e => handleNumberChange(e.target.value, setIcuCount)}
              disabled={!icuChecked}
            />
          </div>

          {/* 응급실 */}
          <div className={styles.checkboxInputRow}>
            <Checkbox
              id='emergencyRoom'
              name='emergencyRoom'
              checked={emergencyRoomChecked}
              onChange={setEmergencyRoomChecked}
              label='응급실'
            />
            <Input
              type='text'
              id='emergencyRoomCount'
              name='emergencyRoomCount'
              placeholder='Input Text'
              value={emergencyRoomCount}
              onChange={e => handleNumberChange(e.target.value, setEmergencyRoomCount)}
              disabled={!emergencyRoomChecked}
            />
          </div>

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
            <div className={styles.checkboxGroup}>
              <Checkbox
                id='psychiatricGeneral'
                name='psychiatricGeneral'
                checked={psychiatricWard.general}
                onChange={checked => setPsychiatricWard(prev => ({ ...prev, general: checked }))}
                label='일반병동'
              />
              <Checkbox
                id='psychiatricClosed'
                name='psychiatricClosed'
                checked={psychiatricWard.closed}
                onChange={checked => setPsychiatricWard(prev => ({ ...prev, closed: checked }))}
                label='폐쇄병동'
              />
            </div>
          </div>

          {/* 재활치료실 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='rehabilitationTherapy'>재활치료실</InputLabel>
            <div className={styles.checkboxGroup}>
              <Checkbox
                id='rehabPhysical'
                name='rehabPhysical'
                checked={rehabilitationTherapy.physical}
                onChange={checked => setRehabilitationTherapy(prev => ({ ...prev, physical: checked }))}
                label='물리치료'
              />
              <Checkbox
                id='rehabOccupational'
                name='rehabOccupational'
                checked={rehabilitationTherapy.occupational}
                onChange={checked => setRehabilitationTherapy(prev => ({ ...prev, occupational: checked }))}
                label='작업치료'
              />
              <Checkbox
                id='rehabSpeech'
                name='rehabSpeech'
                checked={rehabilitationTherapy.speech}
                onChange={checked => setRehabilitationTherapy(prev => ({ ...prev, speech: checked }))}
                label='언어재활'
              />
              <Checkbox
                id='rehabSwallowing'
                name='rehabSwallowing'
                checked={rehabilitationTherapy.swallowing}
                onChange={checked => setRehabilitationTherapy(prev => ({ ...prev, swallowing: checked }))}
                label='연하재활'
              />
              <Checkbox
                id='rehabIsolation'
                name='rehabIsolation'
                checked={rehabilitationTherapy.isolation}
                onChange={checked => setRehabilitationTherapy(prev => ({ ...prev, isolation: checked }))}
                label='격리재활'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
