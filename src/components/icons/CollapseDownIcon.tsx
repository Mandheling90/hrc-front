import React from 'react'

interface CollapseDownIconProps {
  width?: number
  height?: number
  color?: string
  className?: string
}

export const CollapseDownIcon: React.FC<CollapseDownIconProps> = ({
  width = 7,
  height = 3,
  color = 'currentColor',
  className
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 7 3'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M3.3306 2.88281L-0.000262485 -0.00180283L6.66147 -0.00180225L3.3306 2.88281Z' fill={color} />
    </svg>
  )
}
