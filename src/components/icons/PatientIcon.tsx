import React from 'react'

export interface PatientIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const PatientIcon: React.FC<PatientIconProps> = ({
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
      <circle cx="20" cy="12" r="6" stroke={fill} strokeWidth="2" />
      <path
        d="M10 32C10 26.4772 14.4772 22 20 22C25.5228 22 30 26.4772 30 32"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18" r="3" fill={fill} />
      <path d="M6 24L10 20" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
