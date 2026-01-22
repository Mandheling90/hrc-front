import React from 'react'

export interface ApprovalIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const ApprovalIcon: React.FC<ApprovalIconProps> = ({
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
        d='M30 15C22.268 15 16 21.268 16 29C16 36.732 22.268 43 30 43C37.732 43 44 36.732 44 29C44 21.268 37.732 15 30 15Z'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M30 20V29L35 34'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 15L22 17L24 15M36 15L38 17L40 15'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
