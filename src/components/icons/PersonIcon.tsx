import React from 'react'

interface PersonIconProps {
  width?: number
  height?: number
  fill?: string
  stroke?: string
  className?: string
}

export const PersonIcon: React.FC<PersonIconProps> = ({ width = 60, height = 60, stroke = '#9F1836', className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* 머리 */}
      <circle cx='30' cy='20' r='12' stroke={stroke} strokeWidth='3.5' fill='none' />
      {/* 몸통 */}
      <path
        d='M10 55C10 42 18 35 30 35C42 35 50 42 50 55'
        stroke={stroke}
        strokeWidth='3.5'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  )
}
