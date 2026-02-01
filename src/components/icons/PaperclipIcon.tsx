import React from 'react'

export interface PaperclipIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const PaperclipIcon: React.FC<PaperclipIconProps> = ({
  width = 24,
  height = 24,
  className = '',
  stroke = '#636363'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M19.01 13.1006C21.663 10.5606 21.663 6.44463 19.01 3.90463C16.357 1.36463 12.057 1.36563 9.404 3.90463M7.918 17.8076L15.808 10.2546C16.0322 10.0439 16.211 9.78956 16.3331 9.50715C16.4553 9.22475 16.5183 8.92032 16.5183 8.61263C16.5183 8.30493 16.4553 8.0005 16.3331 7.7181C16.211 7.43569 16.0322 7.18131 15.808 6.97062C15.3437 6.53391 14.7304 6.29075 14.093 6.29075C13.4556 6.29075 12.8423 6.53391 12.378 6.97062L4.544 14.4686C4.11777 14.8689 3.77807 15.3522 3.54586 15.8888C3.31365 16.4254 3.19385 17.0039 3.19385 17.5886C3.19385 18.1733 3.31365 18.7518 3.54586 19.2884C3.77807 19.825 4.11777 20.3084 4.544 20.7086C6.344 22.4316 9.262 22.4316 11.062 20.7086L15.036 16.9046M3 10.0346L6.202 6.97062'
        stroke={stroke}
        strokeWidth='2.5'
        strokeLinecap='round'
      />
    </svg>
  )
}
