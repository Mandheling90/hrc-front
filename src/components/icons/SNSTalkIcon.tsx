import React from 'react'

export interface SNSTalkIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
}

export const SNSTalkIcon: React.FC<SNSTalkIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  fill = '#720021',
  stroke = '#720021'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* 말풍선 원형 배경 */}
      <circle cx='30' cy='30' r='20' fill={fill} />
      {/* TALK 텍스트 */}
      <text
        x='30'
        y='36'
        textAnchor='middle'
        fill='white'
        fontSize='12'
        fontWeight='bold'
        fontFamily='Arial, sans-serif'
        letterSpacing='1'
      >
        TALK
      </text>
    </svg>
  )
}