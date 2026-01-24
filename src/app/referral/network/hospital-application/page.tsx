'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Button } from '@/components/atoms/Button/Button'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'

interface HospitalFormData {
  hospitalName: string
  medicalInstitutionNumber: string
  postalCode: string
  address: string
  detailAddress: string
  phoneNumber: string
  faxNumber: string
  website: string
}

const STORAGE_KEY = 'hospital-application-form'

export default function HospitalApplicationPage() {
  const router = useRouter()

  // 폼 데이터 상태
  const [formData, setFormData] = useState<HospitalFormData>({
    hospitalName: '',
    medicalInstitutionNumber: '',
    postalCode: '',
    address: '',
    detailAddress: '',
    phoneNumber: '',
    faxNumber: '',
    website: ''
  })

  // 에러 상태
  const [errors, setErrors] = useState<Partial<Record<keyof HospitalFormData, string>>>({})

  // 안내 메시지
  const guideMessages = useMemo(() => {
    return [
      '협력병원 신청을 위해서는 아래 항목을 작성해 주시기 바랍니다.',
      '접수된 내역을 확인 후에 담당자가 전화를 드리며, 등록절차를 진행합니다.',
      '*은 필수 입력항목입니다.'
    ]
  }, [])

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof HospitalFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    // 에러 초기화
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // 병원명 검색 핸들러
  const handleHospitalSearch = () => {
    // TODO: 병원명 검색 API 연동
    console.log('병원명 검색:', formData.hospitalName)
    alert('병원명 검색 기능은 준비 중입니다.')
  }

  // 우편번호 검색 핸들러
  const handlePostalCodeSearch = () => {
    // TODO: 다음 주소 API 연동
    console.log('우편번호 검색')
    alert('우편번호 검색 기능은 준비 중입니다.')
  }

  // 폼 검증
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof HospitalFormData, string>> = {}

    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = '병원명을 입력해주세요.'
    }

    if (!formData.medicalInstitutionNumber.trim()) {
      newErrors.medicalInstitutionNumber = '요양기관번호를 입력해주세요.'
    }

    if (!formData.postalCode.trim() || !formData.address.trim()) {
      newErrors.postalCode = '주소를 입력해주세요.'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = '병원전화번호를 입력해주세요.'
    }

    if (!formData.faxNumber.trim()) {
      newErrors.faxNumber = '팩스번호를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 저장 핸들러
  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
      alert('임시 저장되었습니다.')
    } catch (error) {
      console.error('저장 실패:', error)
      alert('저장에 실패했습니다.')
    }
  }

  // 불러오기 핸들러
  const handleLoad = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedData = JSON.parse(saved) as HospitalFormData
        setFormData(parsedData)
        setErrors({})
        alert('저장된 데이터를 불러왔습니다.')
      } else {
        alert('저장된 데이터가 없습니다.')
      }
    } catch (error) {
      console.error('불러오기 실패:', error)
      alert('데이터를 불러오는데 실패했습니다.')
    }
  }

  // 다음 단계 핸들러
  const handleNext = () => {
    if (validateForm()) {
      // TODO: 다음 단계로 이동
      console.log('다음 단계:', formData)
      alert('다음 단계로 이동합니다. (준비 중)')
    }
  }

  // 이전 단계 핸들러
  const handlePrevious = () => {
    // TODO: 이전 단계로 이동 또는 목록으로
    router.back()
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력병원 신청</h1>

          <div className={styles.content}>
            {/* 협력병원 신청 안내 */}
            <div className={styles.guideSection}>
              <SectionTitle title='협력병원 신청 안내' className={styles.sectionTitle} />
              <InfoBox variant='guide' messages={guideMessages} showBullets={true} highlightLast={true} />
            </div>

            {/* 저장/불러오기 버튼 */}
            <div className={styles.actionButtons}>
              <Button variant='primary' size='small' pill onClick={handleSave}>
                저장
              </Button>
              <Button variant='outline' size='small' pill onClick={handleLoad}>
                불러오기
              </Button>
            </div>

            {/* 폼 섹션 */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <div className={styles.formHeaderLeft}>
                  <h3 className={styles.formTitle}>병원 정보</h3>
                  <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
                </div>
                <div className={styles.stepIndicator}>
                  <span className={styles.stepNumber}>1</span>
                  <span className={styles.stepSeparator}>/</span>
                  <span className={styles.stepTotal}>8</span>
                </div>
              </div>
              <div className={styles.formDivider}></div>

              <div className={styles.formContent}>
                {/* 병원명 */}
                <div className={styles.formField}>
                  <InputLabel htmlFor='hospitalName' required>
                    병원명
                  </InputLabel>
                  <div className={styles.inputWithButton}>
                    <Input
                      id='hospitalName'
                      type='text'
                      placeholder='Input Text'
                      value={formData.hospitalName}
                      onChange={handleInputChange('hospitalName')}
                      error={errors.hospitalName}
                      className={styles.hospitalNameInput}
                    />
                    <Button
                      variant='primary'
                      size='small'
                      onClick={handleHospitalSearch}
                      className={styles.searchButton}
                    >
                      <span>검색</span>
                      <SearchIcon width={22} height={22} fill='#fff' />
                    </Button>
                  </div>
                </div>

                {/* 요양기관번호 */}
                <div className={styles.formField}>
                  <InputLabel htmlFor='medicalInstitutionNumber' required>
                    요양기관번호
                  </InputLabel>
                  <Input
                    id='medicalInstitutionNumber'
                    type='text'
                    placeholder=' '
                    value={formData.medicalInstitutionNumber}
                    onChange={handleInputChange('medicalInstitutionNumber')}
                    error={errors.medicalInstitutionNumber}
                  />
                </div>

                {/* 병원주소 */}
                <div className={styles.formField}>
                  <InputLabel htmlFor='postalCode' required>
                    병원주소
                  </InputLabel>
                  <div className={styles.inputWithButton}>
                    <Input
                      id='postalCode'
                      type='text'
                      placeholder='Input Text'
                      value={formData.postalCode}
                      onChange={handleInputChange('postalCode')}
                      error={errors.postalCode}
                      className={styles.postalCodeInput}
                    />
                    <Button
                      variant='primary'
                      size='small'
                      onClick={handlePostalCodeSearch}
                      className={styles.searchButton}
                    >
                      <span>우편번호 검색</span>
                      <SearchIcon width={22} height={22} fill='#fff' />
                    </Button>
                  </div>
                  <Input
                    type='text'
                    placeholder=' '
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    error={errors.postalCode}
                    className={styles.addressInput}
                    disabled
                  />
                  <Input
                    type='text'
                    placeholder='상세주소를 입력해주세요.'
                    value={formData.detailAddress}
                    onChange={handleInputChange('detailAddress')}
                    className={styles.detailAddressInput}
                  />
                </div>

                {/* 병원전화번호 */}
                <div className={styles.formField}>
                  <InputLabel htmlFor='phoneNumber' required>
                    병원전화번호
                  </InputLabel>
                  <Input
                    id='phoneNumber'
                    type='tel'
                    placeholder=' '
                    value={formData.phoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                    error={errors.phoneNumber}
                  />
                </div>

                {/* 팩스번호 */}
                <div className={styles.formField}>
                  <InputLabel htmlFor='faxNumber' required>
                    팩스번호
                  </InputLabel>
                  <Input
                    id='faxNumber'
                    type='tel'
                    placeholder=' '
                    value={formData.faxNumber}
                    onChange={handleInputChange('faxNumber')}
                    error={errors.faxNumber}
                  />
                </div>

                {/* 병원 홈페이지 주소 */}
                <div className={styles.formField}>
                  <InputLabel htmlFor='website'>병원 홈페이지 주소</InputLabel>
                  <Input
                    id='website'
                    type='url'
                    placeholder='ex) https://refer.kumc.or.kr/'
                    value={formData.website}
                    onChange={handleInputChange('website')}
                  />
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className={styles.formActions}>
              <Button variant='outline' size='large' onClick={handlePrevious}>
                이전
              </Button>
              <Button variant='primary' size='large' onClick={handleNext}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
