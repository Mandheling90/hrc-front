import React from 'react'

export interface PhoneIconProps {
  width?: number | string
  height?: number | string
  className?: string
}

export const PhoneIcon: React.FC<PhoneIconProps> = ({
  width = 60,
  height = 60,
  className = ''
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
        d='M28.125 46.8727H32.4107M45 28.125V50.6227C45 51.6173 44.5485 52.5711 43.7447 53.2744C42.941 53.9777 41.8509 54.3727 40.7143 54.3727H19.2857C18.1491 54.3727 17.059 53.9777 16.2553 53.2744C15.4515 52.5711 15 51.6173 15 50.6227V9.375C15 8.38044 15.4515 7.42661 16.2553 6.72335C17.059 6.02009 18.1491 5.625 19.2857 5.625H33.75'
        stroke='#9F1836'
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.5 9.43294L44.123 7.5L50.7393 9.43294V13.3967C50.7391 15.428 50.0997 17.4078 48.9119 19.0556C47.724 20.7034 46.0479 21.9358 44.1208 22.5781C42.193 21.936 40.5161 20.7036 39.3278 19.0553C38.1395 17.4071 37.5 15.4267 37.5 13.3948V9.43294Z'
        stroke='#9F1836'
        strokeWidth='2.5'
        strokeLinejoin='round'
      />
      <path
        d='M40.8086 14.4877L43.3829 17.062L47.796 12.6489'
        stroke='#9F1836'
        strokeWidth='1.875'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
