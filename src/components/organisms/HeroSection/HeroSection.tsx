'use client';

import React from 'react';
import { QuickLinkBox } from '@/components/molecules';
import { ContactBox } from '@/components/molecules';
import styles from './HeroSection.module.scss';

const quickLinksLeft = [
  { href: '/inquiry/patient', label: '의뢰환자 조회' },
  { href: '/inquiry/return', label: '회송환자 조회' },
  { href: '/econsult', label: 'E-consult 신청' },
  { href: '/hotline', label: '교수직통 핫라인' },
];

const quickLinksCenter = [
  { href: '/download/form', label: '서식다운로드', icon: 'download' as const },
  { href: '/download/referral', label: '진료의뢰서', icon: 'download' as const },
  { href: '/download/cooperation', label: '협력병의원 체결 신청서류', icon: 'download' as const },
  { href: '/download/consent', label: '진료정보공개동의서', icon: 'download' as const },
];

const quickLinksRight = [
  { href: '/search/doctor', label: '의료진 검색', icon: 'user' as const },
  { href: '/department', label: '진료과 안내', icon: 'calendar' as const },
  { href: '/schedule', label: '외래시간표', icon: 'calendar' as const },
  { href: '/location', label: '오시는 길', icon: 'map-pin' as const },
];

const contactInfo = [
  { label: '팩스', value: '02-920-5893' },
  { label: '콜센터(진료예약)', value: '1577-0083' },
  { label: '응급실', value: '02-920-5119' },
];

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundImage}>
        {/* 배경 이미지는 실제 이미지로 교체 필요 */}
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.mainText}>
          <h1 className={styles.title}>
            스마트 협력으로 완성하는 차세대 의료연계
            <br />
            고려대학교안암병원 진료협력센터
          </h1>
        </div>
        
        <div className={styles.quickLinks}>
          <div className={styles.quickLinksGroup}>
            {quickLinksLeft.map((link) => (
              <QuickLinkBox key={link.href} href={link.href} label={link.label} />
            ))}
          </div>
          
          <div className={styles.quickLinksGroup}>
            {quickLinksCenter.map((link) => (
              <QuickLinkBox
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                download
              />
            ))}
          </div>
          
          <div className={styles.quickLinksGrid}>
            {quickLinksRight.map((link) => (
              <QuickLinkBox
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            ))}
          </div>
        </div>
      </div>
      
      <ContactBox mainPhone="02-920-5892" contacts={contactInfo} />
    </section>
  );
};
