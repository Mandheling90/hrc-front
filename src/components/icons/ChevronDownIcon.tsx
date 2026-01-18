import React from 'react'

export interface ChevronDownIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  width = 16,
  height = 16,
  className = '',
  fill = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
