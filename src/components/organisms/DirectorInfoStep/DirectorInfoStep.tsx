'use client'

import React, { forwardRef, useImperativeHandle } from 'react'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'
import { DatePicker } from '@/components/atoms/DatePicker/DatePicker'
import { useEnums } from '@/hooks'
import type { DirectorInfoStepData, StepRef } from '@/types/partner-application'
import styles from './DirectorInfoStep.module.scss'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'

export interface DirectorInfoStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
  /** 기관 유형: '병원' 또는 '의원' */
  institutionType?: '병원' | '의원'
  /** 초기값 (임시저장 불러오기용) */
  defaultValues?: Partial<DirectorInfoStepData>
  /** 읽기 전용 모드 (로그인 사용자 정보 표시, 수정 불가) */
  readOnly?: boolean
}

export const DirectorInfoStep = forwardRef<StepRef<DirectorInfoStepData>, DirectorInfoStepProps>(
  ({ currentStep = 2, totalSteps = 8, institutionType = '병원', defaultValues, readOnly = false }, ref) => {
    const { getOptions, loading: enumLoading, error: enumError } = useEnums()
    if (enumError) throw enumError

    const schoolOptions = React.useMemo(() => {
      const enumOpts = getOptions('School')
      return [{ value: '', label: '선택해주세요' }, ...enumOpts]
    }, [getOptions])

    const genderOptions = React.useMemo(() => {
      return getOptions('Gender')
    }, [getOptions])

    const departmentOptions = React.useMemo(() => {
      return getOptions('MedicalDepartment')
    }, [getOptions])

    const [directorName, setDirectorName] = React.useState(defaultValues?.directorName ?? '')
    const [birthDate, setBirthDate] = React.useState(defaultValues?.birthDate ?? '')
    const [licenseNumber, setLicenseNumber] = React.useState(defaultValues?.licenseNumber ?? '')
    const [isDirector, setIsDirector] = React.useState(defaultValues?.isDirector ?? false)
    const [phone, setPhone] = React.useState(defaultValues?.phone ?? '')
    const [gender, setGender] = React.useState(defaultValues?.gender ?? '')
    const [carNumber, setCarNumber] = React.useState(defaultValues?.carNumber ?? '')
    const [email, setEmail] = React.useState(defaultValues?.email ?? '')
    const [school, setSchool] = React.useState(defaultValues?.school ?? '')
    const [graduationYear, setGraduationYear] = React.useState(defaultValues?.graduationYear ?? '')
    const [trainingHospital, setTrainingHospital] = React.useState(defaultValues?.trainingHospital ?? '')
    const [department, setDepartment] = React.useState(defaultValues?.department ?? '')
    const [specialty, setSpecialty] = React.useState(defaultValues?.specialty ?? '')
    const [smsConsent, setSmsConsent] = React.useState(defaultValues?.smsConsent ?? '')
    const [emailConsent, setEmailConsent] = React.useState(defaultValues?.emailConsent ?? '')
    const [replyConsent, setReplyConsent] = React.useState(defaultValues?.replyConsent ?? '')

    useImperativeHandle(ref, () => ({
      getData: () => ({
        directorName,
        birthDate,
        licenseNumber,
        isDirector,
        phone,
        gender,
        carNumber,
        email,
        school,
        graduationYear,
        trainingHospital,
        department,
        specialty,
        smsConsent,
        emailConsent,
        replyConsent
      }),
      validate: () => {
        if (readOnly) return null
        const missing: string[] = []
        if (!directorName.trim()) missing.push('병원장명')
        if (!birthDate.trim()) missing.push('생년월일')
        if (!licenseNumber.trim()) missing.push('의사면허번호')
        if (!phone.trim()) missing.push('휴대전화')
        if (!gender) missing.push('성별')
        if (!email.trim()) missing.push('이메일')
        if (!school.trim()) missing.push('출신학교')
        if (!graduationYear.trim()) missing.push('졸업년도')
        if (!trainingHospital.trim()) missing.push('수련병원')
        if (!department) missing.push('진료과')
        if (!smsConsent) missing.push('SMS 수신 동의여부')
        if (!emailConsent) missing.push('E-mail 수신 동의여부')
        if (!replyConsent) missing.push('회신서 수신 동의 여부')
        if (missing.length > 0) return `다음 필수 항목을 입력해주세요:\n${missing.join(', ')}`
        return null
      }
    }))

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
            value={directorName}
            onChange={e => setDirectorName(e.target.value)}
            disabled={readOnly}
          />

          {/* 생년월일 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='birthDate' required>
              생년월일
            </InputLabel>
            <DatePicker
              id='birthDate'
              name='birthDate'
              placeholder='생년월일을 입력해주세요.'
              value={birthDate}
              onChange={setBirthDate}
              maxDate={new Date()}
              disabled={readOnly}
            />
          </div>

          {/* 의사면허번호 */}
          <FormField
            label='의사면허번호'
            required
            id='licenseNumber'
            name='licenseNumber'
            type='text'
            placeholder='-없이 입력해주세요'
            value={licenseNumber}
            onChange={e => {
              const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
              setLicenseNumber(filtered)
            }}
            disabled={readOnly}
            rightElement={
              <Checkbox checked={isDirector} onChange={() => setIsDirector(!isDirector)} label='원장여부' disabled={readOnly} />
            }
            helperText={`※ 원장여부 체크 시에만 협력${institutionType} 신청/정보수정이 가능합니다.`}
          />

          {/* 휴대전화 */}
          <FormField
            label='휴대전화'
            required
            id='phone'
            name='phone'
            type='tel'
            placeholder='-없이 입력해주세요.'
            value={phone}
            onChange={e => {
              const filtered = e.target.value.replace(/[^0-9]/g, '')
              setPhone(filtered)
            }}
            disabled={readOnly}
          />

          {/* 성별 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='gender' required>
              성별
            </InputLabel>
            <Radio
              name='gender'
              value={gender}
              options={genderOptions}
              onChange={setGender}
              disabled={readOnly}
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
              value={carNumber}
              onChange={e => setCarNumber(e.target.value)}
              disabled={readOnly}
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={readOnly}
          />

          {/* 출신학교 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='school' required>
              출신학교
            </InputLabel>
            <Select id='school' name='school' options={schoolOptions} value={school} onChange={setSchool} disabled={readOnly} />
          </div>

          {/* 졸업년도 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='graduationYear' required>
              졸업년도
            </InputLabel>
            <DatePicker
              id='graduationYear'
              name='graduationYear'
              placeholder='졸업년도를 입력해주세요.'
              value={graduationYear}
              onChange={setGraduationYear}
              showYearPicker
              maxDate={new Date()}
              disabled={readOnly}
            />
          </div>

          {/* 수련병원 */}
          <FormField
            label='수련병원'
            required
            id='trainingHospital'
            name='trainingHospital'
            type='text'
            placeholder='수련병원을 입력해주세요.'
            value={trainingHospital}
            onChange={e => setTrainingHospital(e.target.value)}
            disabled={readOnly}
          />

          {/* 진료과 */}
          <div className={styles.formField}>
            <InputLabel htmlFor='department' required>
              진료과
            </InputLabel>
            <Select
              id='department'
              name='department'
              options={departmentOptions}
              value={department}
              onChange={setDepartment}
              disabled={readOnly}
            />
          </div>

          {/* 세부전공 */}
          <FormField
            label='세부전공'
            id='specialty'
            name='specialty'
            type='text'
            placeholder=''
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            disabled={readOnly}
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
              disabled={readOnly}
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
              disabled={readOnly}
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
              disabled={readOnly}
            />

            <InfoNote message='동의 여부 변경 시 진료협력센터로 연락 주시기 바랍니다.' />
          </div>
        </div>
      </div>
    )
  }
)
DirectorInfoStep.displayName = 'DirectorInfoStep'
