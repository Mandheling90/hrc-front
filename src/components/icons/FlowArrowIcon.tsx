import React from 'react'

export interface FlowArrowIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const FlowArrowIcon: React.FC<FlowArrowIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = '#9F1836',
  strokeWidth = 3
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M9 18L15 12L9 6'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
