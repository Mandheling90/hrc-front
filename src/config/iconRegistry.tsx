import React from 'react'

// Service Icons
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { PatientIcon } from '@/components/icons/PatientIcon'
import { ConsultingIcon } from '@/components/icons/ConsultingIcon'
import { NetworkIcon } from '@/components/icons/NetworkIcon'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'
import { DocumentReferralIcon } from '@/components/icons/DocumentReferralIcon'
import { HospitalPortalIcon } from '@/components/icons/HospitalPortalIcon'
import { SNSTalkIcon } from '@/components/icons/SNSTalkIcon'
import { ContinuityIcon } from '@/components/icons/ContinuityIcon'
import { SafetyIcon } from '@/components/icons/SafetyIcon'
import { QualityIcon } from '@/components/icons/QualityIcon'
import { ChartStepperIcon } from '@/components/icons/ChartStepperIcon'
import { DoctorIcon } from '@/components/icons/DoctorIcon'

// Navigation Icons
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'

// 기본 색상
const PRIMARY_COLOR = '#720021'
const SECONDARY_COLOR = '#9f1836'

// 서비스 아이콘 레지스트리 (60x60 크기)
export const serviceIconRegistry: Record<string, React.ReactNode> = {
  // Referral page icons
  ReferralIcon: <ReferralIcon width={60} height={60} fill={PRIMARY_COLOR} />,
  PatientIcon: <PatientIcon width={49} height={54} fill={PRIMARY_COLOR} stroke={PRIMARY_COLOR} />,
  ConsultingIcon: <ConsultingIcon width={60} height={60} fill={PRIMARY_COLOR} stroke={PRIMARY_COLOR} />,
  NetworkIcon: <NetworkIcon width={60} height={60} fill={PRIMARY_COLOR} stroke={PRIMARY_COLOR} />,

  // Request page icons
  PhoneRequestIcon: <PhoneRequestIcon width={60} height={60} stroke={PRIMARY_COLOR} />,
  DocumentReferralIcon: <DocumentReferralIcon width={60} height={60} fill={PRIMARY_COLOR} stroke={PRIMARY_COLOR} />,
  HospitalPortalIcon: <HospitalPortalIcon width={60} height={60} stroke={PRIMARY_COLOR} />,
  SNSTalkIcon: <SNSTalkIcon width={60} height={60} fill={PRIMARY_COLOR} stroke={PRIMARY_COLOR} />,

  // Exchange page icons
  ContinuityIcon: <ContinuityIcon width={60} height={60} stroke={SECONDARY_COLOR} />,
  SafetyIcon: <SafetyIcon width={60} height={60} stroke={SECONDARY_COLOR} />,
  QualityIcon: <QualityIcon width={60} height={60} stroke={SECONDARY_COLOR} />,

  // Hira page icons (안산병원 등)
  ChartStepperIcon: <ChartStepperIcon width={60} height={60} stroke={SECONDARY_COLOR} />,
  DoctorIcon: <DoctorIcon width={60} height={60} stroke={SECONDARY_COLOR} />
}

// 네비게이션 아이콘 레지스트리 (Breadcrumb 등에서 사용)
export const navIconRegistry: Record<string, React.ReactNode> = {
  HomeIcon: <HomeIcon />,
  ChevronDownIcon: <ChevronDownIcon width={12} height={12} />
}

// 통합 아이콘 레지스트리
export const iconRegistry: Record<string, React.ReactNode> = {
  ...serviceIconRegistry,
  ...navIconRegistry
}

// 기본 fallback 아이콘
export const defaultServiceIcon = <ReferralIcon width={60} height={60} fill={PRIMARY_COLOR} />

// 아이콘 가져오기 헬퍼 함수
export function getIcon(iconName: string, fallback: React.ReactNode = null): React.ReactNode {
  return iconRegistry[iconName] || fallback
}

export function getServiceIcon(iconName: string): React.ReactNode {
  return serviceIconRegistry[iconName] || defaultServiceIcon
}

export function getNavIcon(iconName: string): React.ReactNode | undefined {
  return navIconRegistry[iconName]
}
