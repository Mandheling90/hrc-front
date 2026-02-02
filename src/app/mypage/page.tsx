'use client'

import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { ArrowRightLargeIcon } from '@/components/icons/ArrowRightLargeIcon'
import { ConsultIcon } from '@/components/icons/ConsultIcon'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, CardRow } from '@/components/molecules/CardList/CardList'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import styles from './page.module.scss'

// 더미 데이터 - 실제로는 API에서 가져와야 함
const mockUserData = {
  hospitalName: 'A 병원',
  userName: '홍길동'
}

interface PatientData {
  date: string
  name: string
  age: string
  department: string
}

const mockPatientData: PatientData[] = [
  { date: '2025-08-21', name: '송*지', age: '50대', department: '호흡기·알레르기내과' },
  { date: '2025-08-14', name: '이*철', age: '40대', department: '치과' },
  { date: '2025-08-02', name: '김*순', age: '50대', department: '소화기 내과' },
  { date: '2025-07-30', name: '황*은', age: '20대', department: '내과' },
  { date: '2025-07-23', name: '박*민', age: '10대', department: '소아청소년과' }
]

const patientColumns: TableColumn<PatientData>[] = [
  { id: 'date', label: '날짜', field: 'date', width: '130px' },
  { id: 'name', label: '이름', field: 'name', width: '90px' },
  { id: 'age', label: '나이', field: 'age', width: '80px' },
  { id: 'department', label: '진료과', field: 'department', width: '1fr' }
]

const mockConsultData = {
  waiting: 2,
  completed: 10,
  expired: 83
}

// 모바일용 CardList 데이터 변환
const patientCards: CardRow[][] = mockPatientData.map((patient, index) => [
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

export default function MyPage() {
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
                  <p className={styles.hospitalName}>{mockUserData.hospitalName}</p>
                  <div className={styles.userName}>
                    <span className={styles.userNameText}>{mockUserData.userName}</span>
                    <span className={styles.userNameSuffix}>님</span>
                  </div>
                </div>
                <div className={styles.userActions}>
                  <Link href='/mypage/edit-profile' className={styles.userActionBtnPrimary}>
                    회원정보 수정
                  </Link>
                  <button type='button' className={styles.userActionBtn}>
                    협력병•의원 정보수정
                  </button>
                </div>
              </div>

              {/* 서식 다운로드 카드 */}
              <div className={styles.downloadCard}>
                <h2 className={styles.cardTitle}>서식 다운로드</h2>
                <div className={styles.downloadList}>
                  <button type='button' className={`${styles.downloadBtn} ${styles.downloadBtnActive}`}>
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
                  <button type='button' className={styles.arrowBtn}>
                    <ArrowRightLargeIcon width={24} height={24} stroke='white' />
                  </button>
                </div>
                {/* 데스크톱/태블릿용 테이블 */}
                <Table
                  columns={patientColumns}
                  data={mockPatientData}
                  getRowKey={(_, index) => index}
                  hideHeader
                  className={styles.patientList}
                />
                {/* 모바일용 카드리스트 */}
                <CardList cards={patientCards} getCardKey={(_, index) => index} className={styles.patientMobileList} />
              </div>

              {/* e-Consult 조회 카드 */}
              <div className={styles.consultCard}>
                <div className={styles.cardHeader}>
                  <SectionTitle title='e-Consult 조회' noMargin />
                  <button type='button' className={styles.arrowBtn}>
                    <ArrowRightLargeIcon width={24} height={24} stroke='white' />
                  </button>
                </div>
                <div className={styles.consultContent}>
                  <div className={styles.consultStats}>
                    <div className={styles.statItem}>
                      <div className={`${styles.statCircle} ${styles.statCircleWaiting}`}>
                        <span className={styles.statNumber}>{mockConsultData.waiting}</span>
                        <span className={styles.statUnit}>건</span>
                      </div>
                      <p className={styles.statLabel}>답변 대기</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={`${styles.statCircle} ${styles.statCircleCompleted}`}>
                        <span className={styles.statNumber}>{mockConsultData.completed}</span>
                        <span className={styles.statUnit}>건</span>
                      </div>
                      <p className={styles.statLabel}>답변 완료</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={`${styles.statCircle} ${styles.statCircleExpired}`}>
                        <span className={styles.statNumber}>{mockConsultData.expired}</span>
                        <span className={styles.statUnit}>건</span>
                      </div>
                      <p className={styles.statLabel}>기간 만료</p>
                    </div>
                  </div>
                  <button type='button' className={styles.consultApplyBtn}>
                    <ConsultIcon width={36} height={36} />
                    <span>e-Consulting 신청</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 회원탈퇴 카드 */}
            <div className={styles.withdrawCard}>
              <div className={styles.cardHeader}>
                <SectionTitle title='회원탈퇴' noMargin />
                <button type='button' className={styles.arrowBtn}>
                  <ArrowRightLargeIcon width={24} height={24} stroke='white' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
