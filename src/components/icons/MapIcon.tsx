import React from 'react'

export interface MapIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
}

export const MapIcon: React.FC<MapIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  fill = 'none',
  stroke = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M8 2V18' stroke={stroke} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16 6V22' stroke={stroke} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
