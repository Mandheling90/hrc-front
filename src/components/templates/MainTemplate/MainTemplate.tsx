'use client';

import React from 'react';
import { Header, HeroSection, NoticeSection, SNSSection, PartnerSection, Footer } from '@/components/organisms';
import styles from './MainTemplate.module.scss';

export const MainTemplate: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <Header />
      <main id="contents">
        <HeroSection />
        <NoticeSection />
        <SNSSection />
        <PartnerSection />
      </main>
      <Footer />
    </div>
  );
};
