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
import { mapBreadcrumbItems, mapServiceItems } from '@/utils'
import styles from './page.module.scss'

export default function HiraReferralPage() {
  const { pageContent } = useHospital()

  // pageContent에서 hira 페이지 정보 가져오기
  const hiraInfo = pageContent.referralHira

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return mapBreadcrumbItems(hiraInfo?.breadcrumbs)
  }, [hiraInfo?.breadcrumbs])

  // 사업 목적 서비스 카드 설정 (안산병원 등)
  const businessPurposeServices = useMemo(() => {
    return mapServiceItems(hiraInfo?.businessPurposeServices)
  }, [hiraInfo?.businessPurposeServices])

  if (!hiraInfo) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>{hiraInfo.pageTitle}</h1>

          {/* 페이지 소개 섹션 */}
          <InfoBox
            variant='guide'
            messages={hiraInfo.intro}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          {/* 심평원 중계 시스템 사업 목적 섹션 */}
          {hiraInfo.businessPurposeServices && hiraInfo.businessPurposeServices.length > 0 ? (
            <section className={styles.section}>
              <SectionTitle title='심평원 중계 시스템 사업 목적' />
              <ServiceSection services={businessPurposeServices} horizontalLayout />
            </section>
          ) : hiraInfo.businessPurpose && hiraInfo.businessPurpose.length > 0 ? (
            <section className={styles.section}>
              <SectionTitle title='심평원 중계 시스템 사업 목적' />
              <div className={styles.procedureListWrapper}>
                <ProcedureList items={hiraInfo.businessPurpose} />
              </div>
            </section>
          ) : null}

          {/* 대상 섹션 (구로병원 등) */}
          {hiraInfo.target && hiraInfo.target.length > 0 && (
            <section className={styles.section}>
              <SectionTitle title='대상' />
              <div className={styles.procedureListWrapper}>
                <ProcedureList items={hiraInfo.target} />
              </div>
            </section>
          )}

          {/* 심평원 중계 시스템 진료의뢰 절차 섹션 */}
          <section className={styles.section}>
            <SectionTitle title='심평원 중계 시스템 진료의뢰 절차' />

            {hiraInfo.steps.map((step, index) => (
              <div key={index} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>{step.stepNumber}</span>
                  <h3 className={styles.stepTitle}>
                    {step.linkText ? (
                      <>
                        {step.title.split(step.linkText)[0]}
                        <span className={styles.linkText}>{step.linkText}</span>
                        {step.title.split(step.linkText)[1]}
                      </>
                    ) : (
                      step.title
                    )}
                  </h3>
                </div>
                <div className={styles.stepDivider} />
                <div className={styles.stepContent}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      width={step.image.width}
                      height={step.image.height}
                      className={styles.stepImage}
                      priority
                    />
                    {step.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className={`${styles.highlightBox} ${styles[highlight.className]}`}>
                        <span className={styles.numberBadgeLarge}>{highlight.number}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.stepDescription}>
                    {step.descriptions.map((desc, dIndex) => (
                      <div key={dIndex} className={styles.descriptionItem}>
                        <span className={styles.numberBadgeSmall}>{desc.number}</span>
                        <p>{desc.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 문의 섹션 */}
          {hiraInfo.contact && (
            <section className={styles.section}>
              <SectionTitle title='문의' />
              <div className={styles.procedureListWrapper}>
                <ProcedureList
                  items={
                    Array.isArray(hiraInfo.contact)
                      ? hiraInfo.contact.map(text => ({ text }))
                      : [{ text: hiraInfo.contact }]
                  }
                />
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
