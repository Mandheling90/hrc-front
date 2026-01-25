import React from 'react'

export interface CloseIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = '#000',
  strokeWidth = 1.5
}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 35 35' fill='none'>
      <path
        d='M17.4167 34.0833C26.6217 34.0833 34.0833 26.6217 34.0833 17.4167C34.0833 8.21167 26.6217 0.75 17.4167 0.75C8.21167 0.75 0.75 8.21167 0.75 17.4167C0.75 26.6217 8.21167 34.0833 17.4167 34.0833Z'
        stroke='var(--gray-11)'
        stroke-width='1.5'
        stroke-linejoin='round'
      />
      <path
        d='M22.131 12.7021L12.7026 22.1305M12.7026 12.7021L22.131 22.1305'
        stroke='var(--gray-11)'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
