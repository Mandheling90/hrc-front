import React from 'react'

export interface ShieldIconProps {
  width?: number | string
  height?: number | string
  className?: string
}

export const ShieldIcon: React.FC<ShieldIconProps> = ({ width = 110, height = 110, className = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 110 110'
      fill='none'
      className={className}
    >
      <path
        d='M48.0254 71.5006L77.4999 44.0006L69.4999 34.5006L48.0254 54.5006L37 45.5006L28 54.5006L48.0254 71.5006Z'
        stroke='#816331'
        strokeWidth='4.58333'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.7087 107.709L91.667 89.3756L103.125 18.3339L52.7087 2.29224L2.29199 18.3339L13.7503 89.3756L52.7087 107.709Z'
        stroke='#816331'
        strokeWidth='4.58333'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M52.7083 96.2506L82.5 82.5006L91.6667 25.209L52.7083 11.459L13.75 25.209L22.9167 82.5006L52.7083 96.2506Z'
        stroke='#816331'
        strokeWidth='4.58333'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
