'use client'

import React, { useEffect, useMemo } from 'react'
import Link from '@/components/atoms/HospitalLink'
import { useQuery } from '@apollo/client/react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useHospital } from '@/hooks'
import { useReferralPatients } from '@/hooks/useReferralPatients'
import { HospitalCode } from '@/graphql/__generated__/types'
import { MY_ECONSULTS_QUERY } from '@/graphql/econsult/queries'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { ArrowRightLargeIcon } from '@/components/icons/ArrowRightLargeIcon'
import { ConsultIcon } from '@/components/icons/ConsultIcon'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, CardRow } from '@/components/molecules/CardList/CardList'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

interface PatientData {
  date: string
  name: string
  age: string
  department: string
}

// YYYYMMDD → YYYY-MM-DD 변환
function formatApiDate(dateStr: string | null): string {
  if (!dateStr) return ''
  if (dateStr.length === 8) {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
  }
  return dateStr
}

const DISPLAY_COUNT = 5

const patientColumns: TableColumn<PatientData>[] = [
  { id: 'date', label: '날짜', field: 'date', width: '130px' },
  { id: 'name', label: '이름', field: 'name', width: '90px' },
  { id: 'age', label: '나이', field: 'age', width: '80px' },
  { id: 'department', label: '진료과', field: 'department', width: '1fr' }
]

/** HospitalId → HospitalCode 변환 */
const toHospitalCode = (id: string): HospitalCode => {
  const map: Record<string, HospitalCode> = {
    anam: HospitalCode.Anam,
    guro: HospitalCode.Guro,
    ansan: HospitalCode.Ansan
  }
  return map[id] ?? HospitalCode.Anam
}

interface MyEConsultsData {
  myEConsults: {
    totalCount: number
  }
}

export default function MyPage() {
  const { user } = useAuthContext()
  const { hospitalId } = useHospital()
  const { searchReferralPatients, patients, loading: patientsLoading } = useReferralPatients()

  const hospitalCode = toHospitalCode(hospitalId)

  // e-Consult 상태별 건수 조회
  const { data: waitingData } = useQuery<MyEConsultsData>(MY_ECONSULTS_QUERY, {
    variables: {
      filter: { hospitalCode, status: 'PENDING' },
      pagination: { page: 1, limit: 1 }
    },
    fetchPolicy: 'cache-and-network'
  })

  const { data: completedData } = useQuery<MyEConsultsData>(MY_ECONSULTS_QUERY, {
    variables: {
      filter: { hospitalCode, status: 'ANSWERED' },
      pagination: { page: 1, limit: 1 }
    },
    fetchPolicy: 'cache-and-network'
  })

  const { data: expiredData } = useQuery<MyEConsultsData>(MY_ECONSULTS_QUERY, {
    variables: {
      filter: { hospitalCode, status: 'EXPIRED' },
      pagination: { page: 1, limit: 1 }
    },
    fetchPolicy: 'cache-and-network'
  })

  const consultData = {
    waiting: waitingData?.myEConsults?.totalCount ?? 0,
    completed: completedData?.myEConsults?.totalCount ?? 0,
    expired: expiredData?.myEConsults?.totalCount ?? 0
  }

  useEffect(() => {
    if (hospitalId) {
      searchReferralPatients({ hospitalCode: hospitalId.toUpperCase() })
    }
  }, [hospitalId, searchReferralPatients])

  const recentPatients: PatientData[] = useMemo(() => {
    return patients.slice(0, DISPLAY_COUNT).map((item) => ({
      date: formatApiDate(item.referralDate),
      name: item.patientName || '',
      age: item.age ? `${item.age}세` : '',
      department: item.departmentName || ''
    }))
  }, [patients])

  const patientCards: CardRow[][] = useMemo(() => {
    return recentPatients.map((patient, index) => [
      {
        id: `patient-${index}`,
        leftContent: (
          <div className={styles.patientMobileContent}>
            <span className={styles.patientMobileDate}>{patient.date}</span>
            <div className={styles.patientMobileInfo}>
              <span className={styles.patientMobileName}>{patient.name}</span>
              <span className={styles.patientMobileDepartment}>{patient.department}</span>
            </div>
          </div>
        ),
        rightContent: null
      }
    ])
  }, [recentPatients])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>마이페이지</h1>

          <div className={styles.content}>
            {/* 상단 카드 영역 */}
            <div className={styles.topCards}>
              {/* 사용자 정보 카드 */}
              <div className={styles.userCard}>
                <div className={styles.userInfo}>
                  <p className={styles.hospitalName}>{user?.profile?.hospName || ''}</p>
                  <div className={styles.userName}>
                    <span className={styles.userNameText}>{user?.userName || ''}</span>
                    <span className={styles.userNameSuffix}>님</span>
                  </div>
                </div>
                <div className={styles.userActions}>
                  <Link href='/mypage/edit-profile' className={styles.userActionBtnPrimary}>
                    회원정보 수정
                  </Link>
                  <Link href='/mypage/edit-clinic' className={styles.userActionBtn}>
                    협력병•의원 정보수정
                  </Link>
                </div>
              </div>

              {/* 서식 다운로드 카드 */}
              <div className={styles.downloadCard}>
                <h2 className={styles.cardTitle}>서식 다운로드</h2>
                <div className={styles.downloadList}>
                  <button type='button' className={styles.downloadBtn}>
                    사용자 매뉴얼
                  </button>
                  <button type='button' className={styles.downloadBtn}>
                    진료의뢰서 서식
                  </button>
                  <button type='button' className={styles.downloadBtn}>
                    환자 개인정보 동의서 서식
                  </button>
                </div>
              </div>
            </div>

            {/* 중간 카드 영역 */}
            <div className={styles.middleCards}>
              {/* 의뢰환자 조회 카드 */}
              <div className={styles.patientCard}>
                <div className={styles.cardHeader}>
                  <SectionTitle title='의뢰환자 조회' noMargin />
                  <Link href='/mypage/patient-inquiry' className={styles.arrowBtn}>
                    <ArrowRightLargeIcon width={24} height={24} stroke='white' />
                  </Link>
                </div>
                {patientsLoading ? (
                  <Skeleton width='100%' height={40} variant='rounded' count={5} gap={8} />
                ) : (
                  <>
                    {/* 데스크톱/태블릿용 테이블 */}
                    <Table
                      columns={patientColumns}
                      data={recentPatients}
                      getRowKey={(_, index) => index}
                      hideHeader
                      className={styles.patientList}
                    />
                    {/* 모바일용 카드리스트 */}
                    <CardList cards={patientCards} getCardKey={(_, index) => index} className={styles.patientMobileList} />
                  </>
                )}
              </div>

              {/* e-Consult 조회 카드 */}
              <div className={styles.consultCard}>
                <div className={styles.cardHeader}>
                  <SectionTitle title='e-Consult 조회' noMargin />
                  <Link href='/mypage/e-consult' className={styles.arrowBtn}>
                    <ArrowRightLargeIcon width={24} height={24} stroke='white' />
                  </Link>
                </div>
                <div className={styles.consultContent}>
                  <div className={styles.consultStats}>
                    <div className={styles.statItem}>
                      <div className={`${styles.statCircle} ${styles.statCircleWaiting}`}>
                        <span className={styles.statNumber}>{consultData.waiting}</span>
                        <span className={styles.statUnit}>건</span>
                      </div>
                      <p className={styles.statLabel}>답변 대기</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={`${styles.statCircle} ${styles.statCircleCompleted}`}>
                        <span className={styles.statNumber}>{consultData.completed}</span>
                        <span className={styles.statUnit}>건</span>
                      </div>
                      <p className={styles.statLabel}>답변 완료</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={`${styles.statCircle} ${styles.statCircleExpired}`}>
                        <span className={styles.statNumber}>{consultData.expired}</span>
                        <span className={styles.statUnit}>건</span>
                      </div>
                      <p className={styles.statLabel}>기간 만료</p>
                    </div>
                  </div>
                  <Link href='/network/e-consult' className={styles.consultApplyBtn}>
                    <ConsultIcon width={36} height={36} />
                    <span>e-Consulting 신청</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 회원탈퇴 카드 */}
            {/* <div className={styles.withdrawCard}>
              <div className={styles.cardHeader}>
                <SectionTitle title='회원탈퇴' noMargin />
                <button type='button' className={styles.arrowBtn}>
                  <ArrowRightLargeIcon width={24} height={24} stroke='white' />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
