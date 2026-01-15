'use client';

import React from 'react';
import Link from 'next/link';
import styles from './NoticeCard.module.scss';

export interface NoticeCardProps {
  title: string;
  date: string;
  href: string;
  className?: string;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ title, date, href, className }) => {
  const cardClasses = [styles.noticeCard, className].filter(Boolean).join(' ');

  return (
    <Link href={href} className={cardClasses}>
      <span className={styles.title}>{title}</span>
      <span className={styles.date}>{date}</span>
    </Link>
  );
};
