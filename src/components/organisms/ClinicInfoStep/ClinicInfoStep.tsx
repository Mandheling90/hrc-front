'use client'

import React, { useState } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './ClinicInfoStep.module.scss'

export const ClinicInfoStep: React.FC = () => {
  // 병원 정보 상태
  const [hospitalName, setHospitalName] = useState<string>('')
  const [medicalInstitutionNumber, setMedicalInstitutionNumber] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [detailAddress, setDetailAddress] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [faxNumber, setFaxNumber] = useState<string>('')
  const [website, setWebsite] = useState<string>('')

  // 병원명 검색 핸들러
  const handleHospitalNameSearch = () => {
    // TODO: 병원명 검색 기능 구현
    console.log('병원명 검색')
  }

  // 우편번호 검색 핸들러
  const handlePostalCodeSearch = () => {
    // TODO: 우편번호 검색 기능 구현 (다음 주소 API 등)
    console.log('우편번호 검색')
  }

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>병원 정보</h3>
            <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
          </div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepNumber}>1</span>
            <span className={styles.stepSeparator}>/</span>
            <span className={styles.stepTotal}>4</span>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 병원명 */}
          <div className={styles.formField}>
            <FormField
              label='병원명'
              required
              id='hospitalName'
              name='hospitalName'
              type='text'
              placeholder='Input Text'
              value={hospitalName}
              onChange={e => setHospitalName(e.target.value)}
              error=''
              inputClassName={styles.hospitalNameInput}
              rightElement={
                <Button
                  variant='primary'
                  size='small'
                  onClick={handleHospitalNameSearch}
                  className={`${styles.searchButton} ${styles.iconOnly}`}
                >
                  <SearchIcon width={22} height={22} fill='#fff' />
                </Button>
              }
            />
          </div>

          {/* 요양기관번호 */}
          <div className={styles.formField}>
            <FormField
              label='요양기관번호'
              required
              id='medicalInstitutionNumber'
              name='medicalInstitutionNumber'
              type='text'
              placeholder='요양기관번호를 입력해주세요.'
              value={medicalInstitutionNumber}
              onChange={e => setMedicalInstitutionNumber(e.target.value)}
              error=''
            />
          </div>

          {/* 병원주소 */}
          <div className={styles.formField}>
            <FormField
              label='병원주소'
              required
              id='zipCode'
              name='zipCode'
              type='text'
              placeholder='Input Text'
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              disabled
              buttonText='우편번호 검색'
              onButtonClick={handlePostalCodeSearch}
              buttonIcon={<SearchIcon width={22} height={22} fill='#fff' />}
              inputClassName={styles.postalCodeInput}
              buttonClassName={styles.searchButton}
            >
              <Input
                type='text'
                id='address'
                name='address'
                placeholder=''
                value={address}
                onChange={e => setAddress(e.target.value)}
                disabled
                className={styles.addressInput}
              />
              <Input
                type='text'
                id='detailAddress'
                name='detailAddress'
                placeholder='상세주소를 입력해주세요.'
                value={detailAddress}
                onChange={e => setDetailAddress(e.target.value)}
                className={styles.detailAddressInput}
              />
            </FormField>
          </div>

          {/* 병원전화번호 */}
          <div className={styles.formField}>
            <FormField
              label='병원전화번호'
              required
              id='phoneNumber'
              name='phoneNumber'
              type='tel'
              placeholder='-없이 입력해주세요.'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              error=''
            />
          </div>

          {/* 팩스번호 */}
          <div className={styles.formField}>
            <FormField
              label='팩스번호'
              required
              id='faxNumber'
              name='faxNumber'
              type='tel'
              placeholder='-없이 입력해주세요.'
              value={faxNumber}
              onChange={e => setFaxNumber(e.target.value)}
              error=''
            />
          </div>

          {/* 병원 홈페이지 주소 */}
          <div className={styles.formField}>
            <FormField
              label='병원 홈페이지 주소'
              id='website'
              name='website'
              type='url'
              placeholder='예) https://refer.kumc.or.kr/'
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
