import React from 'react'

export interface ReviewIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const ReviewIcon: React.FC<ReviewIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#9F1836'
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
        d='M10 45L10.0063 35.0537C10.0063 34.7222 10.1379 34.4043 10.3724 34.1699C10.6068 33.9354 10.9247 33.8037 11.2563 33.8037H23.7587C24.9112 33.8037 24.905 32.7812 24.905 30.3487C24.905 27.9162 18.7775 25.8675 18.7775 17.3162C18.7775 8.765 25.125 6.25 30.4 6.25C35.675 6.25 41.4213 8.765 41.4213 17.3162C41.4213 25.8675 35.3262 27.2275 35.3262 30.3487C35.3262 33.47 35.3263 33.8037 36.3013 33.8037H48.7512C49.0828 33.8037 49.4007 33.9354 49.6351 34.1699C49.8696 34.4043 50.0012 34.7222 50.0012 35.0537V45H10Z'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinejoin='round'
      />
      <path
        d='M10 52.5H50'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
