import React from 'react'

export interface EmergencyNightIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const EmergencyNightIcon: React.FC<EmergencyNightIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#720021',
  strokeWidth = 3.75
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      className={className}
    >
      <path
        d='M13 52H16.9667M47 52H43.0333M43.0333 52L36.657 30.433C36.4057 29.5832 35.6252 29 34.7391 29H25.2609C24.3748 29 23.5943 29.5832 23.343 30.433L16.9667 52M43.0333 52H16.9667'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <path
        d='M3 36H12.766M9.31915 17.3321L16.7872 24.3333M44.9362 24.3333L51.2553 17.3321M47.234 36H57M30 19.0833V8'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
    </svg>
  )
}
