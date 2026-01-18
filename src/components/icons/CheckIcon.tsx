import React from 'react'

export interface CheckIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export const CheckIcon: React.FC<CheckIconProps> = (
  {
    // width = 24,
    // height = 24,
    // className = '',
    // fill = 'none',
    // stroke = '#816331',
    // strokeWidth = 3
  }
) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='72' height='51' viewBox='0 0 72 51' fill='none'>
      <path
        d='M4 25.3333L25.3333 46.6667L68 4'
        stroke='#816331'
        stroke-width='8'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
