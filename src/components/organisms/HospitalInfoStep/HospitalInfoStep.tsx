'use client'

import React, { useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Input } from '@/components/atoms/Input/Input'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './HospitalInfoStep.module.scss'

export interface HospitalInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
}

export const HospitalInfoStep: React.FC<HospitalInfoStepProps> = ({ currentStep = 1, totalSteps = 8 }) => {
  const [hospitalName, setHospitalName] = useState('')
  const [medicalInstitutionNumber, setMedicalInstitutionNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [faxNumber, setFaxNumber] = useState('')
  const [website, setWebsite] = useState('')

  return (
    <div className={styles.formSection}>
      <div className={styles.formHeader}>
        <div className={styles.formHeaderLeft}>
          <h3 className={styles.formTitle}>병원 정보</h3>
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
        {/* 병원명 */}
        <FormField
          label='병원명'
          required
          id='hospitalName'
          name='hospitalName'
          type='text'
          placeholder=''
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />

        {/* 요양기관번호 */}
        <FormField
          label='요양기관번호'
          required
          id='medicalInstitutionNumber'
          name='medicalInstitutionNumber'
          type='text'
          placeholder=' '
          value={medicalInstitutionNumber}
          onChange={(e) => setMedicalInstitutionNumber(e.target.value)}
        />

        {/* 병원주소 */}
        <FormField
          label='병원주소'
          required
          id='zipCode'
          name='zipCode'
          type='text'
          placeholder='우편번호'
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          disabled
          buttonText='우편번호 검색'
          onButtonClick={() => {}}
          buttonIcon={<SearchIcon width={20} height={20} fill='#fff' />}
        >
          <Input type='text' id='address' name='address' placeholder='주소' value={address} onChange={(e) => setAddress(e.target.value)} disabled />
          <Input
            type='text'
            id='detailAddress'
            name='detailAddress'
            placeholder='상세주소를 입력해 주세요.'
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </FormField>

        {/* 병원전화번호 */}
        <FormField
          label='병원전화번호'
          required
          id='phoneNumber'
          name='phoneNumber'
          type='tel'
          placeholder=' '
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        {/* 팩스번호 */}
        <FormField
          label='팩스번호'
          required
          id='faxNumber'
          name='faxNumber'
          type='tel'
          placeholder=' '
          value={faxNumber}
          onChange={(e) => setFaxNumber(e.target.value)}
        />

        {/* 병원 홈페이지 주소 */}
        <FormField
          label='병원 홈페이지 주소'
          id='website'
          name='website'
          type='url'
          placeholder='ex) https://refer.kumc.or.kr/'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    </div>
  )
}
