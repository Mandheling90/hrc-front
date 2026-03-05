import React from 'react'

export interface PasswordIconProps {
  width?: number | string
  height?: number | string
  className?: string
}

export const PasswordIcon: React.FC<PasswordIconProps> = ({ width = 60, height = 60, className = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      className={className}
    >
      <rect
        x='5'
        y='22.5'
        width='50'
        height='32.5'
        rx='5'
        stroke='#9F1836'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.5 22.5V15C17.5 11.6848 18.817 8.50537 21.1612 6.16117C23.5054 3.81696 26.6848 2.5 30 2.5C33.3152 2.5 36.4946 3.81696 38.8388 6.16117C41.183 8.50537 42.5 11.6848 42.5 15V22.5'
        stroke='#9F1836'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='22.5' cy='38.75' r='3' fill='#9F1836' />
      <circle cx='30' cy='38.75' r='3' fill='#9F1836' />
      <circle cx='37.5' cy='38.75' r='3' fill='#9F1836' />
    </svg>
  )
}
