import React from 'react'

export interface SystemIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const SystemIcon: React.FC<SystemIconProps> = ({
  width = 48,
  height = 48,
  className = '',
  fill = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="6" y="8" width="36" height="28" rx="2" stroke={fill} strokeWidth="2" />
      <path d="M6 16H42" stroke={fill} strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill={fill} />
      <circle cx="18" cy="12" r="1.5" fill={fill} />
      <circle cx="24" cy="12" r="1.5" fill={fill} />
      <path
        d="M18 24C18 26.2091 19.7909 28 22 28C24.2091 28 26 26.2091 26 24C26 21.7909 24.2091 20 22 20C19.7909 20 18 21.7909 18 24Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path d="M14 32L18 28L22 32L26 28L30 32" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
