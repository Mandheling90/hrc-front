import React from 'react'

export interface DownloadIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
  width = 16,
  height = 16,
  className = '',
  stroke = '#9F1836'
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      className={className}
    >
      <path
        d='M8 12V2M8 12L4 8M8 12L12 8'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
