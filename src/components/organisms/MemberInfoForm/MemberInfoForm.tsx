'use client'

import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { FormField } from '@/components/molecules/FormField/FormField'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { ConfirmButtons } from '@/components/molecules/ConfirmButtons/ConfirmButtons'
import { Input } from '@/components/atoms/Input/Input'
import { SearchIcon } from '@/components/icons/SearchIcon'
import React, { useState, useEffect } from 'react'
import styles from './MemberInfoForm.module.scss'

// 폼 데이터 타입
export interface MemberInfoFormData {
  // 회원 정보
  name: string
  birthDate: string
  memberType: string
  phone: string
  userId: string
  password: string
  passwordConfirm: string
  email: string
  licenseNumber: string
  isDirector: boolean
  school: string
  department: string
  specialty: string
  smsConsent: string
  emailConsent: string
  replyConsent: string
  // 병원 정보
  hospitalName: string
  careNumber: string
  zipCode: string
  address: string
  addressDetail: string
  hospitalPhone: string
  hospitalWebsite: string
}

// 기본 폼 데이터
export const defaultFormData: MemberInfoFormData = {
  name: '',
  birthDate: '',
  memberType: '의사',
  phone: '',
  userId: '',
  password: '',
  passwordConfirm: '',
  email: '',
  licenseNumber: '',
  isDirector: false,
  school: '',
  department: '전체',
  specialty: '',
  smsConsent: '동의',
  emailConsent: '동의',
  replyConsent: '동의',
  hospitalName: '',
  careNumber: '',
  zipCode: '',
  address: '',
  addressDetail: '',
  hospitalPhone: '',
  hospitalWebsite: ''
}

export interface MemberInfoFormProps {
  /** 폼 모드: 'signup' (회원가입) | 'edit' (회원정보 수정) */
  mode: 'signup' | 'edit'
  /** 초기 데이터 */
  initialData?: Partial<MemberInfoFormData>
  /** 제출 핸들러 */
  onSubmit: (data: MemberInfoFormData) => void
  /** 취소 핸들러 */
  onCancel: () => void
  /** 이전 단계 핸들러 (회원가입 모드에서만 사용) */
  onPrev?: () => void
  /** 제출 버튼 텍스트 */
  submitButtonText?: string
  /** 취소 버튼 텍스트 */
  cancelButtonText?: string
  /** 비활성화할 필드 목록 */
  disabledFields?: (keyof MemberInfoFormData)[]
  /** 회원 정보 섹션 표시 여부 */
  showMemberSection?: boolean
  /** 병원 정보 섹션 표시 여부 */
  showHospitalSection?: boolean
  /** 회원탈퇴 버튼 표시 여부 */
  showWithdrawButton?: boolean
  /** 회원탈퇴 핸들러 */
  onWithdraw?: () => void
}

// 진료과 옵션
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
  { value: '응급의학과', label: '응급의학과' },
  { value: '소화기내과', label: '소화기내과' },
  { value: '심장내과', label: '심장내과' },
  { value: '호흡기내과', label: '호흡기내과' },
  { value: '신경과', label: '신경과' }
]

// 회원구분 옵션
const memberTypeOptions = [
  { value: '의사', label: '의사' },
  { value: '치과의사', label: '치과의사' },
  { value: '한의사', label: '한의사' }
]

// 동의 옵션
const consentOptions = [
  { value: '동의', label: '동의' },
  { value: '비동의', label: '비동의' }
]

export const MemberInfoForm: React.FC<MemberInfoFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  onPrev: _onPrev,
  submitButtonText,
  cancelButtonText,
  disabledFields = [],
  showMemberSection = true,
  showHospitalSection = true,
  showWithdrawButton = false,
  onWithdraw
}) => {
  const [formData, setFormData] = useState<MemberInfoFormData>({
    ...defaultFormData,
    ...initialData
  })

  // 초기 데이터 변경 시 폼 데이터 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }))
    }
  }, [initialData])

  const isFieldDisabled = (fieldName: keyof MemberInfoFormData): boolean => {
    return disabledFields.includes(fieldName)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
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

  const handleIdCheck = () => {
    // TODO: 아이디 중복 확인 / 병원 찾기 로직
    console.log('아이디 확인 / 병원 찾기:', formData.userId)
  }

  const handleHospitalSearch = () => {
    // TODO: 병원 검색 로직
    console.log('병원 검색')
  }

  const handleZipCodeSearch = () => {
    // TODO: 우편번호 검색 로직
    console.log('우편번호 검색')
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  // 기본 버튼 텍스트
  const defaultSubmitText = mode === 'signup' ? '다음 단계' : '저장'
  const defaultCancelText = '취소'

  return (
    <div className={styles.memberInfoForm}>
      {/* 상단 영역: 회원탈퇴 버튼 (우측 정렬) */}
      {showWithdrawButton && (
        <div className={styles.topNotice}>
          <button type='button' className={styles.withdrawButton} onClick={onWithdraw}>
            회원탈퇴
          </button>
        </div>
      )}

      {/* 회원 정보 섹션 */}
      {showMemberSection && (
        <div className={styles.section}>
          <SectionHeader title='회원 정보' subtitle='필수 입력 항목에 정보를 모두 입력해주세요.' />

          <div className={styles.formGrid}>
            <FormField
              label='이름'
              required
              id='name'
              name='name'
              type='text'
              placeholder='이름을 입력해주세요'
              value={formData.name}
              onChange={handleInputChange}
              disabled={isFieldDisabled('name')}
            />

            <FormField
              label='생년월일'
              required
              id='birthDate'
              name='birthDate'
              type='text'
              placeholder='YYYY-MM-DD'
              value={formData.birthDate}
              onChange={handleInputChange}
              disabled={isFieldDisabled('birthDate')}
            />

            <div className={styles.formField}>
              <InputLabel htmlFor='memberType' required>
                회원구분
              </InputLabel>
              <Radio
                name='memberType'
                value={formData.memberType}
                options={memberTypeOptions}
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
              disabled={isFieldDisabled('phone')}
            />

            <FormField
              label='회원 ID'
              required
              id='userId'
              name='userId'
              type='text'
              placeholder='아이디를 입력해주세요'
              value={formData.userId}
              onChange={handleInputChange}
              disabled={isFieldDisabled('userId')}
              buttonText='병원찾기'
              onButtonClick={handleIdCheck}
            />

            <FormField
              label='비밀번호'
              required
              id='password'
              name='password'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              value={formData.password}
              onChange={handleInputChange}
            />

            <FormField
              label='비밀번호 확인'
              required
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              placeholder='비밀번호를 다시 입력해주세요'
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />

            <FormField
              label='이메일'
              required
              id='email'
              name='email'
              type='email'
              placeholder='이메일을 입력해주세요'
              value={formData.email}
              onChange={handleInputChange}
            />

            <FormField
              label='의사면허번호'
              required
              id='licenseNumber'
              name='licenseNumber'
              type='text'
              placeholder='-없이 입력해주세요'
              value={formData.licenseNumber}
              onChange={handleInputChange}
              rightElement={
                <Checkbox
                  checked={formData.isDirector}
                  onChange={handleCheckboxChange('isDirector')}
                  label='원장여부'
                />
              }
              helperText='※ 원장여부 체크 시에만 협력병원 정보수정이 가능합니다.'
            />

            <FormField
              label='출신학교'
              id='school'
              name='school'
              type='text'
              placeholder='출신학교를 입력해주세요'
              value={formData.school}
              onChange={handleInputChange}
            />

            <div className={styles.formField}>
              <InputLabel htmlFor='department'>진료과</InputLabel>
              <Select
                id='department'
                name='department'
                options={departmentOptions}
                value={formData.department}
                onChange={handleSelectChange('department')}
              />
            </div>

            <FormField
              label='세부전공'
              id='specialty'
              name='specialty'
              type='text'
              placeholder='세부전공을 입력해주세요'
              value={formData.specialty}
              onChange={handleInputChange}
            />

            <div className={styles.formField}>
              <InputLabel htmlFor='smsConsent' required>
                SMS 동의여부
              </InputLabel>
              <Radio
                name='smsConsent'
                value={formData.smsConsent}
                options={consentOptions}
                onChange={handleRadioChange('smsConsent')}
              />
            </div>

            <div className={styles.formField}>
              <InputLabel htmlFor='emailConsent' required>
                E-mail 동의여부
              </InputLabel>
              <Radio
                name='emailConsent'
                value={formData.emailConsent}
                options={consentOptions}
                onChange={handleRadioChange('emailConsent')}
              />
            </div>

            <div className={styles.formField}>
              <InputLabel htmlFor='replyConsent' required>
                회신서 수신 동의 여부
              </InputLabel>
              <Radio
                name='replyConsent'
                value={formData.replyConsent}
                options={consentOptions}
                onChange={handleRadioChange('replyConsent')}
              />
            </div>

            <InfoNote message='동의 여부 변경 시 진료협력센터로 연락 주시기 바랍니다.' />
          </div>
        </div>
      )}

      {/* 병원 정보 섹션 */}
      {showHospitalSection && (
        <div className={styles.section}>
          <SectionHeader title='병원 정보' subtitle='필수 입력 항목에 정보를 모두 입력해주세요.' />

          <div className={styles.formGrid}>
            <FormField
              label='병원명'
              required
              id='hospitalName'
              name='hospitalName'
              type='text'
              placeholder='병원명을 입력해주세요'
              value={formData.hospitalName}
              onChange={handleInputChange}
              disabled={isFieldDisabled('hospitalName')}
              buttonText='병원 검색'
              onButtonClick={handleHospitalSearch}
              buttonIcon={<SearchIcon width={20} height={20} fill='#fff' />}
              buttonClassName={styles.searchButton}
            />

            <FormField
              label='요양기관번호'
              id='careNumber'
              name='careNumber'
              type='text'
              placeholder='요양기관번호를 입력해주세요'
              value={formData.careNumber}
              onChange={handleInputChange}
              disabled={isFieldDisabled('careNumber')}
            />

            <FormField
              label='병원주소'
              required
              id='zipCode'
              name='zipCode'
              type='text'
              placeholder='우편번호'
              value={formData.zipCode}
              onChange={handleInputChange}
              disabled={isFieldDisabled('zipCode')}
              buttonText='우편번호 검색'
              onButtonClick={handleZipCodeSearch}
              buttonIcon={<SearchIcon width={20} height={20} fill='#fff' />}
              buttonClassName={styles.searchButton}
            >
              <Input
                type='text'
                id='address'
                name='address'
                placeholder='주소'
                value={formData.address}
                onChange={handleInputChange}
                disabled={isFieldDisabled('address')}
              />
              <Input
                type='text'
                id='addressDetail'
                name='addressDetail'
                placeholder='상세주소를 입력해주세요'
                value={formData.addressDetail}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label='대표전화'
              required
              id='hospitalPhone'
              name='hospitalPhone'
              type='tel'
              placeholder='-없이 입력해주세요'
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
      )}

      {/* 버튼 그룹 */}
      <ConfirmButtons
        secondaryButton={{ label: cancelButtonText || defaultCancelText, onClick: onCancel }}
        primaryButton={{ label: submitButtonText || defaultSubmitText, onClick: handleSubmit }}
      />
    </div>
  )
}
