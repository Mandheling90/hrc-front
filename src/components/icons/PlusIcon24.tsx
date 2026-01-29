import React from 'react'

export interface PlusIcon24Props {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const PlusIcon24: React.FC<PlusIcon24Props> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = 'black',
  strokeWidth = 2
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M12 2V12.5M12 23V12.5M12 12.5H22M12 12.5H2'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
