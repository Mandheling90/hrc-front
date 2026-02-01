import React from 'react'

export interface BridgeIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export const BridgeIcon: React.FC<BridgeIconProps> = ({
  width = 56,
  height = 56,
  className = '',
  fill = 'black',
  stroke = 'black',
  strokeWidth = 4.66667
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 56 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M4.66797 22.1667V38.5H14.0013C14.0013 30.7685 20.2698 24.5 28.0013 24.5C35.7328 24.5 42.0013 30.7685 42.0013 38.5H51.3346V22.1667C51.3346 22.1667 37.2938 17.5 28.0013 17.5C18.7088 17.5 4.66797 22.1667 4.66797 22.1667Z'
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
