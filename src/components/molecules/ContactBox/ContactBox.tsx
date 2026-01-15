'use client';

import React from 'react';
import { Icon } from '@/components/atoms';
import styles from './ContactBox.module.scss';

export interface ContactInfo {
  label: string;
  value: string;
}

export interface ContactBoxProps {
  mainPhone: string;
  contacts: ContactInfo[];
  className?: string;
}

export const ContactBox: React.FC<ContactBoxProps> = ({ mainPhone, contacts, className }) => {
  const boxClasses = [styles.contactBox, className].filter(Boolean).join(' ');

  return (
    <div className={boxClasses}>
      <div className={styles.iconWrapper}>
        <Icon name="phone" size={32} color="white" />
      </div>
      <div className={styles.mainPhone}>{mainPhone}</div>
      <div className={styles.contacts}>
        {contacts.map((contact, index) => (
          <div key={index} className={styles.contactItem}>
            <span className={styles.label}>{contact.label}</span>
            <span className={styles.value}>{contact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
