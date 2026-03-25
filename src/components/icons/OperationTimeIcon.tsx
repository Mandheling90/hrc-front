import React from 'react'

export interface OperationTimeIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const OperationTimeIcon: React.FC<OperationTimeIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#9f1836',
  strokeWidth = 3.75
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
        d='M30 55C43.8075 55 55 43.8075 55 30C55 16.1925 43.8075 5 30 5C16.1925 5 5 16.1925 5 30C5 43.8075 16.1925 55 30 55Z'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
      <path
        d='M30.0103 15V30.0125L40.609 40.6125'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
