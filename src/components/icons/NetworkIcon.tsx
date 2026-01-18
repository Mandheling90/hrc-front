import React from 'react'

export interface NetworkIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const NetworkIcon: React.FC<NetworkIconProps> = ({
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
      <circle cx="20" cy="20" r="6" stroke={fill} strokeWidth="2" />
      <circle cx="10" cy="10" r="4" stroke={fill} strokeWidth="2" />
      <circle cx="30" cy="10" r="4" stroke={fill} strokeWidth="2" />
      <circle cx="10" cy="30" r="4" stroke={fill} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" stroke={fill} strokeWidth="2" />
      <path d="M16 16L14 14" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 16L26 14" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 24L14 26" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 24L26 26" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 14V16" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24V26" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 20H16" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20H26" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18L22 22" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 18L18 22" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
