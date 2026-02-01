import React from 'react'

interface CollapseUpIconProps {
  width?: number
  height?: number
  color?: string
  className?: string
}

export const CollapseUpIcon: React.FC<CollapseUpIconProps> = ({
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
      <path d='M3.3306 3.36241e-07L-0.000262485 2.88462L6.66147 2.88461L3.3306 3.36241e-07Z' fill={color} />
    </svg>
  )
}
