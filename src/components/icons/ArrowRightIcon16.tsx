import React from 'react'

export interface ArrowRightIcon16Props {
  width?: number | string
  height?: number | string
  className?: string
}

export const ArrowRightIcon16: React.FC<ArrowRightIcon16Props> = ({ width = 16, height = 16, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M6 12L10 8L6 4' stroke='#000000' strokeWidth='1.33' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
