import React from 'react'

export interface ArrowRightLargeIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number
}

export const ArrowRightLargeIcon: React.FC<ArrowRightLargeIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = 'currentColor',
  strokeWidth = 2
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
      <path
        d='M7 22L18 12L7 2'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
