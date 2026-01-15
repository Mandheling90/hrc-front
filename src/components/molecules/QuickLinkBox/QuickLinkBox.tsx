'use client';

import React from 'react';
import Link from 'next/link';
import { Icon, IconName } from '@/components/atoms';
import styles from './QuickLinkBox.module.scss';

export interface QuickLinkBoxProps {
  href: string;
  label: string;
  icon?: IconName;
  download?: boolean;
  className?: string;
}

export const QuickLinkBox: React.FC<QuickLinkBoxProps> = ({
  href,
  label,
  icon,
  download = false,
  className,
}) => {
  const boxClasses = [styles.quickLinkBox, className].filter(Boolean).join(' ');

  return (
    <Link href={href} className={boxClasses} download={download}>
      {icon && <Icon name={icon} size={20} className={styles.icon} />}
      <span className={styles.label}>{label}</span>
      {download && <Icon name="download" size={16} className={styles.downloadIcon} />}
    </Link>
  );
};
