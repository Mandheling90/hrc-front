import React from 'react'

export interface HandshakeIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const HandshakeIcon: React.FC<HandshakeIconProps> = ({
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
        d='M20 25L15 30L20 35M40 25L45 30L40 35'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 25C20 25 22.5 22.5 25 25C27.5 27.5 30 25 30 25M30 25C30 25 32.5 22.5 35 25C37.5 27.5 40 25 40 25'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 35C20 35 22.5 37.5 25 35C27.5 32.5 30 35 30 35M30 35C30 35 32.5 37.5 35 35C37.5 32.5 40 35 40 35'
        stroke={stroke}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M25 20L30 25L25 30M35 20L30 25L35 30'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
