import React from 'react'

export interface DoctorInfoIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
  strokeWidth?: number
}

export const DoctorInfoIcon: React.FC<DoctorInfoIconProps> = ({
  width = 48,
  height = 48,
  className = '',
  stroke = 'currentColor',
  strokeWidth = 3
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M40 44V38C40 32.344 40 29.514 38.242 27.758C36.486 26 33.656 26 28 26L24 30L20 26C14.344 26 11.514 26 9.758 27.758C8 29.514 8 32.344 8 38V44M32 26V37'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17 26V34M17 34C18.0609 34 19.0783 34.4214 19.8284 35.1716C20.5786 35.9217 21 36.9391 21 38V40M17 34C15.9391 34 14.9217 34.4214 14.1716 35.1716C13.4214 35.9217 13 36.9391 13 38V40M31 13V11C31 10.0807 30.8189 9.17049 30.4672 8.32122C30.1154 7.47194 29.5998 6.70026 28.9497 6.05025C28.2997 5.40024 27.5281 4.88463 26.6788 4.53284C25.8295 4.18106 24.9193 4 24 4C23.0807 4 22.1705 4.18106 21.3212 4.53284C20.4719 4.88463 19.7003 5.40024 19.0503 6.05025C18.4002 6.70026 17.8846 7.47194 17.5328 8.32122C17.1811 9.17049 17 10.0807 17 11V13C17 13.9193 17.1811 14.8295 17.5328 15.6788C17.8846 16.5281 18.4002 17.2997 19.0503 17.9497C19.7003 18.5998 20.4719 19.1154 21.3212 19.4672C22.1705 19.8189 23.0807 20 24 20C24.9193 20 25.8295 19.8189 26.6788 19.4672C27.5281 19.1154 28.2997 18.5998 28.9497 17.9497C29.5998 17.2997 30.1154 16.5281 30.4672 15.6788C30.8189 14.8295 31 13.9193 31 13Z'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M33.5 38.5C33.5 38.8978 33.342 39.2794 33.0607 39.5607C32.7794 39.842 32.3978 40 32 40C31.6022 40 31.2206 39.842 30.9393 39.5607C30.658 39.2794 30.5 38.8978 30.5 38.5C30.5 38.1022 30.658 37.7206 30.9393 37.4393C31.2206 37.158 31.6022 37 32 37C32.3978 37 32.7794 37.158 33.0607 37.4393C33.342 37.7206 33.5 38.1022 33.5 38.5Z'
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
