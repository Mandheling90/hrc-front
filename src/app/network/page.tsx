'use client'

import React, { useMemo, useCallback, useState } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { ServiceSection, ServiceItem } from '@/components/organisms/ServiceSection/ServiceSection'
import { Button } from '@/components/atoms/Button/Button'
import { ConfirmButtons } from '@/components/molecules/ConfirmButtons/ConfirmButtons'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { FaxIcon } from '@/components/icons/FaxIcon'
import { FileDownloadIcon } from '@/components/icons/FileDownloadIcon'
import { DocumentIcon } from '@/components/icons/DocumentIcon'
import { ReviewIcon } from '@/components/icons/ReviewIcon'
import { ApprovalIcon } from '@/components/icons/ApprovalIcon'
import { HandshakeIcon } from '@/components/icons/HandshakeIcon'
import { CertificateIcon } from '@/components/icons/CertificateIcon'
import { useHospital, useMyProfile } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { mapBreadcrumbItems } from '@/utils'
import styles from './page.module.scss'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'

export default function NetworkPage() {
  const router = useHospitalRouter()
  const { pageContent } = useHospital()
  const { user } = useAuthContext()
  const { user: profileUser, loading: profileLoading } = useMyProfile()
  const [alertModal, setAlertModal] = useState(false)

  // 원장여부 체크 - 서버 최신 프로필 기준으로 판단
  const handleApplicationClick = useCallback((path: string) => {
    if (!user) {
      router.push('/login')
      return
    }
    if (profileLoading) return
    if (!profileUser?.profile?.isDirector) {
      setAlertModal(true)
      return
    }
    router.push(path)
  }, [user, profileUser, profileLoading, router])

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

  // 절차 단계 데이터를 ServiceSection 형식으로 변환
  const processSteps = useMemo(() => {
    if (!networkInfo?.processSteps) return []
    return networkInfo.processSteps.map(
      (step, index): ServiceItem => ({
        id: `step-${index + 1}`,
        icon: getStepIcon(step.icon),
        title: step.title,
        description: `STEP.${step.stepNumber}`
      })
    )
  }, [networkInfo?.processSteps])

  if (!networkInfo) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력네트워크 소개 & 신청</h1>

          {/* Intro Box */}
          <InfoBox
            variant='guide'
            messages={networkInfo.intro || []}
            showBullets={false}
            contentAlign='center'
            textAlign='center'
            className={styles.introBox}
          />

          {/* 상호협력내용 - 구로병원 전용 */}
          {networkInfo.cooperationContent && networkInfo.cooperationContent.length > 0 && (
            <section className={styles.section}>
              <SectionTitle title='상호협력내용' />
              <div className={styles.procedureListWrapper}>
                <ProcedureList items={networkInfo.cooperationContent} />
              </div>
            </section>
          )}

          {/* 협력병·의원 혜택안내 */}
          {networkInfo.benefits && networkInfo.benefits.length > 0 && (
            <section className={styles.section}>
              <SectionTitle title='협력병·의원 혜택안내' />
              <div className={styles.procedureListWrapper}>
                <ProcedureList items={networkInfo.benefits} />
              </div>
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
                    <div className={styles.procedureListWrapper}>
                      <ProcedureList label='대상' items={networkInfo.target.hospital} />
                    </div>
                  </div>
                )}
                {networkInfo.target.clinic && networkInfo.target.clinic.length > 0 && (
                  <div className={styles.targetItem}>
                    <div className={styles.procedureListWrapper}>
                      <ProcedureList items={networkInfo.target.clinic} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 신청방법 */}
            {networkInfo.applicationMethod && networkInfo.applicationMethod.length > 0 && (
              <div className={styles.applicationMethodSection}>
                <div className={styles.procedureListWrapper}>
                  <ProcedureList label='신청방법' items={networkInfo.applicationMethod} />
                </div>
              </div>
            )}

            {/* 체결절차 */}
            {processSteps.length > 0 && (
              <div className={styles.processSection}>
                <div className={styles.processLabel}>
                  <span className={styles.processBullet}></span>
                  체결절차
                </div>
                <ServiceSection
                  services={processSteps}
                  useStepBadge={true}
                  tabletThreeTwoLayout={true}
                  className={styles.processCards}
                />
              </div>
            )}
          </section>

          {/* 협력체결 방법 문의 */}
          <section className={styles.section}>
            <SectionTitle title='협력체결 방법 문의' />

            <div className={styles.contactSection}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <PhoneRequestIcon width={60} height={60} stroke='#9F1836' className={styles.contactIconSvg} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>전화 :</span>
                  <span className={styles.contactValue}>{networkInfo.contact?.phone || ''}</span>
                </div>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <FaxIcon width={60} height={60} stroke='#9F1836' className={styles.contactIconSvg} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>팩스 :</span>
                  <span className={styles.contactValue}>{networkInfo.contact?.fax || ''}</span>
                </div>
              </div>
            </div>

            {networkInfo.downloadLinks && networkInfo.downloadLinks.length > 0 ? (
              <div className={styles.downloadList}>
                {networkInfo.downloadLinks.map((link, index) => (
                  <a key={index} href={link.href} className={styles.downloadBox} download>
                    <span className={styles.downloadFileName}>{link.label}</span>
                    <FileDownloadIcon width={24} height={24} fill='#636363' />
                  </a>
                ))}
              </div>
            ) : networkInfo.downloadLink ? (
              <a href={networkInfo.downloadLink} className={styles.downloadBox} download>
                <span className={styles.downloadFileName}>협력병의원 신청서 다운로드.zip</span>
                <FileDownloadIcon width={24} height={24} fill='#636363' />
              </a>
            ) : null}

            <ConfirmButtons
              className={styles.networkConfirmButtons}
              secondaryButton={{
                label: '협력병원 온라인 신청',
                onClick: () => handleApplicationClick('/network/hospital-application'),
                variant: 'primaryOutline'
              }}
              primaryButton={{
                label: '협력의원 온라인 신청',
                onClick: () => handleApplicationClick('/network/clinic-application')
              }}
              swapOnHover
            />
          </section>
        </div>
      </main>
      <Footer />

      {/* 원장이 아닌 경우 알림 모달 */}
      <AlertModal
        isOpen={alertModal}
        message='원장만 협력네트워크 신청이 가능합니다.'
        closeButtonText='확인'
        onClose={() => setAlertModal(false)}
        closeOnBackdropClick={true}
      />
    </div>
  )
}
