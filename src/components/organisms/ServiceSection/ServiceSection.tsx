'use client'

import React from 'react'
import { ServiceCard, ServiceCardProps } from '@/components/molecules/ServiceCard/ServiceCard'
import styles from './ServiceSection.module.scss'

export interface ServiceItem extends Omit<ServiceCardProps, 'className'> {
  id: string
}

export interface ServiceSectionProps {
  title: string
  services: ServiceItem[]
  className?: string
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  services,
  className = ''
}) => {
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleIcon}></div>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            href={service.href}
            onClick={service.onClick}
          />
        ))}
      </div>
    </section>
  )
}
