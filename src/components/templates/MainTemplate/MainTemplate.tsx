'use client';

import React from 'react';
import { Header, HeroSection, NoticeSection, SNSSection, Footer } from '@/components/organisms';
import styles from './MainTemplate.module.scss';

export const MainTemplate: React.FC = () => {
  return (
    <div className={styles.mainTemplate}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <NoticeSection />
        <SNSSection />
      </main>
      <Footer />
    </div>
  );
};
