import React from 'react'

export interface ArrowRightIconProps {
  width?: number | string
  height?: number | string
  stroke?: string
  strokeWidth?: number | string
  className?: string
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  width = 24,
  height = 60,
  stroke = '#00A23F',
  strokeWidth = 2,
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M10 35L15 30L10 25'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
