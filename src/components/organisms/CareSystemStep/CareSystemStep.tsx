'use client'

import React, { useState } from 'react'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { LabelInputRow } from '@/components/molecules/LabelInputRow/LabelInputRow'
import { LabelInputRowGroup } from '@/components/molecules/LabelInputRowGroup/LabelInputRowGroup'
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup/CheckboxGroup'
import styles from './CareSystemStep.module.scss'

export const CareSystemStep: React.FC = () => {
  // 간병 시스템 상태
  const [integratedNursingCare, setIntegratedNursingCare] = useState('유')
  const [guardianNursingCare, setGuardianNursingCare] = useState('유')
  const [jointNursingCare, setJointNursingCare] = useState('유')

  // 격리병상 운영 현황 상태
  const [isolationWardOperation, setIsolationWardOperation] = useState('유')
  const [singleRoom, setSingleRoom] = useState('')
  const [doubleRoom, setDoubleRoom] = useState('')
  const [tripleRoom, setTripleRoom] = useState('')

  // 격리유형 상태
  const [isolationType, setIsolationType] = useState({
    vre: true,
    cre: false,
    cpe: false,
    tb: false,
    other: false
  })
  const [isolationTypeOther, setIsolationTypeOther] = useState('')

  // 격리 중 간병 상태
  const [nursingDuringIsolation, setNursingDuringIsolation] = useState({
    joint: true,
    individual: false,
    guardian: false
  })

  // 격리 중 재활 상태
  const [rehabilitationDuringIsolation, setRehabilitationDuringIsolation] = useState({
    no: true,
    bedside: false,
    isolationWard: false
  })

  // 숫자만 입력 가능한 핸들러
  const handleNumberChange = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    setter(numericValue)
  }

  return (
    <div className={styles.stepContainer}>
      {/* 간병 시스템 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>간병 시스템</h3>
            <p className={styles.formSubtitle}>해당 항목에 체크해주시기 바랍니다. (숫자만 입력 가능)</p>
          </div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepNumber}>5</span>
            <span className={styles.stepSeparator}>/</span>
            <span className={styles.stepTotal}>8</span>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 간호간병 통합 서비스 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='integratedNursingCare' required>
              간호간병 통합 서비스
            </InputLabel>
            <Radio
              name='integratedNursingCare'
              value={integratedNursingCare}
              options={[
                { value: '유', label: '유' },
                { value: '무', label: '무' }
              ]}
              onChange={setIntegratedNursingCare}
            />
          </div>

          {/* 보호자 간병 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='guardianNursingCare' required>
              보호자 간병
            </InputLabel>
            <Radio
              name='guardianNursingCare'
              value={guardianNursingCare}
              options={[
                { value: '유', label: '유' },
                { value: '무', label: '무' }
              ]}
              onChange={setGuardianNursingCare}
            />
          </div>

          {/* 공동 간병 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='jointNursingCare' required>
              공동 간병
            </InputLabel>
            <Radio
              name='jointNursingCare'
              value={jointNursingCare}
              options={[
                { value: '유', label: '유' },
                { value: '무', label: '무' }
              ]}
              onChange={setJointNursingCare}
            />
          </div>
        </div>
      </div>

      {/* 격리병상 운영 현황 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <div className={styles.titleWithRadio}>
              <h3 className={styles.formTitle}>격리병상 운영 현황</h3>
              <div className={styles.titleRadioGroup}>
                <Radio
                  name='isolationWardOperation'
                  value={isolationWardOperation}
                  options={[
                    { value: '유', label: '유' },
                    { value: '무', label: '무' }
                  ]}
                  onChange={setIsolationWardOperation}
                />
              </div>
            </div>
            <p className={styles.formSubtitle}>해당 항목에 체크해주시기 바랍니다.</p>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 격리병상 운영 현황 입력 필드들 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='isolationRoomStatus' required>
              격리병상 운영 현황
            </InputLabel>
            <LabelInputRowGroup
              options={[
                {
                  textLabel: '1인실',
                  inputId: 'singleRoom',
                  inputName: 'singleRoom',
                  placeholder: 'Input Text',
                  value: singleRoom,
                  onInputChange: e => handleNumberChange(e.target.value, setSingleRoom),
                  disabled: isolationWardOperation === '무'
                },
                {
                  textLabel: '2인실',
                  inputId: 'doubleRoom',
                  inputName: 'doubleRoom',
                  placeholder: 'Input Text',
                  value: doubleRoom,
                  onInputChange: e => handleNumberChange(e.target.value, setDoubleRoom),
                  disabled: isolationWardOperation === '무'
                },
                {
                  textLabel: '3인실',
                  inputId: 'tripleRoom',
                  inputName: 'tripleRoom',
                  placeholder: 'Input Text',
                  value: tripleRoom,
                  onInputChange: e => handleNumberChange(e.target.value, setTripleRoom),
                  disabled: isolationWardOperation === '무'
                }
              ]}
              labelMinWidth='45px'
              textLabelAlign='left'
            />
          </div>

          {/* 격리유형 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='isolationType' required>
              격리유형
            </InputLabel>
            <CheckboxGroup
              minWidth='124px'
              options={[
                {
                  id: 'vre',
                  name: 'vre',
                  checked: isolationType.vre,
                  onChange: checked => setIsolationType(prev => ({ ...prev, vre: checked })),
                  label: 'VRE'
                },
                {
                  id: 'cre',
                  name: 'cre',
                  checked: isolationType.cre,
                  onChange: checked => setIsolationType(prev => ({ ...prev, cre: checked })),
                  label: 'CRE'
                },
                {
                  id: 'cpe',
                  name: 'cpe',
                  checked: isolationType.cpe,
                  onChange: checked => setIsolationType(prev => ({ ...prev, cpe: checked })),
                  label: 'CPE'
                },
                {
                  id: 'tb',
                  name: 'tb',
                  checked: isolationType.tb,
                  onChange: checked => setIsolationType(prev => ({ ...prev, tb: checked })),
                  label: 'TB'
                }
              ]}
              keepSingleRow={true}
            />
            <LabelInputRow
              checkboxId='isolationTypeOther'
              checkboxName='isolationTypeOther'
              checked={isolationType.other}
              onCheckboxChange={checked => setIsolationType(prev => ({ ...prev, other: checked }))}
              checkboxLabel='기타'
              inputId='isolationTypeOtherInput'
              inputName='isolationTypeOtherInput'
              placeholder='Input Text'
              value={isolationTypeOther}
              onInputChange={e => setIsolationTypeOther(e.target.value)}
              disabled={!isolationType.other}
            />
          </div>

          {/* 격리 중 간병 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='nursingDuringIsolation' required>
              격리 중 간병
            </InputLabel>
            <CheckboxGroup
              minWidth='124px'
              options={[
                {
                  id: 'jointNursing',
                  name: 'jointNursing',
                  checked: nursingDuringIsolation.joint,
                  onChange: checked => setNursingDuringIsolation(prev => ({ ...prev, joint: checked })),
                  label: '공동간병'
                },
                {
                  id: 'individualNursing',
                  name: 'individualNursing',
                  checked: nursingDuringIsolation.individual,
                  onChange: checked => setNursingDuringIsolation(prev => ({ ...prev, individual: checked })),
                  label: '개인간병'
                },
                {
                  id: 'guardianNursing',
                  name: 'guardianNursing',
                  checked: nursingDuringIsolation.guardian,
                  onChange: checked => setNursingDuringIsolation(prev => ({ ...prev, guardian: checked })),
                  label: '보호자간병'
                }
              ]}
              keepSingleRow={true}
            />
          </div>

          {/* 격리 중 재활 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='rehabilitationDuringIsolation' required>
              격리 중 재활
            </InputLabel>
            <CheckboxGroup
              minWidth='124px'
              options={[
                {
                  id: 'rehabNo',
                  name: 'rehabNo',
                  checked: rehabilitationDuringIsolation.no,
                  onChange: checked => setRehabilitationDuringIsolation(prev => ({ ...prev, no: checked })),
                  label: 'No'
                },
                {
                  id: 'rehabBedside',
                  name: 'rehabBedside',
                  checked: rehabilitationDuringIsolation.bedside,
                  onChange: checked => setRehabilitationDuringIsolation(prev => ({ ...prev, bedside: checked })),
                  label: '침상재활'
                },
                {
                  id: 'rehabIsolationWard',
                  name: 'rehabIsolationWard',
                  checked: rehabilitationDuringIsolation.isolationWard,
                  onChange: checked => setRehabilitationDuringIsolation(prev => ({ ...prev, isolationWard: checked })),
                  label: '격리병동 재활실 운영'
                }
              ]}
              keepSingleRow={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
