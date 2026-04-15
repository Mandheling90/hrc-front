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
import {
  HospitalSearchModal,
  HospitalSearchResult
} from '@/components/molecules/HospitalSearchModal/HospitalSearchModal'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { useLazyQuery } from '@apollo/client/react'
import { CHECK_USER_ID_QUERY } from '@/graphql/auth/queries'
import { useEnums } from '@/hooks'
import React, { useState, useEffect, useMemo } from 'react'
import styles from './MemberInfoForm.module.scss'

// 폼 데이터 타입
export interface MemberInfoFormData {
  // 회원 정보
  name: string
  birthDate: string
  memberType: string
  phone: string
  userId: string
  currentPassword: string
  password: string
  passwordConfirm: string
  email: string
  licenseNumber: string
  isDirector: boolean
  school: string
  department: string
  specialty: string
  graduationYear: string
  trainingHospital: string
  gender: string
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
  memberType: 'DOCTOR',
  phone: '',
  userId: '',
  currentPassword: '',
  password: '',
  passwordConfirm: '',
  email: '',
  licenseNumber: '',
  isDirector: false,
  school: '',
  department: '',
  specialty: '',
  graduationYear: '',
  trainingHospital: '',
  gender: '',
  smsConsent: 'Y',
  emailConsent: 'Y',
  replyConsent: 'Y',
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

// 동의 옵션
const consentOptions = [
  { value: 'Y', label: '동의' },
  { value: 'N', label: '비동의' }
]



export const MemberInfoForm: React.FC<MemberInfoFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPrev,
  submitButtonText,
  cancelButtonText,
  disabledFields = [],
  showMemberSection = true,
  showHospitalSection = true,
  showWithdrawButton = false,
  onWithdraw
}) => {
  const { getOptions, loading: enumLoading, error: enumError } = useEnums()
  if (enumError) throw enumError

  const schoolOptions = useMemo(() => {
    return [{ value: '', label: '선택해주세요' }, ...getOptions('School')]
  }, [getOptions])

  const departmentOptions = useMemo(() => {
    return [{ value: '', label: '선택해주세요' }, ...getOptions('MedicalDepartment')]
  }, [getOptions])

  const genderOptions = useMemo(() => {
    return getOptions('Gender')
  }, [getOptions])

  const memberTypeOptions = useMemo(() => {
    return getOptions('DoctorType')
  }, [getOptions])

  const defaultMemberType = useMemo(() => {
    return memberTypeOptions.length > 0 ? memberTypeOptions[0].value : ''
  }, [memberTypeOptions])

  const [formData, setFormData] = useState<MemberInfoFormData>({
    ...defaultFormData,
    memberType: defaultMemberType,
    ...initialData
  })
  const [isHospitalSearchOpen, setIsHospitalSearchOpen] = useState(false)
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })
  const [userIdChecked, setUserIdChecked] = useState(false)
  const [userIdAvailable, setUserIdAvailable] = useState(false)
  const [checkUserIdQuery, { loading: checkingUserId }] = useLazyQuery<{
    checkUserIdAvailable: { available: boolean; existsInDb: boolean; existsInEhr: boolean }
  }>(CHECK_USER_ID_QUERY, { fetchPolicy: 'network-only' })

  // 초기 데이터 변경 시 폼 데이터 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }))
    }
  }, [initialData])

  // enum 로드 후 memberType 기본값 동기화
  useEffect(() => {
    setFormData(prev => {
      const isCurrentValueValid = memberTypeOptions.some(opt => opt.value === prev.memberType)
      if (!isCurrentValueValid && memberTypeOptions.length > 0) {
        return { ...prev, memberType: memberTypeOptions[0].value }
      }
      return prev
    })
  }, [memberTypeOptions])

  const isFieldDisabled = (fieldName: keyof MemberInfoFormData): boolean => {
    return disabledFields.includes(fieldName)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (name === 'userId') {
      setUserIdChecked(false)
      setUserIdAvailable(false)
    }
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

  const handleIdCheck = async () => {
    if (!formData.userId.trim()) {
      setAlertModal({ isOpen: true, message: '아이디를 입력해주세요.' })
      return
    }

    try {
      const { data } = await checkUserIdQuery({ variables: { userId: formData.userId } })
      const result = data?.checkUserIdAvailable
      setUserIdChecked(true)

      if (result?.available) {
        setUserIdAvailable(true)
        setAlertModal({ isOpen: true, message: '사용 가능한 아이디입니다.' })
      } else {
        setUserIdAvailable(false)
        if (result?.existsInDb) {
          setAlertModal({ isOpen: true, message: '이미 등록된 아이디입니다.' })
        } else if (result?.existsInEhr) {
          setAlertModal({ isOpen: true, message: 'EHR에 이미 존재하는 아이디입니다.' })
        } else {
          setAlertModal({ isOpen: true, message: '사용할 수 없는 아이디입니다.' })
        }
      }
    } catch {
      setAlertModal({ isOpen: true, message: '아이디 확인 중 오류가 발생했습니다.' })
    }
  }

  const handleHospitalSearch = () => {
    setIsHospitalSearchOpen(true)
  }

  const handleHospitalSelect = (hospital: HospitalSearchResult) => {
    setFormData(prev => ({
      ...prev,
      hospitalName: hospital.hospitalName,
      careNumber: hospital.careNumber,
      zipCode: hospital.zipCode ?? '',
      address: hospital.address ?? '',
      addressDetail: hospital.addressDetail ?? '',
      hospitalPhone: hospital.phone ?? '',
      hospitalWebsite: hospital.website ?? ''
    }))
    setIsHospitalSearchOpen(false)
  }

  // 비밀번호 유효성 검사
  const passwordValidation = useMemo(() => {
    const pw = formData.password
    if (!pw) return { valid: false, status: '' }

    const allowedSpecial = '~!@#$%^&*_-'
    const hasLetter = /[a-zA-Z]/.test(pw)
    const hasDigit = /\d/.test(pw)
    const hasSpecial = new RegExp(`[${allowedSpecial.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')}]`).test(pw)
    const validLength = pw.length >= 8 && pw.length <= 12
    const validChars = /^[a-zA-Z0-9~!@#$%^&*_-]+$/.test(pw)
    const hasAllTypes = hasLetter && hasDigit && hasSpecial

    // 연속번호 체크 (1234, 4321 등)
    const hasSequential = (() => {
      for (let i = 0; i < pw.length - 2; i++) {
        const c1 = pw.charCodeAt(i)
        const c2 = pw.charCodeAt(i + 1)
        const c3 = pw.charCodeAt(i + 2)
        if (c2 - c1 === 1 && c3 - c2 === 1) return true
        if (c1 - c2 === 1 && c2 - c3 === 1) return true
      }
      return false
    })()

    // 동일문자 연속 4개 체크
    const hasRepeated = /(.)\1{3,}/.test(pw)

    // 아이디와 동일한 문구 체크
    const containsUserId = formData.userId.length >= 2 && pw.toLowerCase().includes(formData.userId.toLowerCase())

    const valid = validLength && validChars && hasAllTypes && !hasSequential && !hasRepeated && !containsUserId

    return { valid, status: valid ? '사용가능' : '사용불가' }
  }, [formData.password, formData.userId])

  // 비밀번호 확인 일치 여부
  const passwordConfirmStatus = useMemo(() => {
    if (!formData.passwordConfirm) return { match: false, status: '' }
    const match = formData.password === formData.passwordConfirm
    return { match, status: match ? '일치' : '불일치' }
  }, [formData.password, formData.passwordConfirm])

  const handleSubmit = () => {
    if (mode === 'signup' && (!userIdChecked || !userIdAvailable)) {
      setAlertModal({ isOpen: true, message: '아이디 중복 확인을 해주세요.' })
      return
    }
    if (!formData.hospitalName) {
      setAlertModal({ isOpen: true, message: '병원명을 검색하여 입력해주세요.' })
      return
    }
    const isPasswordChanged = formData.password || formData.passwordConfirm
    if (mode === 'edit' && isPasswordChanged && !formData.currentPassword) {
      setAlertModal({ isOpen: true, message: '현재 비밀번호를 입력해주세요.' })
      return
    }
    if (isPasswordChanged && !passwordValidation.valid) {
      setAlertModal({ isOpen: true, message: '비밀번호 조건을 확인해주세요.' })
      return
    }
    if (isPasswordChanged && !passwordConfirmStatus.match) {
      setAlertModal({ isOpen: true, message: '비밀번호가 일치하지 않습니다.' })
      return
    }
    if (mode === 'signup' && !formData.password) {
      setAlertModal({ isOpen: true, message: '비밀번호를 입력해주세요.' })
      return
    }
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
              onChange={e => {
                const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 8)
                let formatted = digits
                if (digits.length > 4 && digits.length <= 6) {
                  formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`
                } else if (digits.length > 6) {
                  formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`
                }
                setFormData(prev => ({ ...prev, birthDate: formatted }))
              }}
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
                disabled={isFieldDisabled('memberType')}
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
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '')
                setFormData(prev => ({ ...prev, phone: filtered }))
              }}
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
              buttonText={mode === 'signup' ? (checkingUserId ? '확인 중...' : '중복 확인') : undefined}
              onButtonClick={mode === 'signup' ? handleIdCheck : undefined}
              labelExtra={
                mode === 'signup' && userIdChecked ? (
                  <span className={userIdAvailable ? styles.passwordStatusValid : styles.passwordStatus}>
                    {userIdAvailable ? '사용가능' : '사용불가'}
                  </span>
                ) : null
              }
            />

            {mode === 'edit' && (
              <FormField
                label='현재 비밀번호'
                id='currentPassword'
                name='currentPassword'
                type='password'
                placeholder='현재 비밀번호를 입력해주세요'
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            )}

            <div className={styles.passwordFieldWrapper}>
              <FormField
                label={mode === 'edit' ? '새 비밀번호' : '비밀번호'}
                required={mode === 'signup'}
                id='password'
                name='password'
                type='password'
                placeholder='비밀번호를 입력해주세요'
                value={formData.password}
                onChange={handleInputChange}
                labelExtra={
                  passwordValidation.status ? (
                    <span className={passwordValidation.valid ? styles.passwordStatusValid : styles.passwordStatus}>
                      {passwordValidation.status}
                    </span>
                  ) : null
                }
              />
              <div className={styles.passwordRules}>
                <p className={styles.rule}>영문, 숫자, 특수문자 조합 8~12자리 사용 가능, 연속번호는 사용금지</p>
                <p className={styles.rule}>특수문자 사용 가능 범위: ~!@#$%^&*_-</p>
                <p className={styles.rule}>동일문자 연속 4개 사용금지</p>
                <p className={styles.rule}>아이디와 동일한 문구 사용금지</p>
              </div>
            </div>

            <FormField
              label={mode === 'edit' ? '새 비밀번호 확인' : '비밀번호 확인'}
              required={mode === 'signup'}
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              placeholder='비밀번호를 다시 입력해주세요'
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              labelExtra={
                passwordConfirmStatus.status ? (
                  <span className={passwordConfirmStatus.match ? styles.passwordStatusValid : styles.passwordStatus}>
                    {passwordConfirmStatus.status}
                  </span>
                ) : null
              }
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
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
                setFormData(prev => ({ ...prev, licenseNumber: filtered }))
              }}
              disabled={isFieldDisabled('licenseNumber')}
              rightElement={
                <Checkbox
                  checked={formData.isDirector}
                  onChange={handleCheckboxChange('isDirector')}
                  label='원장여부'
                />
              }
              helperText='※ 원장여부 체크 시에만 협력병원 정보수정이 가능합니다.'
            />

            <div className={styles.formField}>
              <InputLabel htmlFor='school'>출신학교</InputLabel>
              <Select
                id='school'
                name='school'
                options={schoolOptions}
                value={formData.school}
                onChange={handleSelectChange('school')}
                disabled={isFieldDisabled('school')}
              />
            </div>

            <FormField
              label='졸업년도'
              id='graduationYear'
              name='graduationYear'
              type='text'
              placeholder='졸업년도를 입력해주세요 (예: 2020)'
              value={formData.graduationYear}
              onChange={e => {
                const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 4)
                setFormData(prev => ({ ...prev, graduationYear: filtered }))
              }}
            />

            <FormField
              label='수련병원명'
              id='trainingHospital'
              name='trainingHospital'
              type='text'
              placeholder='수련병원명을 입력해주세요'
              value={formData.trainingHospital}
              onChange={handleInputChange}
            />

            {/* <div className={styles.formField}>
              <InputLabel htmlFor='gender' required>
                성별
              </InputLabel>
              <Radio
                name='gender'
                value={formData.gender}
                options={genderOptions}
                onChange={() => {}}
                disabled={true}
              />
            </div> */}

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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
            >
              <Input
                type='text'
                id='address'
                name='address'
                placeholder='주소'
                value={formData.address}
                onChange={handleInputChange}
                disabled={true}
              />
              <Input
                type='text'
                id='addressDetail'
                name='addressDetail'
                placeholder='상세주소를 입력해주세요'
                value={formData.addressDetail}
                onChange={handleInputChange}
                disabled={true}
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
              disabled={true}
            />

            <FormField
              label='병원 홈페이지 주소'
              id='hospitalWebsite'
              name='hospitalWebsite'
              type='text'
              placeholder='예) https://refer.kumc.or.kr'
              value={formData.hospitalWebsite}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
        </div>
      )}

      {/* 버튼 그룹 */}
      <ConfirmButtons
        secondaryButton={{ label: cancelButtonText || defaultCancelText, onClick: onCancel }}
        primaryButton={{ label: submitButtonText || defaultSubmitText, onClick: handleSubmit }}
      />

      {/* 병원 검색 팝업 */}
      <HospitalSearchModal
        isOpen={isHospitalSearchOpen}
        onClose={() => setIsHospitalSearchOpen(false)}
        onSelect={handleHospitalSelect}
      />

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
      />
    </div>
  )
}
