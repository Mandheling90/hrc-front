import React from 'react'

export interface ApprovalIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const ApprovalIcon: React.FC<ApprovalIconProps> = ({
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
        d='M42.5 22.5V20C42.5 12.93 42.5 9.3925 40.3025 7.1975C38.1075 5 34.57 5 27.5 5H20C12.93 5 9.3925 5 7.1975 7.1975C5 9.3925 5 12.93 5 20V40C5 47.07 5 50.6075 7.1975 52.8025C9.3925 55 12.93 55 20 55'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
      />
      <path
        d='M17.5 21.6675C17.5 21.6675 19.0625 21.6675 20.625 25C20.625 25 25.5875 16.6675 30 15'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 35H25M15 42.5H22.5'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
      />
      <path
        d='M35.0555 33.0398C35.4011 32.6942 35.8698 32.5 36.3586 32.5H42.3371C42.8252 32.5 43.2932 32.6936 43.6387 33.0382C43.9842 33.3829 44.1789 33.8506 44.18 34.3386V39.52H49.3529C49.8409 39.52 50.309 39.7136 50.6544 40.0582C50.9999 40.4029 51.1946 40.8706 51.1957 41.3586V47.3286C51.1957 47.8173 51.0016 48.2861 50.656 48.6317C50.3104 48.9773 49.8416 49.1714 49.3529 49.1714H44.18V54.3529C44.18 54.8416 43.9858 55.3104 43.6402 55.656C43.2946 56.0016 42.8259 56.1957 42.3371 56.1957H36.3586C35.3429 56.1957 34.5157 55.3686 34.5157 54.3529V49.18H29.3429C28.3271 49.18 27.5 48.3529 27.5 47.3371V41.3586C27.5 40.8698 27.6942 40.4011 28.0398 40.0555C28.3854 39.7099 28.8541 39.5157 29.3429 39.5157H34.5157V34.3429C34.5157 33.8541 34.7099 33.3854 35.0555 33.0398Z'
        stroke={stroke}
        strokeWidth='4.28571'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
