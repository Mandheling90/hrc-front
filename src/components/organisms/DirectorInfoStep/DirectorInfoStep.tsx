'use client'

import React from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { DirectorFormData, DEPARTMENT_OPTIONS } from '@/types/hospital-application'
import styles from './DirectorInfoStep.module.scss'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'

export interface DirectorInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
}

export const DirectorInfoStep: React.FC<DirectorInfoStepProps> = ({ currentStep = 2, totalSteps = 8 }) => {
  const [gender, setGender] = React.useState('')
  const [department, setDepartment] = React.useState('')
  const [smsConsent, setSmsConsent] = React.useState('')
  const [emailConsent, setEmailConsent] = React.useState('')
  const [replyConsent, setReplyConsent] = React.useState('')

  return (
    <div className={styles.formSection}>
      <div className={styles.formHeader}>
        <div className={styles.formHeaderLeft}>
          <h3 className={styles.formTitle}>병원장 정보</h3>
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
        {/* 병원장명 */}
        <FormField
          label='병원장명'
          required
          id='directorName'
          name='directorName'
          type='text'
          placeholder='병원장명을 입력해주세요.'
          value=''
          onChange={() => {}}
          error=''
        />

        {/* 생년월일 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='birthDate' required>
            생년월일
          </InputLabel>
          <div className={styles.inputWithIcon}>
            <Input
              type='text'
              id='birthDate'
              name='birthDate'
              placeholder='생년월일을 입력해주세요.'
              value=''
              onChange={() => {}}
              error=''
            />
            <CalendarIcon width={24} height={24} stroke='var(--gray-11)' className={styles.calendarIcon} />
          </div>
        </div>

        {/* 의사면허번호 */}
        <FormField
          label='의사면허번호'
          required
          id='licenseNumber'
          name='licenseNumber'
          type='text'
          placeholder='-없이 입력해주세요.'
          value=''
          onChange={() => {}}
          error=''
        />

        {/* 휴대전화 */}
        <FormField
          label='휴대전화'
          required
          id='phone'
          name='phone'
          type='tel'
          placeholder='-없이 입력해주세요.'
          value=''
          onChange={() => {}}
          error=''
        />

        {/* 성별 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='gender' required>
            성별
          </InputLabel>
          <Radio
            name='gender'
            value={gender}
            options={[
              { value: '남자', label: '남자' },
              { value: '여자', label: '여자' }
            ]}
            onChange={setGender}
          />
        </div>

        {/* 차량번호 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='carNumber'>차량번호</InputLabel>
          <Input
            type='text'
            id='carNumber'
            name='carNumber'
            placeholder='차량번호를 입력해주세요.'
            value=''
            onChange={() => {}}
          />

          <InfoNote message='무료 주차등록 희망시, 하단 차량등록증 첨부 필요.' />
        </div>

        {/* 이메일 */}
        <FormField
          label='이메일'
          required
          id='email'
          name='email'
          type='email'
          placeholder='이메일을 입력해주세요.'
          value=''
          onChange={() => {}}
          error=''
        />

        {/* 출신학교 */}
        <FormField
          label='출신학교'
          required
          id='school'
          name='school'
          type='text'
          placeholder='출신학교를 입력해주세요.'
          value=''
          onChange={() => {}}
          error=''
        />

        {/* 졸업년도 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='graduationYear' required>
            졸업년도
          </InputLabel>
          <div className={styles.inputWithIcon}>
            <Input
              type='text'
              id='graduationYear'
              name='graduationYear'
              placeholder='졸업년도를 입력해주세요.'
              value=''
              onChange={() => {}}
              error=''
            />
            <CalendarIcon width={24} height={24} stroke='var(--gray-11)' className={styles.calendarIcon} />
          </div>
        </div>

        {/* 수련병원 */}
        <FormField
          label='수련병원'
          required
          id='trainingHospital'
          name='trainingHospital'
          type='text'
          placeholder='수련병원을 입력해주세요.'
          value=''
          onChange={() => {}}
          error=''
        />

        {/* 진료과 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='department' required>
            진료과
          </InputLabel>
          <Select
            id='department'
            name='department'
            options={DEPARTMENT_OPTIONS}
            value={department}
            onChange={setDepartment}
          />
        </div>

        {/* 세부전공 */}
        <FormField
          label='세부전공'
          required
          id='specialty'
          name='specialty'
          type='text'
          placeholder=''
          value=''
          onChange={() => {}}
          error=''
        />

        {/* SMS 수신 동의여부 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='smsConsent' required>
            SMS 수신 동의여부
          </InputLabel>
          <Radio
            name='smsConsent'
            value={smsConsent}
            options={[
              { value: '동의', label: '동의' },
              { value: '비동의', label: '비동의' }
            ]}
            onChange={setSmsConsent}
          />
        </div>

        {/* E-mail 수신 동의여부 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='emailConsent' required>
            E-mail 수신 동의여부
          </InputLabel>
          <Radio
            name='emailConsent'
            value={emailConsent}
            options={[
              { value: '동의', label: '동의' },
              { value: '비동의', label: '비동의' }
            ]}
            onChange={setEmailConsent}
          />
        </div>

        {/* 회신서 수신 동의 여부 */}
        <div className={styles.formField}>
          <InputLabel htmlFor='replyConsent' required>
            회신서 수신 동의 여부
          </InputLabel>
          <Radio
            name='replyConsent'
            value={replyConsent}
            options={[
              { value: '동의', label: '동의' },
              { value: '비동의', label: '비동의' }
            ]}
            onChange={setReplyConsent}
          />

          <InfoNote message='동의 여부 변경 시 진료협력센터로 연락 주시기 바랍니다.' />
        </div>
      </div>
    </div>
  )
}
