'use client';

import React, { useState } from 'react';
import { NoticeCard } from '@/components/molecules';
import { Icon } from '@/components/atoms';
import styles from './NoticeSection.module.scss';

const notices = [
  { id: 1, title: '2025년 9월 외래진료 시간표입니다.', date: '2025.07.29', href: '/notice/1' },
  { id: 2, title: '초진환자 진료 예약 안내', date: '2025.07.16', href: '/notice/2' },
  { id: 3, title: '사용자 매뉴얼 안내', date: '2025.06.27', href: '/notice/3' },
];

const categories = [
  { id: 'center', label: '진료협력센터' },
  { id: 'hospital', label: '고대안암병원', active: true },
];

export const NoticeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('hospital');

  return (
    <section className={styles.noticeSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>공지사항</h2>
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  activeCategory === category.id ? styles['categoryButton--active'] : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                {activeCategory === category.id && (
                  <Icon name="close" size={16} className={styles.closeIcon} />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.notices}>
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                title={notice.title}
                date={notice.date}
                href={notice.href}
              />
            ))}
          </div>
          
          <div className={styles.banner}>
            <div className={styles.bannerContent}>
              <h3 className={styles.bannerTitle}>협력 병·의원 전용 의사전용 핫라인 안</h3>
              <p className={styles.bannerSubtitle}>서비스는 로그인 후 이용하실 수 있습니다.</p>
              <button className={styles.bannerButton}>
                바로가기
                <Icon name="arrow-right" size={20} />
              </button>
            </div>
            <div className={styles.bannerImage}>
              {/* 실제 이미지로 교체 필요 */}
              <div className={styles.placeholderImage}>의사 이미지</div>
            </div>
            <div className={styles.bannerControls}>
              <div className={styles.pagination}>1/2</div>
              <div className={styles.controls}>
                <button className={styles.controlButton}>
                  <Icon name="pause" size={16} />
                </button>
                <button className={styles.controlButton}>
                  <Icon name="arrow-left" size={16} />
                </button>
                <button className={styles.controlButton}>
                  <Icon name="arrow-right" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
