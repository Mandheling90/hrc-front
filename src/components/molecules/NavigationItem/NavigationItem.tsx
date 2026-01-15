'use client';

import React from 'react';
import Link from 'next/link';
import styles from './NavigationItem.module.scss';

export interface NavigationItemProps {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  href,
  label,
  active = false,
  className,
}) => {
  const itemClasses = [
    styles.navItem,
    active && styles['navItem--active'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={itemClasses}>
      {label}
    </Link>
  );
};
