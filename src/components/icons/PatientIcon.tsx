import React from 'react'

export interface PatientIconProps {
  width?: number | string
  height?: number | string
  className?: string
  fill?: string
  stroke?: string
}

export const PatientIcon: React.FC<PatientIconProps> = ({
  width = 49,
  height = 54,
  className = '',
  fill = '#720021',
  stroke = '#720021'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.9688 30.7639H13.125C10.1413 30.7639 7.27983 31.9345 5.17005 34.0183C3.06026 36.102 1.875 38.9281 1.875 41.875V51.875H22.9688M9.5 12.9861C9.5 15.933 10.6853 18.7591 12.795 20.8429C14.9048 22.9266 17.7663 24.0972 20.75 24.0972C23.7337 24.0972 26.5952 22.9266 28.705 20.8429C30.8147 18.7591 32 15.933 32 12.9861C32 10.0393 30.8147 7.21311 28.705 5.12937C26.5952 3.04563 23.7337 1.875 20.75 1.875C17.7663 1.875 14.9048 3.04563 12.795 5.12937C10.6853 7.21311 9.5 10.0393 9.5 12.9861Z"
        stroke={stroke}
        strokeWidth="3.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.8125 46.8761L46.875 51.8761M27.1875 40.765C27.1875 42.9751 28.0764 45.0947 29.6588 46.6575C31.2411 48.2203 33.3872 49.0983 35.625 49.0983C37.8628 49.0983 40.0089 48.2203 41.5912 46.6575C43.1736 45.0947 44.0625 42.9751 44.0625 40.765C44.0625 38.5548 43.1736 36.4352 41.5912 34.8724C40.0089 33.3096 37.8628 32.4316 35.625 32.4316C33.3872 32.4316 31.2411 33.3096 29.6588 34.8724C28.0764 36.4352 27.1875 38.5548 27.1875 40.765Z"
        stroke={stroke}
        strokeWidth="3.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
