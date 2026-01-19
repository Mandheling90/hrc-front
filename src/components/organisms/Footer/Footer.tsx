'use client'

import React from 'react'
import Link from 'next/link'
import { useHospital } from '@/hooks'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  const { hospital, isAnam, isGuro, isAnsan } = useHospital()

  // 다른 병원 진료협력센터 링크 (현재 병원 제외)
  const otherHospitalLinks = [
    { id: 'anam', label: '안암병원 진료협력센터', href: '#' },
    { id: 'guro', label: '구로병원 진료협력센터', href: '#' },
    { id: 'ansan', label: '안산병원 진료협력센터', href: '#' }
  ].filter(item => item.id !== hospital.id)

  const footerLinks = [
    { href: '#', label: '개인정보처리방침', primary: true },
    { href: '#', label: '이용약관' },
    { href: '#', label: '사이트맵' },
    ...otherHospitalLinks
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer id='footer' className={styles.footer}>
      <div className='container'>
        <div className={styles.top}>
          <h2>{hospital.name.full}</h2>
          <div className={styles.link}>
            {footerLinks.map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className={styles.separator}></span>}
                <Link href={link.href} className={link.primary ? `${styles.colorPrimary} ${styles.textBold}` : ''}>
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.info}>
            <p>{hospital.name.full}</p>
            <address>
              주소: (우) {hospital.address.zipCode}. {hospital.address.full}
            </address>
            <div className='flex'>
              <span>
                대표전화 : {hospital.contact.phone} / FAX : {hospital.contact.fax}
              </span>
              <span>진료예약 : {hospital.contact.reservation}</span>
            </div>
          </div>
          <div className={styles.mark}>
            <img src='/images/img-footermark.png' alt='인증마크' />
          </div>
        </div>
        <p className={styles.copy}>
          ⓒ {currentYear} {hospital.copyright}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
