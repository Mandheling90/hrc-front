import React from 'react'

export interface ContinuityIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const ContinuityIcon: React.FC<ContinuityIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  fill = '#9f1836'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M30 5L35.5 20.5L52 22L39.5 33L42 50L30 41.5L18 50L20.5 33L8 22L24.5 20.5L30 5Z' fill={fill} />
      <path d='M30 15L33.5 25.5L44 26.5L35.5 34L38 45L30 39L22 45L24.5 34L16 26.5L26.5 25.5L30 15Z' fill='#fff' />
    </svg>
  )
}
