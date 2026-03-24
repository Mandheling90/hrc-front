'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { useHospital } from '@/hooks'
import { mapServiceItems, mapBreadcrumbItems } from '@/utils'
import styles from './page.module.scss'

export default function ExchangePage() {
  const { pageContent } = useHospital()

  // pageContent에서 exchange 페이지 정보 가져오기
  const exchangeInfo = pageContent.referralExchange

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return mapBreadcrumbItems(exchangeInfo?.breadcrumbs)
  }, [exchangeInfo?.breadcrumbs])

  // 병원별 서비스 목록
  const services = useMemo(() => {
    return mapServiceItems(exchangeInfo?.services)
  }, [exchangeInfo?.services])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>진료정보교류 의뢰</h1>

          {/* 페이지 소개 섹션 */}
          <InfoBox
            variant='info'
            messages={exchangeInfo?.intro || []}
            className={styles.introBox}
            textAlign='center'
            contentAlign='center'
          />

          {/* 진료정보교류 사업 목적 섹션 또는 진료정보교류 진료의뢰 설명 */}
          {exchangeInfo?.services && exchangeInfo.services.length > 0 ? (
            <ServiceSection title='진료정보교류 사업 목적' services={services} columns={3} mobileAlign='center' />
          ) : (
            exchangeInfo?.referralDescription &&
            exchangeInfo.referralDescription.length > 0 && (
              <section className={styles.section}>
                <SectionTitle title='진료정보교류 진료의뢰' />
                <div className={styles.procedureListWrapper}>
                  <ProcedureList items={exchangeInfo.referralDescription} />
                </div>
              </section>
            )
          )}

          {/* 진료정보교류 진료의뢰 절차 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='진료정보교류 진료의뢰 절차' />
            <div className={styles.procedureListWrapper}>
              <ProcedureList items={exchangeInfo?.procedureSteps || []} />
            </div>
            <div className={styles.flowchartImage}>
              <Image
                src='/images/referral/exchange/flowchart-referral-process.png'
                alt='진료정보교류 진료의뢰 절차 플로우차트'
                width={1200}
                height={800}
                className={styles.flowchartImg}
                priority
              />
            </div>
          </section>

          {/* 진료정보교류사업 이용 신청 방법 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='진료정보교류사업 이용 신청 방법' />
            <div className={styles.applicationMethod}>
              <ProcedureList items={exchangeInfo?.applicationSteps || []} className={styles.methodSteps} />
              <div className={styles.mychartLink}>
                <a href='http://mychart.kr' target='_blank' rel='noopener noreferrer' className={styles.mychartButton}>
                  <Image
                    src='/images/referral/exchange/myChartTitle-d.png'
                    alt='보건복지부 마이차트'
                    width={336}
                    height={88}
                    className={styles.mychartImageDesktop}
                    priority
                  />
                  <Image
                    src='/images/referral/exchange/myChartTitle-m.png'
                    alt='보건복지부 마이차트'
                    width={288}
                    height={68}
                    className={styles.mychartImageMobile}
                    priority
                  />
                </a>
              </div>
            </div>
          </section>

          {/* 문의 섹션 */}
          {exchangeInfo?.contact && (
            <section className={styles.section}>
              <SectionTitle title='문의' />

              {Array.isArray(exchangeInfo.contact) ? (
                <ProcedureList items={exchangeInfo.contact.map(text => ({ text }))} className={styles.methodSteps} />
              ) : (
                <ProcedureList
                  items={[
                    {
                      text: exchangeInfo.contact
                    }
                  ]}
                  className={styles.methodSteps}
                />
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
