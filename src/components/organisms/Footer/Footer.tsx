'use client';

import React from 'react';
import { Icon } from '@/components/atoms';
import styles from './Footer.module.scss';

const partnerLogos = [
  { name: '건강보험심사평가원', image: '/images/partner-1.png' },
  { name: '보건복지부 마이차트', image: '/images/partner-2.png' },
  { name: '한국보건의료정보원', image: '/images/partner-3.png' },
  { name: '안암병원 진료협력센터', image: '/images/partner-4.png' },
];

const footerLinks = [
  { href: '/terms', label: '인터넷이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/rights', label: '환자권리장전' },
  { href: '/email', label: '이메일주소수집거부' },
];

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.partners}>
        <div className={styles.container}>
          <div className={styles.partnerLogos}>
            {partnerLogos.map((partner, index) => (
              <div key={index} className={styles.partnerLogo}>
                {/* 실제 로고 이미지로 교체 필요 */}
                <div className={styles.logoPlaceholder}>{partner.name}</div>
              </div>
            ))}
          </div>
          <div className={styles.partnerControls}>
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
      
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.logoSection}>
              <div className={styles.footerLogo}>
                <span className={styles.logoText}>KU MEDICINE</span>
                <span className={styles.logoSubtext}>고려대학교 안암병원 진료협력센터</span>
              </div>
            </div>
            
            <div className={styles.linksSection}>
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.footerLink}>
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className={styles.actionsSection}>
              <button className={styles.actionButton}>
                <Icon name="close" size={16} />
                진료지원부서
              </button>
              <button className={styles.actionButton}>
                <Icon name="close" size={16} />
                패밀리 사이트
              </button>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <div className={styles.info}>
              <p className={styles.address}>
                주소: (우) 02841. 서울시 성북구 고려대로 73(안암동5가)
              </p>
              <p className={styles.phone}>대표번호: 1577-0083</p>
            </div>
            
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="네이버">
                NAVER
              </a>
              <a href="#" className={styles.socialLink} aria-label="유튜브">
                YOUTUBE
              </a>
            </div>
          </div>
          
          <div className={styles.copyright}>
            <p>Copyright© 2022 by Korea University ANAM Hospital All Rights Reserved.</p>
          </div>
          
          <div className={styles.certifications}>
            <div className={styles.certification}>
              <div className={styles.certTitle}>EMR 인증</div>
              <div className={styles.certInfo}>인증범위: 진료협력센터 시스템</div>
              <div className={styles.certDate}>유효기간: 2022.01.01 ~ 2024.12.31</div>
            </div>
            <div className={styles.certification}>
              <div className={styles.certTitle}>ISMS 인증</div>
              <div className={styles.certInfo}>인증범위: 진료협력센터 시스템</div>
              <div className={styles.certDate}>유효기간: 2022.01.01 ~ 2024.12.31</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
