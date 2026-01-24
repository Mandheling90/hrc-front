import React from 'react'

export interface SaveIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number | string
}

export const SaveIcon: React.FC<SaveIconProps> = ({
  width = 20,
  height = 20,
  className = '',
  stroke = 'currentColor',
  strokeWidth = 1
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M5.33333 7.27647H3.33333C2.97971 7.27647 2.64057 7.41694 2.39052 7.66699C2.14048 7.91704 2 8.25618 2 8.6098V12.0573C2 12.4109 2.14048 12.7501 2.39052 13.0001C2.64057 13.2502 2.97971 13.3906 3.33333 13.3906H12.6667C13.0203 13.3906 13.3594 13.2502 13.6095 13.0001C13.8595 12.7501 14 12.4109 14 12.0573V8.6098C14 8.25618 13.8595 7.91704 13.6095 7.66699C13.3594 7.41694 13.0203 7.27647 12.6667 7.27647H10.6667'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 4.66634C10 4.66634 8.78105 3.44739 8 2.66634M8 2.66634C7.21895 3.44739 6 4.66634 6 4.66634M8 2.66634C8 5.26984 8 9.33301 8 9.33301'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
