import React from 'react'

export interface ChevronUpIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  fill?: string
}

export const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = '#636363',
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
      <path d='M20 16L12 8L4 16' stroke={stroke} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
