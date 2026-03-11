import React from 'react'

export interface EConsultingIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
}

export const EConsultingIcon: React.FC<EConsultingIconProps> = ({
  width = 48,
  height = 48,
  className = '',
  fill = 'currentColor'
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
        d='M35.6923 9.3851H41.5385C41.9261 9.3851 42.2978 9.53909 42.5719 9.81318C42.846 10.0873 43 10.459 43 10.8466V34.2313C43 34.6189 42.846 34.9906 42.5719 35.2647C42.2978 35.5388 41.9261 35.6928 41.5385 35.6928H6.46154C6.07391 35.6928 5.70217 35.5388 5.42807 35.2647C5.15398 34.9906 5 34.6189 5 34.2313V10.8466C5 10.459 5.15398 10.0873 5.42807 9.81318C5.70217 9.53909 6.07391 9.3851 6.46154 9.3851H12.3077M21.0769 35.6928L18.1538 43.0005M26.9231 35.6928L29.8462 43.0005M15.2308 43.0005H32.7692M24 22.5389V5.00049'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 11.0005L23.5 5.00049L29 11.0005'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
