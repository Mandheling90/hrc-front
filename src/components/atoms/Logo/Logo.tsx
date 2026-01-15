import React from 'react';
import styles from './Logo.module.scss';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  const logoClasses = [styles.logo, styles[`logo--${size}`], className].filter(Boolean).join(' ');

  return (
    <div className={logoClasses}>
      <div className={styles.logoMain}>
        <span className={styles.logoText}>KU MEDICINE</span>
      </div>
      <div className={styles.logoSub}>
        <div className={styles.logoTitle}>고려대학교 안암병원 진료협력센터</div>
        <div className={styles.logoSubtitle}>KOREA UNIVERSITY ANAM HOSPITAL REFERRAL CENTER</div>
      </div>
    </div>
  );
};
