import React from 'react'

export interface SNSTalkIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
}

export const SNSTalkIcon: React.FC<SNSTalkIconProps> = ({}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72' fill='none'>
      <path
        d='M36 58.5C53.397 58.5 67.5 47.082 67.5 33C67.5 18.918 53.397 7.5 36 7.5C18.603 7.5 4.5 18.918 4.5 33C4.5 41.919 10.155 49.77 18.72 54.324L16.5 67.5L31.5 58.242C32.97 58.414 34.47 58.5 36 58.5Z'
        stroke='#720021'
        stroke-width='3.5'
        stroke-linejoin='round'
      />
      <path
        d='M13.5 27H22.5M18 40.5V27M24 40.5L29.25 27L34.5 40.5M25.5 37.5H33M39 27V40.5H45M49.5 27V40.5M49.5 36L58.5 27M52.5 33L58.5 40.5'
        stroke='#720021'
        stroke-width='3.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
