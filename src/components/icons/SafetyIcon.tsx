import React from 'react'

export interface SafetyIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const SafetyIcon: React.FC<SafetyIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  fill = '#9f1836'
}) => {
  return (
    <svg width={width} height={height} viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM30 50C18.5 50 10 41.5 10 30C10 18.5 18.5 10 30 10C41.5 10 50 18.5 50 30C50 41.5 41.5 50 30 50Z'
        fill={fill}
      />
      <path
        d='M30 20C25.6 20 22 23.6 22 28C22 32.4 25.6 36 30 36C34.4 36 38 32.4 38 28C38 23.6 34.4 20 30 20Z'
        fill={fill}
      />
      <path
        d='M30 40C28.3 40 27 41.3 27 43V45C27 46.7 28.3 48 30 48C31.7 48 33 46.7 33 45V43C33 41.3 31.7 40 30 40Z'
        fill={fill}
      />
    </svg>
  )
}
