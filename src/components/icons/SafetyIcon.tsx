import React from 'react'

export interface SafetyIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const SafetyIcon: React.FC<SafetyIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#9f1836'
}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none'>
      <path
        d='M22.5 27.4998H37.5M30 34.9998V19.9998M10 28.1298C10 47.3473 27.295 54.0973 29.7175 54.9498C29.9058 55.0165 30.0942 55.0165 30.2825 54.9498C32.71 54.1248 50 47.5448 50 28.1323V10.7598C50.0005 10.5364 49.9262 10.3193 49.7889 10.143C49.6516 9.96674 49.4593 9.84153 49.2425 9.78735L30.2425 5.02985C30.0833 4.99005 29.9167 4.99005 29.7575 5.02985L10.7575 9.78735C10.5407 9.84153 10.3484 9.96674 10.2111 10.143C10.0738 10.3193 9.99948 10.5364 10 10.7598V28.1298Z'
        stroke={stroke}
        strokeWidth='3.75'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
