'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import styles from './HospitalSearchModal.module.scss'

export interface HospitalSearchResult {
  /** 병원명 */
  hospitalName: string
  /** 요양기관번호 */
  careNumber: string
  /** 주소 */
  address?: string
}

export interface HospitalSearchModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 병원 선택 핸들러 */
  onSelect: (hospital: HospitalSearchResult) => void
  /** 배경 클릭 시 닫기 여부 (기본값: false) */
  closeOnBackdropClick?: boolean
  /** 추가 클래스명 */
  className?: string
}

// 테스트용 Mock 데이터
const MOCK_RESULTS: HospitalSearchResult[] = [
  { hospitalName: '고대협력병원', careNumber: '11100001', address: '서울특별시 성북구 안암로 145' },
  { hospitalName: '고대안산병원', careNumber: '11100002', address: '경기도 안산시 단원구 적금로 123' },
  { hospitalName: '고대구로병원', careNumber: '11100003', address: '서울특별시 구로구 구로동로 148' },
  { hospitalName: '고대의료원', careNumber: '11100004', address: '서울특별시 성북구 고려대로 73' },
  { hospitalName: '고대안암병원', careNumber: '11100005', address: '서울특별시 성북구 안암동5가 126-1' }
]

export const HospitalSearchModal: React.FC<HospitalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  closeOnBackdropClick = false,
  className = ''
}) => {
  const [hospitalName, setHospitalName] = useState('')
  const [careNumber, setCareNumber] = useState('')
  const [view, setView] = useState<'search' | 'results' | 'registration'>('search')
  const [searchResults, setSearchResults] = useState<HospitalSearchResult[]>([])
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))

  // 신규등록 폼 상태
  const [regHospitalName, setRegHospitalName] = useState('')
  const [regRepresentativeName, setRegRepresentativeName] = useState('')
  const [regCareNumber, setRegCareNumber] = useState('')
  const [regZipCode, setRegZipCode] = useState('')
  const [regAddress, setRegAddress] = useState('')
  const [regDetailAddress, setRegDetailAddress] = useState('')
  const [regPhone, setRegPhone] = useState('')

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // 모바일 여부 확인
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // 모달이 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      setHospitalName('')
      setCareNumber('')
      setView('search')
      setSearchResults([])
      setRegHospitalName('')
      setRegRepresentativeName('')
      setRegCareNumber('')
      setRegZipCode('')
      setRegAddress('')
      setRegDetailAddress('')
      setRegPhone('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSearch = () => {
    // TODO: 실제 검색 API 호출
    if (!hospitalName.trim() && !careNumber.trim()) {
      setSearchResults([])
    } else {
      setSearchResults(MOCK_RESULTS)
    }
    setView('results')
  }

  const handleHospitalClick = (hospital: HospitalSearchResult) => {
    onSelect(hospital)
  }

  const handleNewRegistration = () => {
    setView('registration')
  }

  const handleRegistrationSubmit = () => {
    // TODO: 실제 등록 API 호출
    console.log('신규등록 제출', {
      regHospitalName,
      regRepresentativeName,
      regCareNumber,
      regZipCode,
      regAddress,
      regDetailAddress,
      regPhone
    })
  }

  const handleZipCodeSearch = () => {
    // TODO: 우편번호 검색 API 연동
    console.log('우편번호 검색')
  }

  // 검색 결과 테이블 컬럼 정의
  const hospitalColumns: TableColumn<HospitalSearchResult>[] = [
    {
      id: 'hospitalName',
      label: '병원명',
      width: '150px',
      align: 'center',
      renderCell: item => <span className={styles.hospitalNameCell}>{item.hospitalName}</span>
    },
    {
      id: 'address',
      label: '병원 주소',
      width: '1fr',
      align: 'center',
      field: 'address'
    }
  ]

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} data-testid='hospital-search-modal-backdrop'>
      <div className={`${styles.modal} ${className}`} data-testid='hospital-search-modal'>
        {/* 헤더 */}
        <div className={styles.header} data-testid='hospital-search-modal-header'>
          <h2 className={styles.title}>{view === 'registration' ? '신규등록' : '병원 검색'}</h2>
          <button type='button' onClick={onClose} className={styles.closeButton} aria-label='닫기'>
            <CloseIcon width={40} height={40} />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className={styles.content} data-testid='hospital-search-modal-content'>
          {view === 'search' && (
            <>
              {/* 검색 폼 */}
              <div className={styles.formArea}>
                {/* 입력 필드 그룹 */}
                <div className={styles.inputGroup} data-testid='hospital-search-input-group'>
                  {/* 병원명 */}
                  <div className={styles.inputField} data-testid='hospital-name-field'>
                    <label className={styles.inputLabel}>병원명</label>
                    <div className={styles.inputWithButton}>
                      <Input
                        type='text'
                        id='hospital-name'
                        name='hospitalName'
                        placeholder='병원명을 입력해주세요'
                        value={hospitalName}
                        onChange={e => setHospitalName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleSearch()
                        }}
                        className={styles.searchInput}
                      />
                    </div>
                  </div>

                  {/* 요양기관번호 */}
                  <div className={styles.inputField} data-testid='care-number-field'>
                    <label className={styles.inputLabel}>요양기관번호</label>
                    <div className={styles.inputWithButton}>
                      <Input
                        type='text'
                        id='care-number'
                        name='careNumber'
                        placeholder='요양기관번호를 입력해주세요.'
                        value={careNumber}
                        onChange={e => setCareNumber(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleSearch()
                        }}
                        className={styles.searchInput}
                      />
                    </div>
                  </div>
                </div>

                {/* 안내 텍스트 */}
                <div data-testid='hospital-search-info-text'>
                  <InfoNote
                    message={
                      <>
                        병원명 또는 요양기관번호를 검색 후 병원 이름을 클릭하시면 소속병원이 선택됩니다.
                        <br />
                        검색 후 소속병원이 없을 경우 신규 등록 하시기 바랍니다.
                      </>
                    }
                    iconSize={24}
                    iconAlign={isMobile ? 'top' : 'center'}
                    className={styles.infoNote}
                  />
                </div>
              </div>

              {/* 검색 버튼 */}
              <Button
                type='button'
                variant='primary'
                onClick={handleSearch}
                className={styles.searchButton}
                data-testid='hospital-search-submit-button'
              >
                검색
              </Button>
            </>
          )}

          {view === 'results' && (
            <>
              {/* 검색 결과 */}
              <div className={styles.resultArea} data-testid='hospital-search-result-area'>
                {searchResults.length > 0 ? (
                  <Table<HospitalSearchResult>
                    columns={hospitalColumns}
                    data={searchResults}
                    getRowKey={(item, index) => `${item.careNumber}-${index}`}
                    onRowClick={handleHospitalClick}
                    scrollWithHeader={true}
                    scrollableHeight='280px'
                    className={styles.resultTable}
                    renderMobileCard={(item, index) => (
                      <div
                        className={styles.mobileCard}
                        onClick={() => handleHospitalClick(item)}
                        data-testid={`hospital-result-mobile-${index}`}
                      >
                        <span className={styles.mobileHospitalName}>{item.hospitalName}</span>
                        <span className={styles.mobileAddress}>{item.address}</span>
                      </div>
                    )}
                  />
                ) : (
                  <div className={styles.emptyResultContainer} data-testid='hospital-search-empty-result'>
                    <div className={styles.emptyResultHeader}>
                      <div className={styles.emptyResultHeaderCell} style={{ width: '150px', flex: '0 0 auto' }}>
                        병원명
                      </div>
                      <div className={styles.emptyResultSeparator}></div>
                      <div className={styles.emptyResultHeaderCell} style={{ flex: '1 1 0' }}>
                        병원 주소
                      </div>
                    </div>
                    <div className={styles.emptyResultBox}>
                      <span>검색결과가 존재하지 않습니다.</span>
                    </div>
                  </div>
                )}

                {/* 결과 안내 텍스트 */}
                <div data-testid='hospital-search-result-info-text'>
                  <InfoNote
                    message={
                      <>
                        소속병원명을 클릭하세요.
                        <br />
                        소속병원이 없을 경우 신규등록하시기 바랍니다.
                      </>
                    }
                    iconSize={24}
                    iconAlign={'center'}
                    className={styles.infoNote}
                  />
                </div>
              </div>

              {/* 신규등록 버튼 */}
              <Button
                type='button'
                variant='primary'
                onClick={handleNewRegistration}
                className={styles.searchButton}
                data-testid='hospital-new-registration-button'
              >
                신규등록
              </Button>
            </>
          )}

          {view === 'registration' && (
            <>
              {/* 신규등록 폼 */}
              <div className={styles.formArea} data-testid='hospital-registration-form'>
                <div className={styles.regFormGrid} data-testid='hospital-registration-input-group'>
                  {/* 병원명 */}
                  <div data-testid='reg-hospital-name-field'>
                    <FormField
                      label='병원명'
                      required
                      id='reg-hospital-name'
                      name='regHospitalName'
                      value={regHospitalName}
                      onChange={e => setRegHospitalName(e.target.value)}
                      placeholder='병원명을 입력해주세요'
                    />
                  </div>

                  {/* 대표자명 */}
                  <div data-testid='reg-representative-name-field'>
                    <FormField
                      label='대표자명'
                      required
                      id='reg-representative-name'
                      name='regRepresentativeName'
                      placeholder='대표자명을 입력해주세요'
                      value={regRepresentativeName}
                      onChange={e => setRegRepresentativeName(e.target.value)}
                    />
                  </div>

                  {/* 요양기관번호 */}
                  <div data-testid='reg-care-number-field'>
                    <FormField
                      label='요양기관번호'
                      required
                      id='reg-care-number'
                      name='regCareNumber'
                      placeholder='요양기관번호를 입력해주세요.'
                      value={regCareNumber}
                      onChange={e => setRegCareNumber(e.target.value)}
                    />
                  </div>

                  {/* 병원주소 */}
                  <div data-testid='reg-address-field'>
                    <FormField
                      label='병원주소'
                      required
                      id='reg-zip-code'
                      name='regZipCode'
                      placeholder=''
                      value={regZipCode}
                      onChange={e => setRegZipCode(e.target.value)}
                      disabled
                      buttonText='우편번호 검색'
                      onButtonClick={handleZipCodeSearch}
                      mobileStack
                    >
                      <Input
                        type='text'
                        id='reg-address'
                        name='regAddress'
                        placeholder=''
                        value={regAddress}
                        disabled
                        onChange={e => setRegAddress(e.target.value)}
                      />
                      <Input
                        type='text'
                        id='reg-detail-address'
                        name='regDetailAddress'
                        placeholder='상세주소를 입력해 주세요.'
                        value={regDetailAddress}
                        onChange={e => setRegDetailAddress(e.target.value)}
                      />
                    </FormField>
                  </div>

                  {/* 대표전화 */}
                  <div data-testid='reg-phone-field'>
                    <FormField
                      label='대표전화'
                      required
                      id='reg-phone'
                      name='regPhone'
                      placeholder='-없이 입력해주세요.'
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* 안내 텍스트 */}
                <div data-testid='hospital-registration-info-text'>
                  <InfoNote
                    message='내용을 입력하신 후, 신규등록을 클릭하시면 병원정보가 등록되며, 검색화면으로 이동합니다.'
                    iconSize={24}
                    iconAlign={isMobile ? 'top' : 'center'}
                    className={styles.infoNote}
                  />
                </div>
              </div>

              {/* 신규등록 버튼 */}
              <Button
                type='button'
                variant='primary'
                onClick={handleRegistrationSubmit}
                className={styles.searchButton}
                data-testid='hospital-registration-submit-button'
              >
                신규등록
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
