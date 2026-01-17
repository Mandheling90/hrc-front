'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Header.module.scss';

const navigationItems = [
  { href: '#', label: '진료의뢰/조회' },
  { href: '#', label: '협력네트워크' },
  { href: '#', label: '공지/정보' },
  { href: '#', label: '진료협력센터 소개' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header id="header" className={styles.header}>
      <div className="container">
        <div className="flex align-center">
          <h1>
            <Link href="#" aria-label="고려대학교 진료협력센터 홈">
              <img src="/assets/images/logo-top.png" alt="고려대학교 진료협력센터" />
            </Link>
          </h1>
          <nav className={styles.gnb}>
            <ul className="flex">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.util}>
            <Link href="#" className={styles.btnLogin} aria-label="로그인">
              <i className={`icon icon-user ${styles.icon}`}></i>
            </Link>
            <button
              id="btnAllMenu"
              className={styles.btnAllMenu}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="전체메뉴 열기"
              aria-label="전체메뉴"
            >
              <i className={`icon icon-menu ${styles.icon}`}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
