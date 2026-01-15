'use client';

import React, { useState } from 'react';
import { SNSCard } from '@/components/molecules';
import { Icon } from '@/components/atoms';
import styles from './SNSSection.module.scss';

const snsPosts = [
  {
    id: 1,
    image: '/images/sns-1.jpg',
    title: '고려대학교 안암병원의 새로운 도...',
    href: '/sns/1',
  },
  {
    id: 2,
    image: '/images/sns-2.jpg',
    title: '[안암인싸] 고려대안암병원 | 산...',
    href: '/sns/2',
  },
  {
    id: 3,
    image: '/images/sns-3.jpg',
    title: '고대병원 간호사 이야기 들어볼래?',
    href: '/sns/3',
  },
];

export const SNSSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : snsPosts.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < snsPosts.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className={styles.snsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>고대안암병원 SNS</h2>
        
        <div className={styles.carousel}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {snsPosts.map((post) => (
              <div key={post.id} className={styles.carouselItem}>
                <SNSCard image={post.image} title={post.title} href={post.href} />
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.pagination}>
            {currentIndex + 1} — {snsPosts.length}
          </div>
          <div className={styles.navigation}>
            <button className={styles.navButton} onClick={handlePrev} aria-label="이전">
              <Icon name="arrow-left" size={20} />
            </button>
            <button className={styles.navButton} onClick={handleNext} aria-label="다음">
              <Icon name="arrow-right" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
