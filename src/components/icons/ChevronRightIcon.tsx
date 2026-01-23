import React from 'react'

export interface ChevronRightIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  fill?: string
}

export const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = 'currentColor',
  fill = 'none'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M9 18L15 12L9 6' stroke={stroke} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
