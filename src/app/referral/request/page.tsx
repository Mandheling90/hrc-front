'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'
import { DocumentReferralIcon } from '@/components/icons/DocumentReferralIcon'
import { HospitalPortalIcon } from '@/components/icons/HospitalPortalIcon'
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { SNSTalkIcon } from '@/components/icons/SNSTalkIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { useHospital } from '@/hooks'
import { RequestCard, ServiceItem } from '@/types/hospital'
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

  // 카드 아이콘 매핑 (전화의뢰/SNS용)
  const cardIconMap: Record<string, React.ReactNode> = {
    PhoneRequestIcon: <PhoneRequestIcon width={36} height={36} stroke='#720021' />,
    SNSTalkIcon: <SNSTalkIcon width={36} height={36} fill='#720021' stroke='#720021' />
  }

  // 전자카드 아이콘 매핑 (ServiceCard용)
  const electronicCardIconMap: Record<string, React.ReactNode> = {
    DocumentReferralIcon: <DocumentReferralIcon width={60} height={60} fill='#720021' stroke='#720021' />,
    HospitalPortalIcon: <HospitalPortalIcon width={60} height={60} stroke='#720021' />,
    ReferralIcon: <ReferralIcon width={60} height={60} fill='#720021' />
  }

  // 전자카드를 ServiceSection용 형식으로 변환
  const electronicCards = useMemo(() => {
    if (!requestInfo?.cards) return []

    return requestInfo.cards
      .filter(card => card.type === 'electronic')
      .map((card, index) => {
        const isExchangeCard = card.description === '진료정보교류'
        return {
          id: `electronic-${index}`,
          icon: electronicCardIconMap[card.icon] || (
            <DocumentReferralIcon width={60} height={60} fill='#720021' stroke='#720021' />
          ),
          title: card.title,
          description: card.description || '',
          href: isExchangeCard ? '/referral/request/exchange' : undefined
        }
      })
  }, [requestInfo?.cards])

  // 전화의뢰/SNS 카드 렌더링 함수
  const renderPhoneOrSNSCard = (card: RequestCard, index: number) => {
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
    }
    return null
  }

  // Breadcrumb 설정 (병원별로 다를 수 있음)
  const breadcrumbItems =
    requestInfo?.breadcrumbs?.map(item => ({
      label: item.label,
      href: item.href,
      icon: item.icon ? iconMap[item.icon] : undefined,
      iconAfter: item.iconAfter
    })) || []

  // ServiceItem을 ServiceSection에서 사용하는 형식으로 변환
  const mapServiceItems = (items: ServiceItem[]) => {
    return items.map(item => ({
      id: item.id,
      icon: iconMap[item.icon] || <ReferralIcon />,
      title: item.title,
      description: item.description.replace(/\\n/g, '\n'),
      href: item.href,
      tabletSpan: item.tabletSpan,
      mobileSpan: item.mobileSpan,
      mobileTitleBelowIcon: item.mobileTitleBelowIcon
    }))
  }

  // 병원별 서비스 목록
  const services = useMemo(() => {
    return mapServiceItems(pageContent.referralRequest?.services || [])
  }, [pageContent.referralRequest?.services])

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

          <ServiceSection title='이용가능한 서비스' services={services} />

          <div className={styles.requestMethods}>
            {requestInfo?.cards && (
              <>
                {/* 전화의뢰/SNS 카드 */}
                {requestInfo.cards
                  .filter(card => card.type === 'phone' || card.type === 'sns')
                  .map((card, index) => (
                    <div key={`phone-sns-${index}`}>{renderPhoneOrSNSCard(card, index)}</div>
                  ))}

                {/* 전자카드는 ServiceSection으로 처리 */}
                {electronicCards.length > 0 && (
                  <ServiceSection title='' services={electronicCards} className={styles.electronicCardsSection} />
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
