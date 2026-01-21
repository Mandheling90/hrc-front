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
import { ContinuityIcon } from '@/components/icons/ContinuityIcon'
import { SafetyIcon } from '@/components/icons/SafetyIcon'
import { QualityIcon } from '@/components/icons/QualityIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { FluentArrowCircleUpRight } from '@/components/icons/FluentArrowCircleUpRight'
import { useHospital } from '@/hooks'
import styles from './page.module.scss'

export default function ExchangePage() {
  const { pageContent } = useHospital()

  // pageContent에서 exchange 페이지 정보 가져오기
  const exchangeInfo = pageContent.referralExchange

  // 아이콘 매핑
  const iconMap = useMemo<Record<string, React.ReactNode>>(
    () => ({
      HomeIcon: <HomeIcon />,
      ChevronDownIcon: <ChevronDownIcon width={12} height={12} />,
      ContinuityIcon: <ContinuityIcon width={60} height={60} stroke='#9f1836' />,
      SafetyIcon: <SafetyIcon width={60} height={60} stroke='#9f1836' />,
      QualityIcon: <QualityIcon width={60} height={60} stroke='#9f1836' />
    }),
    []
  )

  // Breadcrumb 설정 (병원별로 다를 수 있음)
  const breadcrumbItems = useMemo(() => {
    return (
      exchangeInfo?.breadcrumbs?.map(item => ({
        label: item.label,
        href: item.href,
        icon: item.icon ? iconMap[item.icon] : undefined,
        iconAfter: item.iconAfter
      })) || []
    )
  }, [exchangeInfo?.breadcrumbs, iconMap])

  // 병원별 서비스 목록
  const services = useMemo(() => {
    return (exchangeInfo?.services || []).map(item => ({
      id: item.id,
      icon: iconMap[item.icon] || null,
      title: item.title,
      description: item.description,
      href: item.href,
      tabletSpan: item.tabletSpan,
      mobileSpan: item.mobileSpan,
      mobileTitleBelowIcon: item.mobileTitleBelowIcon
    }))
  }, [exchangeInfo?.services, iconMap])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>진료정보교류 의뢰</h1>

          {/* 페이지 소개 섹션 */}
          <InfoBox variant='info' messages={exchangeInfo?.intro || []} className={styles.introBox} />

          {/* 진료정보교류 사업 목적 섹션 */}
          <ServiceSection title='진료정보교류 사업 목적' services={services} horizontalLayout />

          {/* 진료정보교류 진료의뢰 절차 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='진료정보교류 진료의뢰 절차' />
            <div className={styles.procedureListWrapper}>
              <ProcedureList
                items={[
                  {
                    text: '진료정보교류에 대한 개인정보제공 동의 필요(최초 1회)',
                    highlighted: true
                  },
                  {
                    text: '포털(마이차트, mychart.kr)에서 본인인증을 통한 동의'
                  },
                  {
                    text: '의료기관 방문을 통한 동의 (전자 또는 서면)'
                  }
                ]}
              />
            </div>
            <div className={styles.flowchartImage}>
              <Image
                src='/images/service/flowchart-referral-process.png'
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
              <ProcedureList
                items={[
                  {
                    text: '보건복지부 마이차트 회원가입(http://mychart.kr)'
                  },
                  {
                    text: '이용신청서 작성'
                  },
                  {
                    text: '승인 (거점의료기관 승인 → 한국보건의료정보원 최종 승인!)'
                  }
                ]}
                className={styles.methodSteps}
              />
              <div className={styles.mychartLink}>
                <a href='http://mychart.kr' target='_blank' rel='noopener noreferrer' className={styles.mychartButton}>
                  <Image
                    src='/images/service/myChartTitle.png'
                    alt='보건복지부 마이차트'
                    width={200}
                    height={60}
                    className={styles.mychartImage}
                    priority
                  />
                  <FluentArrowCircleUpRight className={styles.arrowIcon} />
                </a>
              </div>
            </div>
          </section>

          {/* 문의 섹션 */}
          {exchangeInfo?.contact && (
            <section className={styles.section}>
              <SectionTitle title='문의' />
              <p className={styles.contactText}>{exchangeInfo.contact}</p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
