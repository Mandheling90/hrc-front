import React from 'react'

export interface ConsultBadgeIconProps {
  width?: number | string
  height?: number | string
  className?: string
}

export const ConsultBadgeIcon: React.FC<ConsultBadgeIconProps> = ({ width = 16, height = 16, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='8' cy='8' r='8' fill='#C09C63' />
      <path
        d='M8.22772 13C4.9802 13 3 11.057 3 8.02674C3 5.03209 5.0198 3 8.08911 3C10.7228 3 13 4.4795 13 7.88414V8.59715H5.49505C5.52475 10.246 6.60396 11.2175 8.24752 11.2175C9.35644 11.2175 10.1089 10.7897 10.4257 10.2193H12.901C12.4455 11.8948 10.7228 13 8.22772 13ZM5.51485 7.04635H10.5842C10.5644 5.72727 9.59406 4.76471 8.12871 4.76471C6.60396 4.76471 5.59406 5.80749 5.51485 7.04635Z'
        fill='white'
      />
    </svg>
  )
}
