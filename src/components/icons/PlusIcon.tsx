import React from 'react'

export interface PlusIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  width = 20,
  height = 20,
  className = '',
  stroke = 'currentColor',
  strokeWidth = 1
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M8 3.33334V12.6667M3.33333 8H12.6667'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
