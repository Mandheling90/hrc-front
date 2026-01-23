import React from 'react'

export interface DocumentIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({
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
        d='M45 15C44.8825 11.1175 44.45 8.8 42.845 7.1975C40.645 5 37.105 5 30.025 5H20.0175C12.9375 5 9.3975 5 7.2 7.1975C5 9.3925 5 12.93 5 20V40C5 47.07 5 50.6075 7.2 52.8025C9.4 54.9975 12.9375 55 20.0175 55H30.0275C37.105 55 40.645 55 42.845 52.8025C44.45 51.2 44.8825 48.885 45 45'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47.105 28.355L50.0475 25.4125C50.7225 24.7375 51.0625 24.3975 51.2425 24.0325C51.4103 23.6901 51.4975 23.3138 51.4975 22.9325C51.4975 22.5512 51.4103 22.1749 51.2425 21.8325C51.0625 21.4675 50.7225 21.1275 50.0475 20.4525C49.3725 19.7775 49.0325 19.4375 48.6675 19.2575C48.3251 19.0897 47.9488 19.0025 47.5675 19.0025C47.1862 19.0025 46.8099 19.0897 46.4675 19.2575C46.1025 19.4375 45.765 19.7775 45.0875 20.4525L42.145 23.395M47.105 28.355L33.94 41.52L26.5 44L28.98 36.56L42.145 23.395M47.105 28.355L42.145 23.395M9 46.5H11.5L14.625 40.25L17.75 46.5H20.25M11.5 14H31.5M11.5 24H26.5'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
