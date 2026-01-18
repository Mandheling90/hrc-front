'use client'

import React from 'react'
import { ServiceCard, ServiceCardProps } from '@/components/molecules/ServiceCard/ServiceCard'
import { ServiceTitleIcon } from '@/components/icons/ServiceTitleIcon'
import styles from './ServiceSection.module.scss'

export interface ServiceItem extends Omit<ServiceCardProps, 'className'> {
  id: string
}

export interface ServiceSectionProps {
  title: string
  services: ServiceItem[]
  className?: string
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ title, services, className = '' }) => {
  const isThreeItems = services.length === 3

  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <ServiceTitleIcon className={styles.titleIcon} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={`${styles.grid} ${isThreeItems ? styles.gridThreeItems : ''}`}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            href={service.href}
            onClick={service.onClick}
            className={isThreeItems && index === 0 ? styles.firstItemWide : ''}
          />
        ))}
      </div>
    </section>
  )
}
