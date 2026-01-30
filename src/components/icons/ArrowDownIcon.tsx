import React from 'react'

interface ArrowDownIconProps {
  width?: number
  height?: number
  stroke?: string
  className?: string
}

export const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({
  width = 60,
  height = 24,
  stroke = '#00A23F',
  className
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25 10L30 15L35 10"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
