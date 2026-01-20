'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'
import { DocumentReferralIcon } from '@/components/icons/DocumentReferralIcon'
import { HospitalPortalIcon } from '@/components/icons/HospitalPortalIcon'
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { SNSTalkIcon } from '@/components/icons/SNSTalkIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { useHospital } from '@/hooks'
import { RequestCard } from '@/types/hospital'
import styles from './page.module.scss'

export default function ReferralRequestPage() {
  const { pageContent } = useHospital()

  // pageContent에서 request 페이지 정보 가져오기
  const requestInfo = pageContent.referralRequest

  // 아이콘 매핑
  const iconMap: Record<string, React.ReactNode> = {
    HomeIcon: <HomeIcon />,
    ChevronDownIcon: <ChevronDownIcon width={12} height={12} />
  }

  // 카드 아이콘 매핑
  const cardIconMap: Record<string, React.ReactNode> = {
    PhoneRequestIcon: <PhoneRequestIcon width={36} height={36} stroke='#720021' />,
    DocumentReferralIcon: <DocumentReferralIcon width={36} height={36} fill='#720021' stroke='#720021' />,
    HospitalPortalIcon: <HospitalPortalIcon width={36} height={36} stroke='#720021' />,
    ReferralIcon: <ReferralIcon width={36} height={36} fill='#720021' />,
    SNSTalkIcon: <SNSTalkIcon width={36} height={36} fill='#720021' stroke='#720021' />
  }

  // 카드 렌더링 함수
  const renderCard = (card: RequestCard, index: number) => {
    if (card.type === 'phone') {
      return (
        <div key={index} className={`${styles.requestCard} ${styles.phoneCard}`}>
          <div className={styles.leftSection}>
            <div className={styles.iconWrapper}>
              <div className={styles.iconCircle}>{cardIconMap[card.icon]}</div>
            </div>
            <h3 className={styles.title}>{card.title}</h3>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.details}>
              <p className={styles.detailItem}>T. {card.phone || requestInfo?.phone || ''}</p>
              {card.operatingHours && (
                <>
                  <div className={styles.detailRow}>
                    <span className={styles.detailText}>평일</span>
                    <span className={styles.detailText}>{card.operatingHours.weekday}</span>
                  </div>
                  {card.operatingHours.saturday && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailText}>토요일</span>
                      <span className={styles.detailText}>{card.operatingHours.saturday}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )
    } else if (card.type === 'sns') {
      return (
        <div key={index} className={`${styles.requestCard} ${styles.phoneCard}`}>
          <div className={styles.leftSection}>
            <div className={styles.iconWrapper}>
              <div className={styles.iconCircle}>{cardIconMap[card.icon]}</div>
            </div>
            <h3 className={styles.title}>{card.title}</h3>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.details}>
              {card.channel && <p className={styles.detailItem}>{card.channel}</p>}
              {card.operatingHours && (
                <>
                  <div className={styles.detailRow}>
                    <span className={styles.detailText}>평일</span>
                    <span className={styles.detailText}>{card.operatingHours.weekday}</span>
                  </div>
                  {card.operatingHours.saturday && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailText}>토요일</span>
                      <span className={styles.detailText}>{card.operatingHours.saturday}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div key={index} className={`${styles.requestCard} ${styles.electronicCard}`}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconCircle}>{cardIconMap[card.icon]}</div>
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.title}>{card.title}</h3>
            {card.description && <p className={styles.description}>{card.description}</p>}
          </div>
        </div>
      )
    }
  }

  // Breadcrumb 설정 (병원별로 다를 수 있음)
  const defaultBreadcrumbs = [
    { label: '', href: '/', icon: <HomeIcon /> },
    { label: '진료의뢰', href: '/referral', icon: <ChevronDownIcon width={12} height={12} />, iconAfter: true },
    { label: '진료협력센터 의뢰', icon: <ChevronDownIcon width={12} height={12} />, iconAfter: true }
  ]

  const breadcrumbItems = requestInfo?.breadcrumbs
    ? requestInfo.breadcrumbs.map(item => ({
        label: item.label,
        href: item.href,
        icon: item.icon ? iconMap[item.icon] : undefined,
        iconAfter: item.iconAfter
      }))
    : defaultBreadcrumbs

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>진료협력센터 의뢰</h1>

          <InfoBox
            variant='guide'
            messages={requestInfo?.intro || []}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          <div className={styles.requestMethods}>
            {requestInfo?.cards ? (
              // 구로병원처럼 커스텀 카드가 있는 경우
              requestInfo.cards.map((card, index) => {
                if (card.type === 'phone' || card.type === 'sns') {
                  return renderCard(card, index)
                } else {
                  return (
                    <div key={index} className={styles.electronicCards}>
                      {renderCard(card, index)}
                    </div>
                  )
                }
              })
            ) : (
              // 기본 카드 구조 (안암병원, 안산병원)
              <>
                <div className={`${styles.requestCard} ${styles.phoneCard}`}>
                  <div className={styles.leftSection}>
                    <div className={styles.iconWrapper}>
                      <div className={styles.iconCircle}>
                        <PhoneRequestIcon width={36} height={36} stroke='#720021' />
                      </div>
                    </div>
                    <h3 className={styles.title}>전화의뢰</h3>
                  </div>
                  <div className={styles.rightSection}>
                    <div className={styles.details}>
                      <p className={styles.detailItem}>T. {requestInfo?.phone || ''}</p>
                      <div className={styles.detailRow}>
                        <span className={styles.detailText}>평일</span>
                        <span className={styles.detailText}>{requestInfo?.operatingHours?.weekday || ''}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailText}>토요일</span>
                        <span className={styles.detailText}>{requestInfo?.operatingHours?.saturday || ''}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.electronicCards}>
                  <div className={`${styles.requestCard} ${styles.electronicCard}`}>
                    <div className={styles.iconWrapper}>
                      <div className={styles.iconCircle}>
                        <DocumentReferralIcon width={36} height={36} fill='#720021' stroke='#720021' />
                      </div>
                    </div>
                    <div className={styles.textWrapper}>
                      <h3 className={styles.title}>전자의뢰</h3>
                      <p className={styles.description}>진료정보교류</p>
                    </div>
                  </div>

                  <div className={`${styles.requestCard} ${styles.electronicCard}`}>
                    <div className={styles.iconWrapper}>
                      <div className={styles.iconCircle}>
                        <HospitalPortalIcon width={36} height={36} stroke='#720021' />
                      </div>
                    </div>
                    <div className={styles.textWrapper}>
                      <h3 className={styles.title}>전자의뢰</h3>
                      <p className={styles.description}>심평원 중계포털</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
