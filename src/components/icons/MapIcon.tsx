import React from 'react'

export interface MapIconProps {
  width?: number | string
  height?: number | string
  fill?: string
  className?: string
}

export const MapIcon: React.FC<MapIconProps> = ({ width = 24, height = 24, fill = 'black', className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M12 1C7.03768 1 3.00009 4.9479 3.00009 9.7945C2.96747 16.884 11.658 22.7624 12 23C12 23 21.0325 16.884 20.9999 9.8C20.9999 4.9479 16.9623 1 12 1ZM12 14.2C9.51378 14.2 7.50005 12.231 7.50005 9.8C7.50005 7.369 9.51378 5.4 12 5.4C14.4862 5.4 16.5 7.369 16.5 9.8C16.5 12.231 14.4862 14.2 12 14.2Z'
        fill={fill}
      />
    </svg>
  )
}
