import React from 'react'

export interface LinkIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const LinkIcon: React.FC<LinkIconProps> = ({
  width = 20,
  height = 20,
  className = '',
  fill = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 13C10 13.5523 10.4477 14 11 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2H8C6.89543 2 6 2.89543 6 4V9C6 9.55228 6.44772 10 7 10C7.55228 10 8 9.55228 8 9V4H16V12H11C10.4477 12 10 12.4477 10 13Z"
        fill={fill}
      />
      <path
        d="M2 6C2 5.44772 2.44772 5 3 5H7C7.55228 5 8 5.44772 8 6C8 6.55228 7.55228 7 7 7H4V16H13V13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13V16C15 17.1046 14.1046 18 13 18H4C2.89543 18 2 17.1046 2 16V6Z"
        fill={fill}
      />
    </svg>
  )
}
