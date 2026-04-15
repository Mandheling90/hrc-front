'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, InfoRowContent } from '@/components/molecules/CardList/CardList'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Input } from '@/components/atoms/Input/Input'
import { DatePicker } from '@/components/atoms/DatePicker/DatePicker'
import { Select } from '@/components/atoms/Select/Select'
import { Button } from '@/components/atoms/Button/Button'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { ConsultBadgeIcon } from '@/components/icons/ConsultBadgeIcon'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { MedicalReplyModal, MedicalReplyData } from '@/components/organisms/MedicalReplyModal/MedicalReplyModal'
import { useReferralPatients, ReferralPatientItem } from '@/hooks/useReferralPatients'
import { useReferralReply } from '@/hooks/useReferralReply'
import { useHospital, useHospitalRouter } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import styles from './page.module.scss'

const emptyReplyData: MedicalReplyData = {
  referralHospital: '',
  referralDoctor: '',
  referralDate: '',
  patientName: '',
  gender: '',
  birthDate: '',
  department: '',
  doctor: '',
  treatmentPeriod: '',
  registrationNumber: '',
  diagnosis: '',
  medicalOpinion: '',
  createdDate: ''
}

// API 응답을 테이블 표시용으로 변환
interface PatientData {
  referralDate: string
  patientName: string
  gender: string
  age: number
  treatmentDate: string
  department: string
  doctor: string
  doctorCanConsult: boolean
  consentStatus: 'Y' | 'N' | null
  prescriptionStatus: 'Y' | 'N' | null
  hasResult: boolean
  hasReply: boolean
  isExpired?: boolean
  patientNo: string
  referralDepartmentName: string
  referralDoctorName: string
  hospitalName: string
  // 회신서 조회용 원본 값
  departmentCode: string
  doctorId: string
  rawReferralDate: string
  referralSeqNo: string
}

// YYYYMMDD → YYYY-MM-DD 변환
function formatApiDate(dateStr: string | null): string {
  if (!dateStr) return ''
  if (dateStr.length === 8) {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
  }
  return dateStr
}

function mapApiToPatientData(item: ReferralPatientItem): PatientData {
  const referralDate = formatApiDate(item.referralDate)
  // 의뢰일로부터 1년 이상 경과시 만료 처리
  const isExpired = referralDate
    ? new Date().getTime() - new Date(referralDate).getTime() > 365 * 24 * 60 * 60 * 1000
    : false

  return {
    referralDate,
    patientName: item.patientName || '',
    gender: item.genderCode === 'M' ? '남' : item.genderCode === 'F' ? '여' : item.genderCode || '',
    age: Number(item.age) || 0,
    treatmentDate: formatApiDate(item.visitDate),
    department: item.departmentName || '',
    doctor: item.doctorName || '',
    doctorCanConsult: item.isConsultant === true,
    consentStatus: 'Y',
    prescriptionStatus: item.drugOrderExists === 'Y' || item.drugOrderExists === true ? 'Y' : item.drugOrderExists === 'N' || item.drugOrderExists === false ? 'N' : null,
    hasResult: !!item.visitDate && !!item.patientNo,
    hasReply: !!item.replyDate && !!item.patientNo,
    isExpired,
    patientNo: item.patientNo || '',
    referralDepartmentName: item.referralDepartmentName || '',
    referralDoctorName: item.referralDoctorName || '',
    hospitalName: item.hospitalName || '',
    departmentCode: item.departmentCode || '',
    doctorId: item.doctorId || '',
    rawReferralDate: item.referralDate || '',
    referralSeqNo: item.referralSeqNo || ''
  }
}

const periodOptions = [
  { value: '1month', label: '1개월' },
  { value: '6months', label: '6개월' },
  { value: '1year', label: '1년' },
  { value: '3years', label: '3년' }
]

const sortOptions = [
  { value: 'latest', label: '최신 순' },
  { value: 'oldest', label: '오래된 순' },
  { value: 'name', label: '환자명 순' }
]

const searchTypeOptions = [
  { value: 'all', label: '전체' },
  { value: 'department', label: '진료과' },
  { value: 'doctor', label: '진료의' },
  { value: 'diagnosis', label: '진단명' }
]

const PAGE_SIZE = 10

function calcDateRange(periodValue: string) {
  const now = new Date()
  const from = new Date(now)
  switch (periodValue) {
    case '1month': from.setMonth(from.getMonth() - 1); break
    case '6months': from.setMonth(from.getMonth() - 6); break
    case '1year': from.setFullYear(from.getFullYear() - 1); break
    case '3years': from.setFullYear(from.getFullYear() - 3); break
  }
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return { start: fmt(from), end: fmt(now) }
}

export default function PatientInquiryPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [period, setPeriod] = useState('3years')
  const [sortBy, setSortBy] = useState('latest')
  const [searchType, setSearchType] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [appliedKeyword, setAppliedKeyword] = useState('')
  const [appliedSearchType, setAppliedSearchType] = useState('all')
  const [appliedStartDate, setAppliedStartDate] = useState('')
  const [appliedEndDate, setAppliedEndDate] = useState('')
  const [appliedSortBy, setAppliedSortBy] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTrigger, setSearchTrigger] = useState(0)
  const [isTablet, setIsTablet] = useState(false)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { hospitalId } = useHospital()
  const { user } = useAuthContext()
  const { searchReferralPatients, patients, totalCount, loading } = useReferralPatients()
  const { fetchReferralReply } = useReferralReply()
  const router = useHospitalRouter()
  const [replyData, setReplyData] = useState<MedicalReplyData>(emptyReplyData)

  // 클라이언트 마운트 시 초기값 설정 (hydration mismatch 방지)
  useEffect(() => {
    const { start, end } = calcDateRange('1year')
    setStartDate(start)
    setEndDate(end)
    setAppliedStartDate(start)
    setAppliedEndDate(end)
    setIsTablet(window.innerWidth <= 1429)
    setIsMounted(true)
  }, [])

  // 전체 데이터를 매핑 후 클라이언트에서 필터/정렬/페이징
  const allPatientData: PatientData[] = patients.map(item => mapApiToPatientData(item))

  const filteredData = allPatientData
    .filter(item => {
      // 날짜 필터
      const refDate = item.referralDate
      if (refDate && appliedStartDate && refDate < appliedStartDate) return false
      if (refDate && appliedEndDate && refDate > appliedEndDate) return false
      // 키워드 검색
      if (appliedKeyword) {
        const kw = appliedKeyword.toLowerCase()
        switch (appliedSearchType) {
          case 'department': return item.department.toLowerCase().includes(kw)
          case 'doctor': return item.doctor.toLowerCase().includes(kw)
          case 'diagnosis': return false // API에 진단명 필드 없음
          default: return (
            item.department.toLowerCase().includes(kw) ||
            item.doctor.toLowerCase().includes(kw) ||
            item.patientName.toLowerCase().includes(kw)
          )
        }
      }
      return true
    })
    .sort((a, b) => {
      switch (appliedSortBy) {
        case 'oldest': return a.referralDate.localeCompare(b.referralDate)
        case 'name': return a.patientName.localeCompare(b.patientName)
        default: return b.referralDate.localeCompare(a.referralDate) // latest
      }
    })

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE))
  const patientData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // 기간 라디오 변경 시 날짜 자동 계산 (마운트 초기화 이후에만)
  useEffect(() => {
    if (!isMounted) return
    const { start, end } = calcDateRange(period)
    setStartDate(start)
    setEndDate(end)
  }, [period, isMounted])

  // 데이터 조회 (마운트 후 1회 + 검색 시)
  useEffect(() => {
    if (!isMounted) return
    searchReferralPatients({ hospitalCode: hospitalId.toUpperCase() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, hospitalId, searchTrigger])

  // 태블릿 여부 확인
  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth <= 1429)
    }

    checkIsTablet()
    window.addEventListener('resize', checkIsTablet)

    return () => {
      window.removeEventListener('resize', checkIsTablet)
    }
  }, [])

  const patientColumns: TableColumn<PatientData>[] = [
    { id: 'referralDate', label: '의뢰일자', field: 'referralDate', width: '120px' },
    { id: 'patientName', label: '환자명', field: 'patientName', width: '110px' },
    { id: 'gender', label: '성별', field: 'gender', width: '60px' },
    { id: 'age', label: '나이', field: 'age', width: '60px' },
    { id: 'treatmentDate', label: '진료일', field: 'treatmentDate', width: '120px' },
    { id: 'department', label: '진료과', field: 'department', width: '1fr' },
    {
      id: 'doctor',
      label: '진료의',
      width: '110px',
      renderCell: item => (
        <div className={styles.doctorCell}>
          {item.doctorCanConsult ? (
            <button
              type='button'
              className={styles.consultableBtn}
              onClick={() => {
                const params = new URLSearchParams({
                  doctorId: item.doctorId,
                  doctorName: item.doctor,
                  department: item.department
                })
                router.push(`/network/e-consult?${params.toString()}`)
              }}
            >
              <span className={styles.consultable}>{item.doctor}</span>
              <ConsultBadgeIcon />
            </button>
          ) : (
            <span>{item.doctor}</span>
          )}
        </div>
      )
    },
    {
      id: 'consentStatus',
      label: '정보공개 동의여부',
      width: '80px',
      renderCell: item => (
        <span className={item.consentStatus === 'Y' ? styles.statusY : ''}>{item.consentStatus || ''}</span>
      )
    },
    {
      id: 'prescriptionStatus',
      label: '약 처방 내역',
      width: '110px',
      renderCell: item => (
        <span className={item.prescriptionStatus === 'Y' ? styles.statusY : ''}>{item.prescriptionStatus || ''}</span>
      )
    },
    {
      id: 'result',
      label: '결과 조회',
      width: '120px',
      renderCell: item =>
        item.hasResult && !item.isExpired ? (
          <Button
            variant='primary'
            size='small'
            className={styles.viewBtn}
            onClick={() => router.push(`/mypage/patient-result?patientNo=${item.patientNo}&visitDate=${item.treatmentDate}&mcdpCd=${item.departmentCode}&patientName=${encodeURIComponent(item.patientName)}&gender=${encodeURIComponent(item.gender)}&age=${item.age}&referralDate=${item.referralDate}`)}
          >
            조회
          </Button>
        ) : null
    },
    ...(user?.profile?.replyConsent ? [{
      id: 'reply',
      label: '회신서 조회',
      width: '120px',
      renderCell: (item: PatientData) =>
        item.hasReply && !item.isExpired ? (
          <Button variant='primary' size='small' className={styles.viewBtn} onClick={() => handleReplyView(item)}>
            조회
          </Button>
        ) : null
    }] : [])
  ]

  const handleReplyView = async (item: PatientData) => {
    const result = await fetchReferralReply({
      hospitalCode: hospitalId.toUpperCase(),
      ptno: item.patientNo,
      refrSno: item.referralSeqNo,
      refrYmd: item.rawReferralDate
    })
    if (result?.item) {
      const reply = result.item
      const genderText = reply.genderCode === 'M' ? '남' : reply.genderCode === 'F' ? '여' : reply.genderCode || item.gender
      // frontResidentNo 앞 6자리로 생년월일 추출
      const birthDate = reply.frontResidentNo
        ? `${reply.frontResidentNo.slice(0, 2)}-${reply.frontResidentNo.slice(2, 4)}-${reply.frontResidentNo.slice(4, 6)}`
        : ''
      setReplyData({
        referralHospital: item.hospitalName || user?.profile?.hospName || '',
        referralDoctor: user?.userName || '',
        referralDate: formatApiDate(reply.referralDate),
        patientName: reply.patientName || item.patientName,
        gender: genderText,
        birthDate,
        department: reply.departmentName || '',
        doctor: reply.doctorName || '',
        treatmentPeriod: reply.treatmentPeriod || '',
        registrationNumber: item.patientNo,
        diagnosis: reply.diagnosisName || '',
        medicalOpinion: reply.opinion || '',
        createdDate: formatApiDate(reply.replyDate)
      })
    } else {
      setReplyData(emptyReplyData)
    }
    setIsReplyModalOpen(true)
  }

  const handleSearch = () => {
    setAppliedStartDate(startDate)
    setAppliedEndDate(endDate)
    setAppliedSortBy(sortBy)
    setAppliedKeyword(searchKeyword)
    setAppliedSearchType(searchType)
    setCurrentPage(1)
    setSearchTrigger(prev => prev + 1)
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>의뢰환자 조회</h1>

          <div className={styles.content}>
            {/* 안내 문구 + 검색/조회 그룹 */}
            <div className={styles.searchGroup}>
              {/* 안내 문구 */}
              <div className={styles.noticeSection}>
                <div className={styles.noticeItem}>
                  <span className={styles.noticeBadge}>1</span>
                  <span className={styles.noticeText}>{user?.userName || ''} 선생님께서 의뢰하신 의뢰환자정보입니다.</span>
                </div>
                <div className={styles.noticeItem}>
                  <span className={styles.noticeBadge}>2</span>
                  <span className={styles.noticeText}>
                    의뢰환자정보는 의뢰일자로부터 3년, 결과조회 및 회신서 조회는 1년 이내의 자료만 조회가 가능합니다.
                  </span>
                </div>
              </div>

              {/* 검색/조회 카드 */}
              <div className={styles.searchCard}>
                <div className={styles.searchCardHeader}>
                  <div className={styles.searchTitleWrapper}>
                    <h2 className={styles.searchTitle}>검색/조회</h2>
                    <p className={styles.searchSubtitle}>의뢰하신 날짜를 기준으로 1년 동안 조회가 가능합니다.</p>
                  </div>
                  <div className={styles.dividerLine} />
                </div>

                <div className={styles.searchContent}>
                  {/* 조회기간 */}
                  <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>조회기간</span>
                    <div className={styles.filterRowContent}>
                      {/* 모바일: 라디오 버튼이 먼저, 데스크톱: 날짜가 먼저 */}
                      <Radio
                        name='period'
                        value={period}
                        options={periodOptions}
                        onChange={setPeriod}
                        className={styles.periodRadio}
                      />
                      <div className={styles.dateRangeGroup}>
                        <div className={styles.dateInputWrapper}>
                          <DatePicker
                            value={startDate}
                            onChange={val => setStartDate(val)}
                            maxDate={new Date(endDate)}
                          />
                        </div>
                        <span className={styles.dateSeparator}>~</span>
                        <div className={styles.dateInputWrapper}>
                          <DatePicker
                            value={endDate}
                            onChange={val => setEndDate(val)}
                            minDate={new Date(startDate)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 정렬기준 */}
                  <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>정렬기준</span>
                    <Radio
                      name='sortBy'
                      value={sortBy}
                      options={sortOptions}
                      onChange={setSortBy}
                      className={styles.sortRadio}
                    />
                  </div>

                  {/* 상세검색 */}
                  <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>상세검색</span>
                    <div className={styles.searchInputGroup}>
                      <Select
                        options={searchTypeOptions}
                        value={searchType}
                        onChange={setSearchType}
                        className={styles.searchTypeSelect}
                        width={230}
                      />
                      <div className={styles.searchFieldWrapper}>
                        <Input
                          type='text'
                          value={searchKeyword}
                          onChange={e => setSearchKeyword(e.target.value)}
                          placeholder='진료과, 진료의, 진단명으로 검색하세요.'
                          className={styles.searchInput}
                          onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        />
                        <Button variant='primary' onClick={handleSearch} className={styles.searchBtn}>
                          <span>검색</span>
                          <SearchIcon width={22} height={22} fill='white' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 의뢰환자 목록 */}
            <div className={styles.listSection}>
              <SectionTitle title='의뢰환자 목록' />

              <InfoNote
                message={
                  <>
                    <ConsultBadgeIcon />
                    표시가 있는 진료의는 의료자문 요청이 가능합니다.
                  </>
                }
                className={styles.listInfo}
              />

              <div className={styles.tableWrapper}>
                {isTablet ? (
                  /* 태블릿/모바일: 카드형 그리드 리스트 */
                  <CardList
                    variant='infoCard'
                    cards={patientData.map(item => [
                      {
                        id: 'referralDate',
                        leftContent: <InfoRowContent label='의뢰일자' value={item.referralDate} />,
                        highlighted: true
                      },
                      {
                        id: 'body',
                        leftContent: (
                          <div className={styles.infoColumnStack}>
                            <InfoRowContent label='환자명' value={item.patientName} />
                            <InfoRowContent label='나이' value={item.age} />
                            <InfoRowContent label='진료과' value={item.department} />
                          </div>
                        ),
                        rightContent: (
                          <div className={styles.infoColumnStack}>
                            <InfoRowContent label='성별' value={item.gender} />
                            <InfoRowContent label='진료일' value={item.treatmentDate} />
                            <InfoRowContent
                              label='진료의'
                              value={
                                item.doctorCanConsult ? (
                                  <button
                                    type='button'
                                    className={styles.consultableBtn}
                                    onClick={() => {
                                      const params = new URLSearchParams({
                                        doctorId: item.doctorId,
                                        doctorName: item.doctor,
                                        department: item.department
                                      })
                                      router.push(`/network/e-consult?${params.toString()}`)
                                    }}
                                  >
                                    <span className={styles.doctorConsultable}>
                                      {item.doctor}
                                      <ConsultBadgeIcon />
                                    </span>
                                  </button>
                                ) : (
                                  item.doctor
                                )
                              }
                              accent={item.doctorCanConsult}
                            />
                          </div>
                        ),
                        infoRow: true
                      },
                      {
                        id: 'consent-prescription',
                        leftContent: (
                          <InfoRowContent
                            label='정보공개 공의 여부'
                            value={item.consentStatus || '-'}
                            accent={item.consentStatus === 'Y'}
                          />
                        ),
                        rightContent: (
                          <InfoRowContent
                            label='약처방내역'
                            value={item.prescriptionStatus || '-'}
                            accent={item.prescriptionStatus === 'Y'}
                          />
                        ),
                        infoRow: true
                      },
                      {
                        id: 'buttons',
                        leftContent: (
                          <InfoRowContent
                            label='결과 조회'
                            value={
                              item.hasResult && !item.isExpired ? (
                                <Button
                                  variant='primary'
                                  size='small'
                                  className={styles.cardViewBtn}
                                  onClick={() => router.push(`/mypage/patient-result?patientNo=${item.patientNo}&visitDate=${item.treatmentDate}&mcdpCd=${item.departmentCode}&patientName=${encodeURIComponent(item.patientName)}&gender=${encodeURIComponent(item.gender)}&age=${item.age}&referralDate=${item.referralDate}`)}
                                >
                                  조회
                                </Button>
                              ) : (
                                '-'
                              )
                            }
                          />
                        ),
                        ...(user?.profile?.replyConsent ? {
                          rightContent: (
                            <InfoRowContent
                              label='회신서 조회'
                              value={
                                item.hasReply && !item.isExpired ? (
                                  <Button
                                    variant='primary'
                                    size='small'
                                    className={styles.cardViewBtn}
                                    onClick={() => handleReplyView(item)}
                                  >
                                    조회
                                  </Button>
                                ) : (
                                  '-'
                                )
                              }
                            />
                          ),
                          infoRow: true
                        } : {})
                      }
                    ])}
                    getCardKey={(_, index) => index}
                    getCardClassName={(_, index) => {
                      const item = patientData[index]
                      return item.isExpired ? styles.expiredCard : ''
                    }}
                    className={styles.patientCardList}
                  />
                ) : (
                  /* 데스크톱: 테이블 */
                  <Table
                    columns={patientColumns}
                    data={patientData}
                    getRowKey={(_, index) => index}
                    className={styles.patientTable}
                    isHighlighted={item => item.isExpired === true}
                    highlightedClassName={styles.expiredRow}
                  />
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className={styles.pagination}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 회신서 조회 모달 */}
      <MedicalReplyModal isOpen={isReplyModalOpen} onClose={() => setIsReplyModalOpen(false)} data={replyData} />
    </div>
  )
}
