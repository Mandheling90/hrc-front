import React from 'react'

export interface LoadIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const LoadIcon: React.FC<LoadIconProps> = ({
  width = 16,
  height = 16,
  className = '',
  stroke = 'currentColor',
  strokeWidth = 1.25
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
        d='M5.33333 4.66699H3.33333C2.97971 4.66699 2.64057 4.80747 2.39052 5.05752C2.14048 5.30756 2 5.6467 2 6.00033V12.0003C2 12.3539 2.14048 12.6931 2.39052 12.9431C2.64057 13.1932 2.97971 13.3337 3.33333 13.3337H12.6667C13.0203 13.3337 13.3594 13.1932 13.6095 12.9431C13.8595 12.6931 14 12.3539 14 12.0003V6.00033C14 5.6467 13.8595 5.30756 13.6095 5.05752C13.3594 4.80747 13.0203 4.66699 12.6667 4.66699H10.6667'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 7.33366C10 7.33366 8.78105 8.55261 8 9.33366M8 9.33366C7.21895 8.55261 6 7.33366 6 7.33366M8 9.33366C8 6.73016 8 2.66699 8 2.66699'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
