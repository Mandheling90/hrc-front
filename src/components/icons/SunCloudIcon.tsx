import React from 'react'

interface SunCloudIconProps {
  width?: number
  height?: number
  stroke?: string
  className?: string
}

export const SunCloudIcon: React.FC<SunCloudIconProps> = ({
  width = 40,
  height = 36,
  stroke = '#720021',
  className
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 40 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g filter='url(#filter0_i_7334_923)'>
        <path
          d='M32.1845 16.7453C33.0091 17.2209 33.7323 17.8547 34.3126 18.6105C34.8929 19.3663 35.319 20.2293 35.5666 21.1502C35.8324 22.1405 35.8848 23.1762 35.7204 24.1884C36.6987 24.643 37.5271 25.3684 38.1078 26.2792C38.6886 27.19 38.9975 28.2482 38.9983 29.3291C38.9983 30.833 38.3987 32.2774 37.3364 33.3393C36.2735 34.4014 34.8342 34.9983 33.3334 34.9993H32.0997L32.0857 34.9999H15.5907C14.0898 34.9987 12.6505 34.4017 11.5878 33.3393C11.0616 32.8132 10.644 32.1883 10.3588 31.5003C10.0736 30.8123 9.92648 30.0747 9.92578 29.3297C9.92578 27.8258 10.5254 26.3814 11.5878 25.3195C12.4395 24.4681 13.5389 23.91 14.7276 23.7257C14.7542 23.5521 14.79 23.3801 14.8348 23.2097C15.0019 22.5744 15.2927 21.9786 15.6905 21.4565C16.0883 20.9345 16.5853 20.4965 17.1527 20.1678C17.8713 19.7549 18.6812 19.5278 19.5092 19.5069C20.3372 19.486 21.1574 19.6721 21.8958 20.0482L22.2665 19.4059C23.2319 17.7358 24.8191 16.5179 26.6794 16.0198C28.5382 15.523 30.5169 15.7838 32.1845 16.7453Z'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.8905 20.0487L22.2611 19.4063C22.3492 19.2545 22.442 19.1062 22.5397 18.9613C22.9818 17.621 23.005 16.1773 22.6061 14.8235C22.2072 13.4696 21.4053 12.2702 20.3077 11.3858C19.2101 10.5014 17.8692 9.97411 16.4645 9.87459C15.0597 9.77507 13.6582 10.108 12.4474 10.8289C11.2366 11.5498 10.2744 12.6242 9.68953 13.9084C9.10464 15.1925 8.925 16.6251 9.17463 18.0144C9.42427 19.4037 10.0913 20.6834 11.0864 21.6823C12.0815 22.6811 13.3572 23.3515 14.7428 23.6035M5.65938 29.0131L8.50789 25.0836M1 21.6643L5.6183 20.1762M1 11.908L5.60921 13.4089M6.72063 4.0151L9.58428 7.93971M15.9772 1V5.85719M25.2332 4.0151L22.3944 7.95732M30.7161 10.9168L26.1081 12.4177'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_i_7334_923'
          x='0'
          y='0'
          width='40'
          height='36'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='0.945455' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0' />
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow_7334_923' />
        </filter>
      </defs>
    </svg>
  )
}
