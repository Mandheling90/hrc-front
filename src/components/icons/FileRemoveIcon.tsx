import React from 'react'

export interface FileRemoveIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number
}

export const FileRemoveIcon: React.FC<FileRemoveIconProps> = ({
  width = 22,
  height = 22,
  className = '',
  stroke = '#636363',
  strokeWidth = 1.33333
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M5 5L17 17M5 17L17 5'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
