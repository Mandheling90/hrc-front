import React from 'react'

export interface ReferralIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const ReferralIcon: React.FC<ReferralIconProps> = ({
  width = 40,
  height = 40,
  className = '',
  fill = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 10H32C33.1046 10 34 10.8954 34 12V28C34 29.1046 33.1046 30 32 30H8C6.89543 30 6 29.1046 6 28V12C6 10.8954 6.89543 10 8 10Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path d="M10 16H30" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20H24" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M18 26L22 22L26 26"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
