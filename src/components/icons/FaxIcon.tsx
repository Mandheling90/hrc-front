import React from 'react'

export interface FaxIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const FaxIcon: React.FC<FaxIconProps> = ({
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
        d='M15 15H45C46.6569 15 48 16.3431 48 18V42C48 43.6569 46.6569 45 45 45H15C13.3431 45 12 43.6569 12 42V18C12 16.3431 13.3431 15 15 15Z'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 22H42M18 28H42M18 34H30'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36 38C37.1046 38 38 37.1046 38 36C38 34.8954 37.1046 34 36 34C34.8954 34 34 34.8954 34 36C34 37.1046 34.8954 38 36 38Z'
        fill={stroke}
      />
    </svg>
  )
}
