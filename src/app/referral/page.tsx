'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { SystemIcon } from '@/components/icons/SystemIcon'
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { PatientIcon } from '@/components/icons/PatientIcon'
import { ConsultingIcon } from '@/components/icons/ConsultingIcon'
import { NetworkIcon } from '@/components/icons/NetworkIcon'
import styles from './page.module.scss'
import { ShieldIcon } from '@/components/icons/ShieldIcon'

export default function ReferralPage() {
  const services = [
    {
      id: 'referral',
      icon: <ReferralIcon />,
      title: '진료의뢰',
      description: '진료정보교류와 심평원 중계포털을 이용한 전자의뢰가 가능합니다.',
      href: '#'
    },
    {
      id: 'patient-query',
      icon: <PatientIcon />,
      title: '의뢰 환자 조회',
      description: '의뢰해주신 환자의 진료정보 조회가 가능합니다.',
      href: '#'
    },
    {
      id: 'consulting',
      icon: <ConsultingIcon />,
      title: 'e-Consulting',
      description: '고려대학교 안암병원 자문의를 통해 온라인으로 의료상담이 가능합니다.',
      href: '#'
    },
    {
      id: 'network',
      icon: <NetworkIcon />,
      title: '협력네트워크',
      description: '온라인으로 협력병의원 체결신청이 가능합니다.',
      href: '#'
    }
  ]

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          {/* <Breadcrumbs items={breadcrumbItems} /> */}
          <h1 className={styles.pageTitle}>진료의뢰시스템 소개</h1>

          <InfoBox
            variant='guide'
            icon={<SystemIcon width={48} height={48} fill='#8b6f47' />}
            messages={[
              '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
              '의뢰하신 환자의 진료정보를 확인할 수 있는 시스템입니다.'
            ]}
            showBullets={true}
            contentAlign='center'
          />
          <ServiceSection title='이용가능한 서비스' services={services} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
