'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const footerLinks = [
  { href: '#', label: '개인정보처리방침', primary: true },
  { href: '#', label: '이용약관' },
  { href: '#', label: '사이트맵' },
  { href: '#', label: '구로병원 진료협력센터' },
];

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <h2></h2>
          <div className={styles.link}>
            {footerLinks.map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className={styles.separator}></span>}
                <Link
                  href={link.href}
                  className={link.primary ? `${styles.colorPrimary} ${styles.textBold}` : ''}
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.info}>
            <p>고려대학교 진료협력센터</p>
            <address>주소: (우편번호 15355) 경기도 안산시 단원구 적금로 123(고잔1동 516)</address>
            <div className="flex">
              <span>대표전화 : 031-412-5103 / FAX : 031-412-4266</span>
              <span>진료예약 : 1577-7576</span>
            </div>
          </div>
          <div className={styles.mark}>
            <img src="/images/img-footermark.png" alt="인증마크" />
          </div>
        </div>
        <p className={styles.copy}>ⓒ 2025 KUMCrefer. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
