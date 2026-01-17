'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './SNSSection.module.scss';

const snsPosts = [
  {
    id: 1,
    image: '/images/img-section3-1.jpg',
    title:
      '[톡명의] 수술뿐만 아니라 연구로 미래를 바꾸는 의사과학자🔎 | 척추종양 명의🩺 | 톡쏘는 명의들💘',
  },
  {
    id: 2,
    image: '/images/img-section3-2.jpg',
    title:
      '환자를 위해 20여 개의 진료과가 한 공간에 모인 이곳은?! | 암센터의 운영 시스템 및 장점 | Dr.log',
  },
  {
    id: 3,
    image: '/images/img-section3-3.jpg',
    title: '고대병원 간호사 이야기 들어볼래?',
  },
  {
    id: 4,
    image: '/images/img-section3-4.jpg',
    title: '[ENG] 절체절명의 환자를 지켜내다ㅣ생과 사의 최전선, 응급의료센터🚨ㅣKU Top Team🏥',
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
    <section className={`section ${styles.section3}`}>
      <div className={styles.verticalText}>
        <div className={styles.track}>
          <div className={styles.con}>
            <span>Korea University Hospital Referral Center</span>
          </div>
          <div className={styles.con} aria-hidden="true">
            <span>Korea University Hospital Referral Center</span>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 className={styles.sectionTitle}>고대안암병원 SNS</h3>
        <div className="flex">
          <div className={styles.thumbSwiper}>
            <div className={styles.swiperWrapper}>
              {snsPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`${styles.swiperSlide} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className={styles.imgBox}>
                    <img src={post.image} alt={post.title} />
                  </div>
                  <p>{post.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.mainSwiper}>
            <div className={styles.swiperWrapper}>
              {snsPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`${styles.swiperSlide} ${index === currentIndex ? styles.active : ''}`}
                >
                  <Link href="#">
                    <img src={post.image} alt={post.title} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.customControl}>
          <span className={styles.current}>{currentIndex + 1}</span>
          <div className={styles.progress}>
            <span
              className={styles.bar}
              style={{ width: `${((currentIndex + 1) / snsPosts.length) * 100}%` }}
            ></span>
          </div>
          <span className={styles.total}>{snsPosts.length}</span>
          <button className={styles.prev} type="button" onClick={handlePrev}></button>
          <button className={styles.next} type="button" onClick={handleNext}></button>
        </div>
      </div>
    </section>
  );
};
