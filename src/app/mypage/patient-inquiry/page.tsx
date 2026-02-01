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
import { Select } from '@/components/atoms/Select/Select'
import { Button } from '@/components/atoms/Button/Button'
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { ConsultBadgeIcon } from '@/components/icons/ConsultBadgeIcon'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { MedicalReplyModal, MedicalReplyData } from '@/components/organisms/MedicalReplyModal/MedicalReplyModal'
import styles from './page.module.scss'

// 더미 데이터
const mockUserName = '김지성'

// 회신서 더미 데이터
const mockReplyData: MedicalReplyData = {
  referralHospital: '고대협력의뢰병원',
  referralDoctor: '이협력',
  referralDate: '2025-08-27',
  patientName: '김레브',
  gender: '남',
  birthDate: '1979.02.13',
  department: '소화기내과',
  doctor: '김정후',
  treatmentPeriod: '2025.08.27 ~ 2025.11.23',
  registrationNumber: '12345678',
  diagnosis: 'Anemia',
  medicalOpinion: `환자는 3개월 이상 지속된 만성 기침과 간헐적 호흡곤란을 주소로 내원하였습니다.
흉부 X-ray 및 흉부 CT 검사에서 경도의 기관지확장증 소견이 확인되었으며,
폐기능 검사에서는 경도 폐쇄성 환기 장애가 관찰되었습니다.

1. 급성 감염 소견은 없으나, 알레르기 기전이 일부 관여한 것으로 판단됩니다. 현재 상태는 경도 기관지확장증 + 알레르기성 기도 과민반응에 의한 만성 기침으로 판단됩니다.
2. 폐렴, 결핵 등 중증 감염의 증거는 없으며, 급성 악화 소견도 관찰되지 않습니다.
3. 장기간 지속된 만성 증상으로 생활 불편도가 높아 흡입형 스테로이드 + 기관지확장제 병합요법을 권고합니다.
4. 환경 요인(미세먼지, 찬 공기, 흡연 노출)이 악화 요인이므로 회피 교육이 필요합니다.`,
  createdDate: '2025-11-23'
}

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
}

const mockPatientData: PatientData[] = [
  {
    referralDate: '2025-08-21',
    patientName: '송*지',
    gender: '남',
    age: 52,
    treatmentDate: '2025-11-25',
    department: '감염내과',
    doctor: '김선용',
    doctorCanConsult: false,
    consentStatus: 'Y',
    prescriptionStatus: 'Y',
    hasResult: true,
    hasReply: true
  },
  {
    referralDate: '2025-08-21',
    patientName: '송*지',
    gender: '남',
    age: 52,
    treatmentDate: '2025-11-25',
    department: '감염내과',
    doctor: '김선용',
    doctorCanConsult: false,
    consentStatus: 'Y',
    prescriptionStatus: 'Y',
    hasResult: true,
    hasReply: true
  },
  {
    referralDate: '2025-08-05',
    patientName: '이*상',
    gender: '여',
    age: 83,
    treatmentDate: '2025-08-14',
    department: '소화기내과',
    doctor: '박인구',
    doctorCanConsult: true,
    consentStatus: 'N',
    prescriptionStatus: null,
    hasResult: false,
    hasReply: false
  },
  {
    referralDate: '2025-07-24',
    patientName: '김*철',
    gender: '남',
    age: 21,
    treatmentDate: '2025-07-21',
    department: '치과',
    doctor: '황순철',
    doctorCanConsult: false,
    consentStatus: 'Y',
    prescriptionStatus: 'Y',
    hasResult: true,
    hasReply: true
  },
  {
    referralDate: '2022-09-13',
    patientName: '우*우',
    gender: '여',
    age: 62,
    treatmentDate: '2022-09-14',
    department: '호흡기내과',
    doctor: '홍상우',
    doctorCanConsult: true,
    consentStatus: 'Y',
    prescriptionStatus: 'Y',
    hasResult: true,
    hasReply: true,
    isExpired: true
  }
]

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

export default function PatientInquiryPage() {
  const [startDate, setStartDate] = useState('2025-04-21')
  const [endDate, setEndDate] = useState('2025-05-21')
  const [period, setPeriod] = useState('1month')
  const [sortBy, setSortBy] = useState('latest')
  const [searchType, setSearchType] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isTablet, setIsTablet] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 1429 : false))
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const totalPages = 5

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
          <span className={item.doctorCanConsult ? styles.consultable : ''}>{item.doctor}</span>
          {item.doctorCanConsult && <ConsultBadgeIcon />}
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
          <Button variant='primary' size='small' className={styles.viewBtn}>
            조회
          </Button>
        ) : null
    },
    {
      id: 'reply',
      label: '회신서 조회',
      width: '120px',
      renderCell: item =>
        item.hasReply && !item.isExpired ? (
          <Button variant='primary' size='small' className={styles.viewBtn} onClick={() => setIsReplyModalOpen(true)}>
            조회
          </Button>
        ) : null
    }
  ]

  const handleSearch = () => {
    // 검색 로직
    console.log('검색:', { searchType, searchKeyword, startDate, endDate, period, sortBy })
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>의뢰환자 조회</h1>

          <div className={styles.content}>
            {/* 안내 문구 */}
            <div className={styles.noticeSection}>
              <div className={styles.noticeItem}>
                <span className={styles.noticeBadge}>1</span>
                <span className={styles.noticeText}>{mockUserName} 선생님께서 의뢰하신 의뢰환자정보입니다.</span>
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
                        <Input
                          type='date'
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className={styles.dateInput}
                        />
                        <CalendarIcon width={24} height={24} className={styles.calendarIcon} />
                      </div>
                      <span className={styles.dateSeparator}>~</span>
                      <div className={styles.dateInputWrapper}>
                        <Input
                          type='date'
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                          className={styles.dateInput}
                        />
                        <CalendarIcon width={24} height={24} className={styles.calendarIcon} />
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

            {/* 의뢰환자 목록 */}
            <div className={styles.listSection}>
              <SectionTitle title='의뢰환자 목록' />

              <InfoNote
                message={
                  <>
                    <ConsultBadgeIcon />
                    표시가 있는 진료의만 의료자문 요청이 가능합니다.
                  </>
                }
                className={styles.listInfo}
              />

              <div className={styles.tableWrapper}>
                {isTablet ? (
                  /* 태블릿/모바일: 카드형 그리드 리스트 */
                  <CardList
                    variant='infoCard'
                    cards={mockPatientData.map(item => [
                      {
                        id: 'referralDate',
                        leftContent: <InfoRowContent label='의뢰일자' value={item.referralDate} />,
                        highlighted: true
                      },
                      {
                        id: 'patientName',
                        leftContent: <InfoRowContent label='환자명' value={item.patientName} />,
                        infoRow: true
                      },
                      {
                        id: 'gender',
                        leftContent: <InfoRowContent label='성별' value={item.gender} />,
                        infoRow: true
                      },
                      {
                        id: 'age',
                        leftContent: <InfoRowContent label='나이' value={item.age} />,
                        infoRow: true
                      },
                      {
                        id: 'treatmentDate',
                        leftContent: <InfoRowContent label='진료일' value={item.treatmentDate} />,
                        infoRow: true
                      },
                      {
                        id: 'department',
                        leftContent: <InfoRowContent label='진료과' value={item.department} />,
                        infoRow: true
                      },
                      {
                        id: 'doctor',
                        leftContent: (
                          <InfoRowContent
                            label='진료의'
                            value={
                              item.doctorCanConsult ? (
                                <span className={styles.doctorConsultable}>
                                  {item.doctor}
                                  <ConsultBadgeIcon />
                                </span>
                              ) : (
                                item.doctor
                              )
                            }
                            accent={item.doctorCanConsult}
                          />
                        ),
                        infoRow: true
                      },
                      {
                        id: 'consent',
                        leftContent: (
                          <InfoRowContent
                            label='정보공개 동의 여부'
                            value={item.consentStatus || '-'}
                            accent={item.consentStatus === 'Y'}
                          />
                        ),
                        infoRow: true
                      },
                      {
                        id: 'prescription',
                        leftContent: (
                          <InfoRowContent
                            label='약처방내역'
                            value={item.prescriptionStatus || '-'}
                            accent={item.prescriptionStatus === 'Y'}
                          />
                        ),
                        infoRow: true
                      },
                      {
                        id: 'resultBtn',
                        leftContent: (
                          <InfoRowContent
                            label='결과 조회'
                            value={
                              item.hasResult && !item.isExpired ? (
                                <Button variant='primary' size='small' className={styles.cardViewBtn}>
                                  조회
                                </Button>
                              ) : (
                                '-'
                              )
                            }
                          />
                        ),
                        infoRow: true
                      },
                      {
                        id: 'replyBtn',
                        leftContent: (
                          <InfoRowContent
                            label='회신서 조회'
                            value={
                              item.hasReply && !item.isExpired ? (
                                <Button
                                  variant='primary'
                                  size='small'
                                  className={styles.cardViewBtn}
                                  onClick={() => setIsReplyModalOpen(true)}
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
                      }
                    ])}
                    getCardKey={(_, index) => index}
                    getCardClassName={(_, index) => {
                      const item = mockPatientData[index]
                      return item.isExpired ? styles.expiredCard : ''
                    }}
                    className={styles.patientCardList}
                  />
                ) : (
                  /* 데스크톱: 테이블 */
                  <Table
                    columns={patientColumns}
                    data={mockPatientData}
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
      <MedicalReplyModal isOpen={isReplyModalOpen} onClose={() => setIsReplyModalOpen(false)} data={mockReplyData} />
    </div>
  )
}
