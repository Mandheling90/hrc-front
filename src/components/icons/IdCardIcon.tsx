import React from 'react'

interface IdCardIconProps {
  width?: number
  height?: number
  fill?: string
  stroke?: string
  className?: string
}

export const IdCardIcon: React.FC<IdCardIconProps> = ({ width = 60, height = 60, stroke = '#9F1836', className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* 카드 외곽 */}
      <rect x='5' y='12' width='50' height='36' rx='4' stroke={stroke} strokeWidth='3' fill='none' />
      {/* 사진 영역 */}
      <rect x='12' y='20' width='14' height='18' rx='2' stroke={stroke} strokeWidth='2' fill='none' />
      {/* 텍스트 라인들 */}
      <line x1='32' y1='24' x2='48' y2='24' stroke={stroke} strokeWidth='2.5' strokeLinecap='round' />
      <line x1='32' y1='32' x2='45' y2='32' stroke={stroke} strokeWidth='2.5' strokeLinecap='round' />
      <line x1='32' y1='40' x2='42' y2='40' stroke={stroke} strokeWidth='2.5' strokeLinecap='round' />
    </svg>
  )
}
