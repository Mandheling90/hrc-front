'use client';

import React from 'react';
import Link from 'next/link';
import styles from './SNSCard.module.scss';

export interface SNSCardProps {
  image?: string;
  title: string;
  href: string;
  className?: string;
}

export const SNSCard: React.FC<SNSCardProps> = ({ image, title, href, className }) => {
  const cardClasses = [styles.snsCard, className].filter(Boolean).join(' ');

  return (
    <Link href={href} className={cardClasses}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.placeholderImage}>이미지</div>
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
      </div>
    </Link>
  );
};
