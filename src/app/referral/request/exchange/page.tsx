'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { ContinuityIcon } from '@/components/icons/ContinuityIcon'
import { SafetyIcon } from '@/components/icons/SafetyIcon'
import { QualityIcon } from '@/components/icons/QualityIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { LinkIcon } from '@/components/icons/LinkIcon'
import styles from './page.module.scss'

export default function ExchangePage() {
  const breadcrumbItems = [
    { label: '', href: '/', icon: <HomeIcon /> },
    { label: '진료의뢰', href: '/referral', icon: <ChevronDownIcon width={12} height={12} />, iconAfter: true },
    {
      label: '진료협력센터 의뢰',
      href: '/referral/request',
      icon: <ChevronDownIcon width={12} height={12} />,
      iconAfter: true
    },
    { label: '진료정보교류 의뢰', icon: <ChevronDownIcon width={12} height={12} />, iconAfter: true }
  ]

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>진료정보교류 의뢰</h1>

          {/* 페이지 소개 섹션 */}
          <InfoBox
            variant='info'
            messages={[
              '의료기관간 진료기록물 진료에 참조할 수 있도록 전자적으로 진료정보를 공유하는 서비스로 1·2차 병의원에서 3차병원으로, 또는 1차의원에서 다른 1·2차 병의원으로 환자의 진단 및 치료, 검사를 위해 전자적으로 진료의뢰를 할 수 있습니다.'
            ]}
            className={styles.introBox}
          />

          {/* 진료정보교류 사업 목적 섹션 */}
          <ServiceSection
            title='진료정보교류 사업 목적'
            services={[
              {
                id: 'continuity',
                icon: <ContinuityIcon width={60} height={60} fill='#9f1836' />,
                title: '진료의 연속성 보장',
                description: ''
              },
              {
                id: 'safety',
                icon: <SafetyIcon width={60} height={60} fill='#9f1836' />,
                title: '환자 안전 강화',
                description: ''
              },
              {
                id: 'quality',
                icon: <QualityIcon width={60} height={60} fill='#9f1836' />,
                title: '의료서비스 질 향상',
                description: ''
              }
            ]}
          />

          {/* 진료정보교류 진료의뢰 절차 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='진료정보교류 진료의뢰 절차' />
            <div className={styles.procedureInfo}>
              <p className={styles.procedureText}>진료정보교류에 대한 개인정보제공 동의 필요(최초 1회)</p>
              <p className={styles.procedureText}>포털(마이차트, mychart.kr)에서 본인인증을 통한 동의</p>
              <p className={styles.procedureText}>의료기관 방문을 통한 동의 (전자 또는 서면)</p>
            </div>
            <div className={styles.flowchart}>
              {/* 1,2차 의료기관에서 상급 의료기관으로 의뢰 */}
              <div className={styles.flowStep}>
                <div className={styles.flowGroup}>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>1,2차 의료기관</div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>환자내원</div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>치료 후 의뢰결정</div>
                  <div className={`${styles.flowBox} ${styles.redBox}`}>진료정보 교류동의</div>
                  <div className={styles.parallelBoxes}>
                    <div className={`${styles.flowBox} ${styles.redBox}`}>진료의뢰서 작성</div>
                    <div className={`${styles.flowBox} ${styles.redBox}`}>필요시 영상정보, 검사 결과지 등 첨부</div>
                  </div>
                  <div className={`${styles.flowBox} ${styles.redBox}`}>온라인 전송</div>
                </div>
              </div>

              {/* 화살표 */}
              <div className={styles.flowArrow}>
                <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M20 5L20 35M20 35L10 25M20 35L30 25'
                    stroke='#9f1836'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>

              {/* 상급 의료기관 처리 및 회송 */}
              <div className={styles.flowStep}>
                <div className={styles.flowGroup}>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>상급 의료기관</div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>환자내원</div>
                  <div className={styles.parallelBoxes}>
                    <div className={`${styles.flowBox} ${styles.whiteBox}`}>의뢰서 접수</div>
                    <div className={`${styles.flowBox} ${styles.whiteBox}`}>진료 예약</div>
                  </div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>진료(치료) 및 회송 결정</div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>진료회송서 작성</div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>온라인 전송</div>
                </div>
              </div>

              {/* 화살표 */}
              <div className={styles.flowArrow}>
                <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M20 5L20 35M20 35L10 25M20 35L30 25'
                    stroke='#9f1836'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>

              {/* 1,2차 의료기관에서의 외래 진료 */}
              <div className={styles.flowStep}>
                <div className={styles.flowGroup}>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>1,2차 의료기관</div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>환자내원</div>
                  <div className={styles.parallelBoxes}>
                    <div className={`${styles.flowBox} ${styles.whiteBox}`}>회송서 접수</div>
                    <div className={`${styles.flowBox} ${styles.whiteBox}`}>진료예약</div>
                  </div>
                  <div className={`${styles.flowBox} ${styles.whiteBox}`}>외래 진료(치료)</div>
                </div>
              </div>
            </div>
          </section>

          {/* 진료정보교류사업 이용 신청 방법 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='진료정보교류사업 이용 신청 방법' />
            <div className={styles.applicationMethod}>
              <div className={styles.methodSteps}>
                <div className={styles.methodStep}>
                  <span className={styles.stepNumber}>1</span>
                  <p className={styles.stepText}>보건복지부 마이차트 회원가입(http://mychart.kr)</p>
                </div>
                <div className={styles.methodStep}>
                  <span className={styles.stepNumber}>2</span>
                  <p className={styles.stepText}>이용신청서 작성</p>
                </div>
                <div className={styles.methodStep}>
                  <span className={styles.stepNumber}>3</span>
                  <p className={styles.stepText}>승인 (거점의료기관 승인 → 한국보건의료정보원 최종 승인!)</p>
                </div>
              </div>
              <div className={styles.mychartLink}>
                <a href='http://mychart.kr' target='_blank' rel='noopener noreferrer' className={styles.mychartButton}>
                  <span className={styles.mychartLogo}>마이차트</span>
                  <LinkIcon width={20} height={20} fill='#9f1836' />
                </a>
              </div>
            </div>
          </section>

          {/* 문의 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='문의' />
            <p className={styles.contactText}>고려대학교 안암병원 진료협력센터 : 02-920-5892</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
