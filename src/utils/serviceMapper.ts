import { ServiceItem, BreadcrumbItemConfig } from '@/types/hospital'
import { getServiceIcon, getNavIcon, iconRegistry } from '@/config/iconRegistry'
import { CardLayoutType } from '@/components/molecules/ServiceCard'
import React from 'react'

// ServiceSection에서 사용하는 매핑된 서비스 아이템 타입
export interface MappedServiceItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string | string[]
  href?: string
  tabletSpan?: number
  mobileSpan?: number
  mobileTitleBelowIcon?: boolean
  layoutType?: CardLayoutType
}

// Breadcrumbs에서 사용하는 매핑된 아이템 타입
export interface MappedBreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  iconAfter?: boolean
}

/**
 * ServiceItem 배열을 ServiceSection 컴포넌트에서 사용하는 형식으로 변환
 * @param items - 원본 ServiceItem 배열
 * @param customIconMap - 커스텀 아이콘 맵 (선택적, 기본값은 iconRegistry 사용)
 * @returns 매핑된 서비스 아이템 배열
 */
export function mapServiceItems(
  items: ServiceItem[] | undefined,
  customIconMap?: Record<string, React.ReactNode>
): MappedServiceItem[] {
  if (!items) return []

  const iconMap = customIconMap || iconRegistry

  return items.map(item => ({
    id: item.id,
    icon: iconMap[item.icon] || getServiceIcon(item.icon),
    title: item.title,
    description: item.description,
    href: item.href,
    tabletSpan: item.tabletSpan,
    mobileSpan: item.mobileSpan,
    mobileTitleBelowIcon: item.mobileTitleBelowIcon,
    layoutType: item.layoutType as CardLayoutType | undefined
  }))
}

/**
 * BreadcrumbItemConfig 배열을 Breadcrumbs 컴포넌트에서 사용하는 형식으로 변환
 * @param items - 원본 BreadcrumbItemConfig 배열
 * @param customIconMap - 커스텀 아이콘 맵 (선택적, 기본값은 iconRegistry 사용)
 * @returns 매핑된 breadcrumb 아이템 배열
 */
export function mapBreadcrumbItems(
  items: BreadcrumbItemConfig[] | undefined,
  customIconMap?: Record<string, React.ReactNode>
): MappedBreadcrumbItem[] {
  if (!items) return []

  const iconMap = customIconMap || iconRegistry

  return items.map(item => ({
    label: item.label,
    href: item.href,
    icon: item.icon ? iconMap[item.icon] || getNavIcon(item.icon) : undefined,
    iconAfter: item.iconAfter
  }))
}
