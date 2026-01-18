import React from 'react'

export interface ServiceTitleIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
}

export const ServiceTitleIcon: React.FC<ServiceTitleIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  fill = '#9F1836',
  stroke = '#9F1836'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect x='3' y='3' width='19' height='19' rx='3' stroke={stroke} strokeWidth='2' strokeLinejoin='round' />
      <path d='M21 21H4V20.8976L20.8976 4H21V21Z' fill={fill} />
    </svg>
  )
}
