'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/atoms';
import { NavigationItem } from '@/components/molecules';
import { Icon } from '@/components/atoms';
import styles from './Header.module.scss';

const navigationItems = [
  { href: '/referral', label: '진료의뢰/조회' },
  { href: '/network', label: '협력네트워크' },
  { href: '/notice', label: '공지/정보' },
  { href: '/about', label: '진료협력센터 소개' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Logo size="md" />
        </div>
        
        <nav className={styles.nav}>
          {navigationItems.map((item) => (
            <NavigationItem key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        
        <div className={styles.actions}>
          <button className={styles.actionButton} aria-label="사용자 메뉴">
            <Icon name="user" size={24} />
          </button>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navigationItems.map((item) => (
            <NavigationItem key={item.href} href={item.href} label={item.label} />
          ))}
        </div>
      )}
    </header>
  );
};
