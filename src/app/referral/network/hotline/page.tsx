'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import styles from './page.module.scss'

// 핫라인 데이터 타입
interface HotlineData {
  id: string
  department: string
  professorName: string
  hotline: string
}

// 임시 데이터
const mockHotlines: HotlineData[] = [
  {
    id: '1',
    department: '심혈관(협심증)',
    professorName: '박재형',
    hotline: '010-9380-3992'
  },
  {
    id: '2',
    department: '심혈관(부정맥)',
    professorName: '김윤기',
    hotline: '010-6389-4397'
  },
  {
    id: '3',
    department: '소화기내과 (췌담도)',
    professorName: '이재민',
    hotline: '010-8991-6294'
  },
  {
    id: '4',
    department: '이식혈관외과',
    professorName: '당직의',
    hotline: '010-8993-5558'
  },
  {
    id: '5',
    department: '정형외과',
    professorName: '김희중',
    hotline: '010-7102-1534'
  },
  {
    id: '6',
    department: '신경외과 (뇌손상, 뇌출혈)',
    professorName: '홍순철',
    hotline: '010-2010-8809'
  },
  {
    id: '7',
    department: '심장혈관흉부외과 (대동맥, 혈관, 심장수술)',
    professorName: '유성욱',
    hotline: '010-2323-5741'
  },
  {
    id: '8',
    department: '산부인과',
    professorName: '최연조',
    hotline: '010-4702-1065'
  },
  {
    id: '9',
    department: '신경과 (뇌졸중)',
    professorName: '당직교수',
    hotline: '010-4599-4186'
  },
  {
    id: '10',
    department: '성형외과',
    professorName: '최혁순',
    hotline: '010-4566-1030'
  },
  {
    id: '11',
    department: '소아청소년과',
    professorName: '정철웅',
    hotline: '010-2693-4125'
  },
  {
    id: '12',
    department: '치과',
    professorName: '양재혁',
    hotline: '010-7225-8988'
  },
  {
    id: '13',
    department: '응급의료센터',
    professorName: '정재호',
    hotline: '010-4605-6534'
  },
  {
    id: '14',
    department: '진료협력센터장 / 소화기내과 (위장관)',
    professorName: '이주영',
    hotline: '010-4909-0079'
  }
]

export default function ProfessorHotlinePage() {
  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return [
      { label: '', href: '/', icon: null },
      { label: '협력네트워크', href: '/referral/network', icon: null },
      { label: '교수직통 핫라인', href: '/referral/network/hotline', icon: null }
    ]
  }, [])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>교수직통 핫라인</h1>

          {/* 핫라인 리스트 */}
          <div className={styles.hotlineList}>
            {/* 데스크톱/태블릿: 테이블 헤더 */}
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>진료과</div>
              <div className={styles.separator}></div>
              <div className={styles.headerCell}>교수명</div>
              <div className={styles.separator}></div>
              <div className={styles.headerCell}>핫라인</div>
            </div>

            {/* 데스크톱/태블릿: 테이블 데이터 행들 */}
            <div className={styles.tableBody}>
              {mockHotlines.map(hotline => (
                <div key={hotline.id} className={styles.tableRow}>
                  <div className={styles.dataCell}>{hotline.department}</div>
                  <div className={styles.separator}></div>
                  <div className={styles.dataCell}>{hotline.professorName}</div>
                  <div className={styles.separator}></div>
                  <div className={styles.dataCell}>{hotline.hotline}</div>
                </div>
              ))}
            </div>

            {/* 모바일: 카드 형태 */}
            <div className={styles.mobileCardList}>
              {mockHotlines.map(hotline => (
                <div key={hotline.id} className={styles.mobileCard}>
                  <div className={styles.mobileCardDepartment}>{hotline.department}</div>
                  <div className={styles.mobileCardInfo}>
                    <span className={styles.mobileCardName}>{hotline.professorName}</span>
                    <span className={styles.mobileCardSeparator}>|</span>
                    <span className={styles.mobileCardHotline}>{hotline.hotline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
