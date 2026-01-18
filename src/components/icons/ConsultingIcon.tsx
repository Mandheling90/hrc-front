import React from 'react'

export interface ConsultingIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const ConsultingIcon: React.FC<ConsultingIconProps> = ({
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
      <rect x="6" y="8" width="28" height="20" rx="2" stroke={fill} strokeWidth="2" />
      <path d="M6 14H34" stroke={fill} strokeWidth="2" />
      <circle cx="12" cy="11" r="1.5" fill={fill} />
      <circle cx="16" cy="11" r="1.5" fill={fill} />
      <path
        d="M12 20C12 21.6569 13.3431 23 15 23C16.6569 23 18 21.6569 18 20C18 18.3431 16.6569 17 15 17C13.3431 17 12 18.3431 12 20Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M22 20L26 24L30 20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 18V26"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
