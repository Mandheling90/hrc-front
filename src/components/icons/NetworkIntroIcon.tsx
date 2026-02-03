import React from 'react'

export interface NetworkIntroIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const NetworkIntroIcon: React.FC<NetworkIntroIconProps> = ({
  width = 112,
  height = 110,
  className = '',
  stroke = '#816331'
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 112 110'
      fill='none'
      className={className}
    >
      <path
        d='M31.6434 38.0957H40.0863L44.3078 48.6493H2.09326L6.31471 38.0957H14.7576M6.31471 48.6493H40.0863V71.8673H6.31471V48.6493Z'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.2005 57.0943H14.7576V71.8694H23.2005M23.2005 57.0943V71.8694M23.2005 57.0943H31.6434V71.8694H23.2005M20.0344 40.2085H26.3666M35.8648 71.8694H10.5361M23.2005 43.3746V37.0424M14.7576 31.7656H31.6434V48.6514H14.7576V31.7656Z'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M97.076 38.0957H105.519L109.74 48.6493H67.5259L71.7473 38.0957H80.1902M71.7473 48.6493H105.519V71.8673H71.7473V48.6493Z'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M88.6331 57.0943H80.1902V71.8694H88.6331M88.6331 57.0943V71.8694M88.6331 57.0943H97.076V71.8694H88.6331M85.467 40.2085H91.7992M101.297 71.8694H75.9688M88.6331 43.3746V37.0424M80.1902 31.7656H97.076V48.6514H80.1902V31.7656Z'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.9756 94.0479V83.5112M37.9756 83.5112H48.5123M37.9756 83.5112L44.6877 90.2296C46.8493 92.3913 49.5419 93.9458 52.4948 94.7368C55.4477 95.5279 58.5568 95.5277 61.5096 94.7362C64.4624 93.9447 67.1547 92.3898 69.3161 90.2278C71.4774 88.0658 73.0314 85.3729 73.822 82.4199'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M63.2874 26.6977H73.8241L67.1099 19.9793C64.9483 17.8176 62.2557 16.2631 59.3028 15.472C56.3499 14.681 53.2408 14.6812 50.288 15.4727C47.3352 16.2642 44.6429 17.8191 42.4816 19.9811C40.3203 22.1431 38.7662 24.8359 37.9756 27.789M73.8241 16.161V26.6935'
        stroke={stroke}
        strokeWidth='3.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
