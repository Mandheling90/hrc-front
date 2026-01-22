import React from 'react'

export interface CertificateIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const CertificateIcon: React.FC<CertificateIconProps> = ({
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
        d='M15 12H45C46.6569 12 48 13.3431 48 15V48C48 49.6569 46.6569 51 45 51H15C13.3431 51 12 49.6569 12 48V15C12 13.3431 13.3431 12 15 12Z'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 22H42M18 30H35M18 38H30'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M40 35L42 37L46 33'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
