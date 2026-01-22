import React from 'react'

export interface DocumentIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({
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
      <path
        d='M15 7.5H30L45 22.5V52.5C45 54.1569 43.6569 55.5 42 55.5H18C16.3431 55.5 15 54.1569 15 52.5V7.5Z'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M30 7.5V22.5H45'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22.5 37.5H37.5M22.5 45H37.5'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
