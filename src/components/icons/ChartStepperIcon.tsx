import React from 'react'

export interface ChartStepperIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const ChartStepperIcon: React.FC<ChartStepperIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#9f1836'
}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none'>
      <path
        d='M26.25 41.25V26.25H41.25V11.25H56.25V7.5H37.5V22.5H22.5V37.5H7.5V3.75H3.75V52.5C3.75149 53.4941 4.14705 54.4471 4.84999 55.15C5.55293 55.8529 6.50589 56.2485 7.5 56.25H56.25V52.5H7.5V41.25H26.25Z'
        fill={stroke}
      />
    </svg>
  )
}
