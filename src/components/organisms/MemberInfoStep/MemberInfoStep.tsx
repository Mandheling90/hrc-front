'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { FormField } from '@/components/molecules/FormField/FormField'
import { SearchIcon } from '@/components/icons/SearchIcon'
// import { EyeIcon } from '@/components/icons/EyeIcon'
import React, { useState } from 'react'
import styles from './MemberInfoStep.module.scss'

export interface MemberInfoStepProps {
  /** 다음 단계 핸들러 */
  onNext: () => void
  /** 이전 단계 핸들러 */
  onPrev: () => void
  /** 취소 핸들러 */
  onCancel: () => void
  /** 이름 필드 비활성화 여부 (본인 인증 완료 시 true) */
  nameDisabled?: boolean
}

export const MemberInfoStep: React.FC<MemberInfoStepProps> = ({ onNext, onCancel }) => {
  const [formData, setFormData] = useState({
    // 회원 정보
    name: '',
    birthDate: '',
    memberType: '의사',
    phone: '',
    userId: '',
    password: '',
    passwordConfirm: '',
    email: '',
    emailDomain: '@naver.com',
    emailDomainEditable: false,
    school: '',
    department: '전체',
    specialty: '',
    licenseNumber: '',
    smsConsent: '동의',
    emailConsent: '동의',
    memberConsent: '동의',
    // 병원 정보
    hospitalName: '',
    medicalInstitutionNumber: '',
    zipCode: '',
    address: '',
    detailAddress: '',
    hospitalPhone: '',
    hospitalWebsite: ''
  })

  // const [showPassword, setShowPassword] = useState(false)
  // const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRadioChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleIdDuplicateCheck = () => {
    // TODO: 아이디 중복 확인 로직
    console.log('아이디 중복 확인:', formData.userId)
  }

  const handleHospitalSearch = () => {
    // TODO: 병원 검색 로직
    console.log('병원 검색')
  }

  const handleZipCodeSearch = () => {
    // TODO: 우편번호 검색 로직
    console.log('우편번호 검색')
  }

  const departmentOptions = [
    { value: '전체', label: '전체' },
    { value: '내과', label: '내과' },
    { value: '외과', label: '외과' },
    { value: '정형외과', label: '정형외과' },
    { value: '신경외과', label: '신경외과' },
    { value: '산부인과', label: '산부인과' },
    { value: '소아과', label: '소아과' },
    { value: '이비인후과', label: '이비인후과' },
    { value: '안과', label: '안과' },
    { value: '피부과', label: '피부과' },
    { value: '정신건강의학과', label: '정신건강의학과' },
    { value: '재활의학과', label: '재활의학과' },
    { value: '마취통증의학과', label: '마취통증의학과' },
    { value: '영상의학과', label: '영상의학과' },
    { value: '병리과', label: '병리과' },
    { value: '진단검사의학과', label: '진단검사의학과' },
    { value: '응급의학과', label: '응급의학과' }
  ]

  return (
    <>
      <InfoBox
        variant='guide'
        title='회원 개인정보 입력 안내'
        messages={[
          '회원 개인정보는 필수 항목과 선택 항목으로 구분되며, 필수 입력 항목은 전부 입력하셔야 합니다.',
          '회원 개인정보는 안전하게 보호됩니다.'
        ]}
        showBullets={true}
        className={styles.infoGuideBox}
        contentAlign='center'
      />

      {/* 회원 정보 섹션 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>회원 정보</h2>
        <p className={styles.sectionSubtitle}>필수 입력 항목에 정보를 모두 입력해주세요.</p>

        <div className={styles.formGrid}>
          <FormField
            label='이름'
            required
            id='name'
            name='name'
            type='text'
            placeholder='홍길동'
            value={'홍길동'}
            onChange={handleInputChange}
            disabled
          />

          <FormField
            label='생년월일'
            required
            id='birthDate'
            name='birthDate'
            type='text'
            placeholder='YYYY-MM-DD'
            value={'1990-01-01'}
            onChange={handleInputChange}
            disabled
          />

          <div className={styles.formField}>
            <InputLabel htmlFor='memberType' required>
              회원구분
            </InputLabel>
            <Radio
              name='memberType'
              value={formData.memberType}
              options={[
                { value: '의사', label: '의사' },
                { value: '치과의사', label: '치과의사' },
                { value: '한의사', label: '한의사' }
              ]}
              onChange={handleRadioChange('memberType')}
            />
          </div>

          <FormField
            label='휴대전화'
            required
            id='phone'
            name='phone'
            type='tel'
            placeholder='010-0000-0000'
            value={formData.phone}
            onChange={handleInputChange}
            disabled
          />

          <FormField
            label='회원 ID'
            required
            id='userId'
            name='userId'
            type='text'
            placeholder='이름을 입력해주세요.'
            value={formData.userId}
            onChange={handleInputChange}
            buttonText='병원찾기'
            onButtonClick={handleIdDuplicateCheck}
          />

          <FormField
            label='비밀번호'
            required
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleInputChange}
          />

          <FormField
            label='비밀번호 확인'
            required
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            value={formData.passwordConfirm}
            onChange={handleInputChange}
          />

          <FormField
            label='이메일'
            required
            id='email'
            name='email'
            type='text'
            placeholder='이메일을 입력해주세요.'
            value={formData.email}
            onChange={handleInputChange}
          />

          <FormField
            label='의사면허번호'
            required
            id='licenseNumber'
            name='licenseNumber'
            type='text'
            placeholder='-없이 입력해주세요.'
            value={formData.licenseNumber}
            onChange={handleInputChange}
            rightElement={
              <Checkbox
                checked={formData.emailDomainEditable}
                onChange={handleCheckboxChange('emailDomainEditable')}
                label='원장여부'
              />
            }
            helperText='※ 원장여부 체크 시에만 협력병원 정보수정이 가능합니다.'
          />

          <FormField
            label='출신학교'
            required
            id='school'
            name='school'
            type='text'
            placeholder='예) https://refer.kumc.or.kr'
            value={formData.school}
            onChange={handleInputChange}
          />

          <div className={styles.formField}>
            <InputLabel htmlFor='department' required>
              진료과
            </InputLabel>
            <Select
              id='department'
              name='department'
              options={departmentOptions}
              value={formData.department}
              onChange={handleSelectChange}
            />
          </div>

          <FormField
            label='세부 전공'
            id='specialty'
            name='specialty'
            type='text'
            placeholder='세부 전공을 입력해주세요'
            value={formData.specialty}
            onChange={handleInputChange}
          />

          <div className={styles.formField}>
            <InputLabel htmlFor='smsConsent' required>
              SMS 수신 여부
            </InputLabel>
            <Radio
              name='smsConsent'
              value={formData.smsConsent}
              options={[
                { value: '동의', label: '동의' },
                { value: '비동의', label: '비동의' }
              ]}
              onChange={handleRadioChange('smsConsent')}
            />
          </div>

          <div className={styles.formField}>
            <InputLabel htmlFor='emailConsent' required>
              E-mail 수신 여부
            </InputLabel>
            <Radio
              name='emailConsent'
              value={formData.emailConsent}
              options={[
                { value: '동의', label: '동의' },
                { value: '비동의', label: '비동의' }
              ]}
              onChange={handleRadioChange('emailConsent')}
            />
          </div>

          <div className={styles.formField}>
            <InputLabel htmlFor='memberConsent' required>
              회신서 수신 동의여부
            </InputLabel>
            <Radio
              name='memberConsent'
              value={formData.memberConsent}
              options={[
                { value: '동의', label: '동의' },
                { value: '비동의', label: '비동의' }
              ]}
              onChange={handleRadioChange('memberConsent')}
            />
          </div>
        </div>
      </div>

      {/* 병원 정보 섹션 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>병원 정보</h2>
        <p className={styles.sectionSubtitle}>필수 입력 항목에 정보를 모두 입력해주세요.</p>

        <div className={styles.formGrid}>
          <FormField
            label='병원명'
            required
            id='hospitalName'
            name='hospitalName'
            type='text'
            placeholder='고려대학교안암병원'
            value={formData.hospitalName}
            onChange={handleInputChange}
            disabled
            buttonText='병원 검색'
            onButtonClick={handleHospitalSearch}
            buttonIcon={<SearchIcon width={20} height={20} fill='#fff' />}
            buttonClassName={styles.searchButton}
          />

          <FormField
            label='요양기관번호'
            required
            id='medicalInstitutionNumber'
            name='medicalInstitutionNumber'
            type='text'
            placeholder='요양기관번호를 입력해주세요.'
            value={formData.medicalInstitutionNumber}
            onChange={handleInputChange}
          />

          <div className={styles.formFieldWithButton}>
            <InputLabel htmlFor='zipCode' required>
              병원주소
            </InputLabel>
            <div className={styles.addressInput}>
              <div className={styles.zipCodeInput}>
                <Input
                  type='text'
                  id='zipCode'
                  name='zipCode'
                  placeholder='우편번호'
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={styles.inputWithButtonInput}
                  disabled
                />
                <Button
                  type='button'
                  variant='primary'
                  size='small'
                  onClick={handleZipCodeSearch}
                  className={styles.searchButton}
                >
                  우편번호 검색
                  <SearchIcon width={20} height={20} fill='#fff' />
                </Button>
              </div>
              <Input
                type='text'
                id='address'
                name='address'
                placeholder='주소'
                value={formData.address}
                onChange={handleInputChange}
                disabled
              />
              <Input
                type='text'
                id='detailAddress'
                name='detailAddress'
                placeholder='상세주소를 입력해 주세요.'
                value={formData.detailAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <FormField
            label='대표 전화'
            required
            id='hospitalPhone'
            name='hospitalPhone'
            type='tel'
            placeholder='-없이 입력해주세요.'
            value={formData.hospitalPhone}
            onChange={handleInputChange}
          />

          <FormField
            label='병원 홈페이지 주소'
            id='hospitalWebsite'
            name='hospitalWebsite'
            type='text'
            placeholder='예) https://refer.kumc.or.kr'
            value={formData.hospitalWebsite}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button type='button' variant='gray' size='medium' onClick={onCancel}>
          취소
        </Button>
        <Button type='button' variant='primary' size='medium' onClick={onNext}>
          다음 단계
        </Button>
      </div>
    </>
  )
}
