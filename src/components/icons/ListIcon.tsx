import React from 'react'

interface ListIconProps {
  width?: number
  height?: number
  color?: string
  className?: string
}

export const ListIcon: React.FC<ListIconProps> = ({ width = 24, height = 24, color = 'currentColor', className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M3 5H21M3 12H21M3 19H21' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
