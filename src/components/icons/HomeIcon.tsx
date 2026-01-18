import React from 'react'

export interface HomeIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const HomeIcon: React.FC<HomeIconProps> = ({
  width = 20,
  height = 20,
  className = '',
  fill = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M8 18V12H12V18H17V10H20L10 1L0 10H3V18H8Z' fill={fill} />
    </svg>
  )
}
