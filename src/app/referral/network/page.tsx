'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { ProcessSteps } from '@/components/molecules/ProcessSteps/ProcessSteps'
import { Button } from '@/components/atoms/Button/Button'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { FaxIcon } from '@/components/icons/FaxIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { DocumentIcon } from '@/components/icons/DocumentIcon'
import { ReviewIcon } from '@/components/icons/ReviewIcon'
import { ApprovalIcon } from '@/components/icons/ApprovalIcon'
import { HandshakeIcon } from '@/components/icons/HandshakeIcon'
import { CertificateIcon } from '@/components/icons/CertificateIcon'
import { useHospital } from '@/hooks'
import { mapBreadcrumbItems } from '@/utils'
import styles from './page.module.scss'

export default function NetworkPage() {
  const { pageContent, hospital } = useHospital()

  // pageContent에서 network 페이지 정보 가져오기
  const networkInfo = pageContent.network

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return mapBreadcrumbItems(networkInfo?.breadcrumbs)
  }, [networkInfo?.breadcrumbs])

  // 절차 단계 아이콘 매핑
  const getStepIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      DocumentIcon: <DocumentIcon width={60} height={60} stroke='#9F1836' />,
      ReviewIcon: <ReviewIcon width={60} height={60} stroke='#9F1836' />,
      ApprovalIcon: <ApprovalIcon width={60} height={60} stroke='#9F1836' />,
      HandshakeIcon: <HandshakeIcon width={60} height={60} stroke='#9F1836' />,
      CertificateIcon: <CertificateIcon width={60} height={60} stroke='#9F1836' />
    }
    return iconMap[iconName] || null
  }

  // 절차 단계 데이터 변환
  const processSteps = useMemo(() => {
    if (!networkInfo?.processSteps) return []
    return networkInfo.processSteps.map(step => ({
      stepNumber: step.stepNumber,
      title: step.title,
      icon: getStepIcon(step.icon)
    }))
  }, [networkInfo?.processSteps])

  if (!networkInfo) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>협력네트워크 소개 & 신청</h1>

          <InfoBox
            variant='guide'
            messages={networkInfo.intro || []}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          {/* 협력병·의원 혜택안내 */}
          {networkInfo.benefits && networkInfo.benefits.length > 0 && (
            <section className={styles.section}>
              <SectionTitle title='협력병·의원 혜택안내' />
              <ProcedureList items={networkInfo.benefits} />
            </section>
          )}

          {/* 협력병·의원 체결 절차 */}
          <section className={styles.section}>
            <SectionTitle title='협력병·의원 체결 절차' />

            {/* 대상 */}
            {networkInfo.target && (
              <div className={styles.targetSection}>
                {networkInfo.target.hospital && networkInfo.target.hospital.length > 0 && (
                  <div className={styles.targetItem}>
                    <ProcedureList label='• 대상' items={networkInfo.target.hospital} />
                  </div>
                )}
                {networkInfo.target.clinic && networkInfo.target.clinic.length > 0 && (
                  <div className={styles.targetItem}>
                    <ProcedureList items={networkInfo.target.clinic} />
                  </div>
                )}
              </div>
            )}

            {/* 신청방법 */}
            {networkInfo.applicationMethod && networkInfo.applicationMethod.length > 0 && (
              <div className={styles.applicationMethodSection}>
                <ProcedureList label='• 신청방법' items={networkInfo.applicationMethod} />
              </div>
            )}

            {/* 체결절차 */}
            {processSteps.length > 0 && <ProcessSteps steps={processSteps} />}
          </section>

          {/* 협력체결 방법 문의 */}
          <section className={styles.section}>
            <SectionTitle title='협력체결 방법 문의' />

            <div className={styles.contactSection}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <PhoneIcon width={60} height={60} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>전화 :</span>
                  <span className={styles.contactValue}>{networkInfo.contact?.phone || ''}</span>
                </div>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <FaxIcon width={60} height={60} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>팩스 :</span>
                  <span className={styles.contactValue}>{networkInfo.contact?.fax || ''}</span>
                </div>
              </div>
            </div>

            {networkInfo.downloadLink && (
              <a href={networkInfo.downloadLink} className={styles.downloadLink}>
                <DownloadIcon width={16} height={16} stroke='#9F1836' />
                <span>협력병의원 신청서 다운로드</span>
              </a>
            )}

            <div className={styles.buttonGroup}>
              {networkInfo.applicationLinks?.hospital && (
                <Button
                  variant='outline'
                  size='large'
                  className={styles.applicationButton}
                  onClick={() => {
                    window.location.href = networkInfo.applicationLinks?.hospital || '#'
                  }}
                >
                  협력병원 온라인 신청
                </Button>
              )}
              {networkInfo.applicationLinks?.clinic && (
                <Button
                  variant='primary'
                  size='large'
                  className={styles.applicationButton}
                  onClick={() => {
                    window.location.href = networkInfo.applicationLinks?.clinic || '#'
                  }}
                >
                  협력의원 온라인 신청
                </Button>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
