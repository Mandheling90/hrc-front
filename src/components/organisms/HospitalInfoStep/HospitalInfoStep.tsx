'use client'

import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Input } from '@/components/atoms/Input/Input'
import { SearchIcon } from '@/components/icons/SearchIcon'
import {
  HospitalSearchModal,
  HospitalSearchResult
} from '@/components/molecules/HospitalSearchModal/HospitalSearchModal'
import type { HospitalInfoStepData, StepRef } from '@/types/partner-application'
import styles from './HospitalInfoStep.module.scss'

export interface HospitalInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
  /** 초기값 (임시저장 불러오기용) */
  defaultValues?: Partial<HospitalInfoStepData>
  /** 병원 검색 버튼 숨김 */
  hideSearch?: boolean
}

export const HospitalInfoStep = forwardRef<StepRef<HospitalInfoStepData>, HospitalInfoStepProps>(
  ({ currentStep = 1, totalSteps = 8, defaultValues, hideSearch }, ref) => {
    const [hospitalName, setHospitalName] = useState(defaultValues?.hospitalName ?? '')
    const [medicalInstitutionNumber, setMedicalInstitutionNumber] = useState(
      defaultValues?.medicalInstitutionNumber ?? ''
    )
    const [zipCode, setZipCode] = useState(defaultValues?.zipCode ?? '')
    const [address, setAddress] = useState(defaultValues?.address ?? '')
    const [detailAddress, setDetailAddress] = useState(defaultValues?.detailAddress ?? '')
    const [phoneNumber, setPhoneNumber] = useState(defaultValues?.phoneNumber ?? '')
    const [faxNumber, setFaxNumber] = useState(defaultValues?.faxNumber ?? '')
    const [website, setWebsite] = useState(defaultValues?.website ?? '')
    const [isHospitalSearchOpen, setIsHospitalSearchOpen] = useState(false)

    const handleHospitalSearch = () => {
      setIsHospitalSearchOpen(true)
    }

    const handleHospitalSelect = (hospital: HospitalSearchResult) => {
      setHospitalName(hospital.hospitalName)
      setMedicalInstitutionNumber(hospital.careNumber)
      setZipCode(hospital.zipCode ?? '')
      setAddress(hospital.address ?? '')
      setDetailAddress(hospital.addressDetail ?? '')
      setPhoneNumber(hospital.phone ?? '')
      setWebsite(hospital.website ?? '')
      setIsHospitalSearchOpen(false)
    }

    useImperativeHandle(ref, () => ({
      getData: () => ({
        hospitalName,
        medicalInstitutionNumber,
        zipCode,
        address,
        detailAddress,
        phoneNumber,
        faxNumber,
        website
      }),
      validate: () => {
        const missing: string[] = []
        if (!hospitalName.trim()) missing.push('병원명')
        if (!medicalInstitutionNumber.trim()) missing.push('요양기관번호')
        if (!zipCode.trim()) missing.push('병원주소')
        if (!phoneNumber.trim()) missing.push('병원전화번호')
        if (!faxNumber.trim()) missing.push('팩스번호')
        if (missing.length > 0) return `다음 필수 항목을 입력해주세요:\n${missing.join(', ')}`
        return null
      }
    }))

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
            placeholder='병원명을 입력해주세요'
            value={hospitalName}
            onChange={e => setHospitalName(e.target.value)}
            disabled
            {...(!hideSearch && {
              buttonText: '병원 검색',
              onButtonClick: handleHospitalSearch,
              buttonIcon: <SearchIcon width={20} height={20} fill='#fff' />
            })}
          />

          {/* 요양기관번호 */}
          <FormField
            label='요양기관번호'
            required
            id='medicalInstitutionNumber'
            name='medicalInstitutionNumber'
            type='text'
            value={medicalInstitutionNumber}
            onChange={e => {
              const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 8)
              setMedicalInstitutionNumber(filtered)
            }}
            placeholder='요양기관번호를 입력해주세요.'
            disabled
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
            onChange={e => setZipCode(e.target.value)}
            disabled
          >
            <Input
              type='text'
              id='address'
              name='address'
              placeholder='주소'
              value={address}
              onChange={e => setAddress(e.target.value)}
              disabled
            />
            <Input
              type='text'
              id='detailAddress'
              name='detailAddress'
              placeholder='상세주소를 입력해 주세요.'
              value={detailAddress}
              onChange={e => setDetailAddress(e.target.value)}
              disabled
            />
          </FormField>

          {/* 병원전화번호 */}
          <FormField
            label='병원전화번호'
            required
            id='phoneNumber'
            name='phoneNumber'
            type='tel'
            placeholder='-없이 입력해주세요.'
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            disabled
          />

          {/* 팩스번호 */}
          <FormField
            label='팩스번호'
            required
            id='faxNumber'
            name='faxNumber'
            type='tel'
            placeholder='-없이 입력해주세요.'
            value={faxNumber}
            onChange={e => {
              const filtered = e.target.value.replace(/[^0-9]/g, '')
              setFaxNumber(filtered)
            }}
          />

          {/* 병원 홈페이지 주소 */}
          <FormField
            label='병원 홈페이지 주소'
            id='website'
            name='website'
            type='url'
            placeholder='ex) https://refer.kumc.or.kr/'
            value={website}
            onChange={e => setWebsite(e.target.value)}
            disabled
          />
        </div>

        {/* 병원 검색 팝업 */}
        <HospitalSearchModal
          isOpen={isHospitalSearchOpen}
          onClose={() => setIsHospitalSearchOpen(false)}
          onSelect={handleHospitalSelect}
        />
      </div>
    )
  }
)
HospitalInfoStep.displayName = 'HospitalInfoStep'
