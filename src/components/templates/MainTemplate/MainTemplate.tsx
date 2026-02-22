'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { HeroSection } from '@/components/organisms/HeroSection/HeroSection'
import { NoticeSection } from '@/components/organisms/NoticeSection/NoticeSection'
import { SNSSection } from '@/components/organisms/SNSSection/SNSSection'
import { Footer } from '@/components/organisms/Footer/Footer'
import { PopupZone } from '@/components/organisms/PopupZone/PopupZone'
import styles from './MainTemplate.module.scss'

export const MainTemplate: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <Header />
      <main id='contents'>
        <HeroSection />
        <NoticeSection />
        <SNSSection />
      </main>
      <Footer />
      <PopupZone />
    </div>
  )
}
