import React from 'react'

export interface QualityIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const QualityIcon: React.FC<QualityIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  fill = '#9f1836'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M30 5L35 20L50 22.5L37.5 33L40 50L30 42L20 50L22.5 33L10 22.5L25 20L30 5Z' fill={fill} />
      <path d='M30 12L33.5 22L43 23.5L34.5 31L36.5 43L30 37.5L23.5 43L25.5 31L17 23.5L26.5 22L30 12Z' fill='#fff' />
      <path d='M30 25V35M25 30H35' stroke={fill} strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
}
