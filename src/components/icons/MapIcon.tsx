import React from 'react'

export interface MapIconProps {
  width?: number | string
  height?: number | string
  fill?: string
  className?: string
}

export const MapIcon: React.FC<MapIconProps> = ({
  width = 40,
  height = 40,
  fill = 'black',
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M19.9995 3.33203C12.6478 3.33203 6.66615 9.3137 6.66615 16.657C6.61782 27.3987 19.4928 36.3054 19.9995 36.6654C19.9995 36.6654 33.3812 27.3987 33.3328 16.6654C33.3328 9.3137 27.3512 3.33203 19.9995 3.33203ZM19.9995 23.332C16.3162 23.332 13.3328 20.3487 13.3328 16.6654C13.3328 12.982 16.3162 9.9987 19.9995 9.9987C23.6828 9.9987 26.6662 12.982 26.6662 16.6654C26.6662 20.3487 23.6828 23.332 19.9995 23.332Z'
        fill={fill}
      />
      <path
        d='M23.3327 17.7765H21.1105V19.9987H18.8882V17.7765H16.666V15.5543H18.8882V13.332H21.1105V15.5543H23.3327'
        fill={fill}
      />
    </svg>
  )
}
