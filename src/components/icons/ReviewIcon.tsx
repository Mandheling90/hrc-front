import React from 'react'

export interface ReviewIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const ReviewIcon: React.FC<ReviewIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#9F1836'
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      className={className}
    >
      <circle cx='30' cy='30' r='20' stroke={stroke} strokeWidth='3' />
      <path
        d='M30 20V30L35 35'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='20' cy='20' r='3' fill={stroke} />
      <circle cx='40' cy='20' r='3' fill={stroke} />
    </svg>
  )
}
