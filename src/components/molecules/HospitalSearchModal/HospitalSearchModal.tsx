'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { useDaumPostcode } from '@/hooks/useDaumPostcode'
import { useHospital } from '@/contexts/HospitalContext'
import { EHR_HOSPITAL_SEARCH_QUERY } from '@/graphql/hospital/queries'
import { REGISTER_HOSPITAL_MUTATION } from '@/graphql/hospital/mutations'
import type {
  EhrGetCollaboratingHospitalsQuery,
  EhrGetCollaboratingHospitalsQueryVariables,
  RegisterHospitalMutation,
  RegisterHospitalMutationVariables
} from '@/graphql/__generated__/types'
import { HospitalCode } from '@/graphql/__generated__/types'
import styles from './HospitalSearchModal.module.scss'

export interface HospitalSearchResult {
  /** 병원명 */
  hospitalName: string
  /** 요양기관번호 */
  careNumber: string
  /** 주소 */
  address?: string
  /** 상세주소 */
  addressDetail?: string
  /** 우편번호 */
  zipCode?: string
  /** 대표전화 */
  phone?: string
  /** 대표자명 */
  representative?: string
  /** 홈페이지 */
  website?: string
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

const HOSPITAL_CODE_MAP: Record<string, HospitalCode> = {
  anam: HospitalCode.Anam,
  guro: HospitalCode.Guro,
  ansan: HospitalCode.Ansan
}

export const HospitalSearchModal: React.FC<HospitalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  closeOnBackdropClick = false,
  className = ''
}) => {
  const { hospitalId } = useHospital()
  const [searchHospitals, { loading: searchLoading }] = useLazyQuery<
    EhrGetCollaboratingHospitalsQuery,
    EhrGetCollaboratingHospitalsQueryVariables
  >(EHR_HOSPITAL_SEARCH_QUERY, {
    fetchPolicy: 'network-only'
  })
  const [registerHospital, { loading: registerLoading }] = useMutation<
    RegisterHospitalMutation,
    RegisterHospitalMutationVariables
  >(REGISTER_HOSPITAL_MUTATION)

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
  const [regWebsite, setRegWebsite] = useState('')
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })

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
      setRegWebsite('')
    }
  }, [isOpen])

  const handlePostcodeComplete = useCallback((result: { zipCode: string; address: string }) => {
    setRegZipCode(result.zipCode)
    setRegAddress(result.address)
  }, [])

  const { openPostcode } = useDaumPostcode(handlePostcodeComplete)

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSearch = async () => {
    if (!hospitalName.trim() && !careNumber.trim()) {
      setAlertModal({ isOpen: true, message: '병원명 또는 요양기관번호를 기입해주세요.' })
      return
    }

    // 검색 시작 시 결과 화면으로 전환 (스켈레톤 표시)
    setSearchResults([])
    setView('results')

    const hospitalCodeEnum = HOSPITAL_CODE_MAP[hospitalId] || HospitalCode.Anam
    try {
      const { data } = await searchHospitals({
        variables: {
          input: {
            hospitalCode: hospitalCodeEnum,
            ...(hospitalName.trim() && { hsptNm: hospitalName.trim() }),
            ...(careNumber.trim() && { hsptClsfCd: careNumber.trim() })
          }
        }
      })

      const hospitals = data?.ehrGetCollaboratingHospitals?.hospitals
      if (hospitals && hospitals.length > 0) {
        setSearchResults(
          hospitals.map(h => ({
            hospitalName: h.name || '',
            careNumber: h.phisCode || '',
            address: h.address || '',
            addressDetail: h.addressDetail || '',
            zipCode: h.zipCode || '',
            phone: h.phone || '',
            representative: h.representative || '',
            website: h.website || ''
          }))
        )
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error('병원 검색 오류:', err)
      setSearchResults([])
    }
  }

  const handleHospitalClick = (hospital: HospitalSearchResult) => {
    onSelect(hospital)
  }

  const handleNewRegistration = () => {
    setView('registration')
  }

  const handleRegistrationSubmit = async () => {
    if (
      !regHospitalName.trim() ||
      !regRepresentativeName.trim() ||
      !regCareNumber.trim() ||
      !regZipCode.trim() ||
      !regAddress.trim() ||
      !regPhone.trim()
    ) {
      setAlertModal({ isOpen: true, message: '필수 항목을 모두 입력해주세요.' })
      return
    }

    const hospitalCode = HOSPITAL_CODE_MAP[hospitalId] || HospitalCode.Anam
    try {
      const { data } = await registerHospital({
        variables: {
          input: {
            hospitalCode,
            hospitalName: regHospitalName.trim(),
            representative: regRepresentativeName.trim(),
            careInstitutionNo: regCareNumber.trim(),
            zipCode: regZipCode.trim(),
            address: regAddress.trim(),
            addressDetail: regDetailAddress.trim() || undefined,
            phone: regPhone.trim(),
            website: regWebsite.trim() || undefined
          }
        }
      })

      if (data?.registerHospital) {
        const h = data.registerHospital
        onSelect({
          hospitalName: h.name,
          careNumber: h.phisCode || '',
          address: h.address || '',
          addressDetail: h.addressDetail || '',
          zipCode: h.zipCode || '',
          phone: h.phone || '',
          representative: h.representative || '',
          website: h.website || ''
        })
      }
    } catch (err) {
      console.error('병원 등록 오류:', err)
      const message = err instanceof Error ? err.message : '병원 등록에 실패했습니다.'
      setAlertModal({ isOpen: true, message })
    }
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
      renderCell: item => [item.address, item.addressDetail].filter(Boolean).join(' ')
    }
  ]

  return createPortal(
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
                        onChange={e => {
                          const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 8)
                          setCareNumber(filtered)
                        }}
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
                disabled={searchLoading}
                className={styles.searchButton}
                data-testid='hospital-search-submit-button'
              >
                {searchLoading ? '검색 중...' : '검색'}
              </Button>
            </>
          )}

          {view === 'results' && (
            <>
              {/* 검색 결과 */}
              <div className={styles.resultArea} data-testid='hospital-search-result-area'>
                {searchLoading ? (
                  <div className={styles.skeletonArea}>
                    <Skeleton width='100%' height={40} variant='rounded' />
                    <Skeleton width='100%' height={40} variant='rounded' count={5} gap={8} />
                  </div>
                ) : searchResults.length > 0 ? (
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
                        <span className={styles.mobileAddress}>{[item.address, item.addressDetail].filter(Boolean).join(' ')}</span>
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
                      onChange={e => {
                        const filtered = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]/g, '').slice(0, 50)
                        setRegHospitalName(filtered)
                      }}
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
                      onChange={e => {
                        const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 8)
                        setRegCareNumber(filtered)
                      }}
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
                      onButtonClick={openPostcode}
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
                      onChange={e => {
                        const filtered = e.target.value.replace(/[^0-9]/g, '')
                        setRegPhone(filtered)
                      }}
                    />
                  </div>

                  {/* 병원 홈페이지 주소 */}
                  <div data-testid='reg-website-field'>
                    <FormField
                      label='병원 홈페이지 주소'
                      id='reg-website'
                      name='regWebsite'
                      type='text'
                      placeholder='예) https://refer.kumc.or.kr'
                      value={regWebsite}
                      onChange={e => setRegWebsite(e.target.value)}
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
                disabled={registerLoading}
                className={styles.searchButton}
                data-testid='hospital-registration-submit-button'
              >
                {registerLoading ? '등록 중...' : '신규등록'}
              </Button>
            </>
          )}
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
      />
    </div>,
    document.body
  )
}
