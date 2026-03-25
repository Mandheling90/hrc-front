import React from 'react'

export interface HospitalPortalIconProps {
  width?: number | string
  height?: number | string
  className?: string
  stroke?: string
}

export const HospitalPortalIcon: React.FC<HospitalPortalIconProps> = ({
  width = 60,
  height = 60,
  className = '',
  stroke = '#9f1836'
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
      <g clipPath='url(#clip0_2498_75412)'>
        <path
          d='M10 50.3369H23.75M10 58.1269H23.75M32.5 58.1269V50.3369H50V58.1269M50 20.9619H10V42.2119H50V20.9619Z'
          stroke={stroke}
          strokeWidth='3.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.25 42.2105L31.14 31.223C31.7966 30.4937 32.6039 29.916 33.5061 29.53C34.4082 29.1439 35.3836 28.9587 36.3644 28.9872C37.3453 29.0158 38.3082 29.2574 39.1864 29.6952C40.0646 30.1331 40.837 30.7568 41.45 31.523L50 42.2105'
          stroke={stroke}
          strokeWidth='3.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.75 30.9619C18.4185 30.9619 18.1005 30.8302 17.8661 30.5958C17.6317 30.3614 17.5 30.0434 17.5 29.7119C17.5 29.3804 17.6317 29.0625 17.8661 28.828C18.1005 28.5936 18.4185 28.4619 18.75 28.4619M18.75 30.9619C19.0815 30.9619 19.3995 30.8302 19.6339 30.5958C19.8683 30.3614 20 30.0434 20 29.7119C20 29.3804 19.8683 29.0625 19.6339 28.828C19.3995 28.5936 19.0815 28.4619 18.75 28.4619'
          stroke={stroke}
          strokeWidth='3.75'
        />
        <path
          d='M1.875 58.125V6.875C1.875 5.54892 2.40178 4.27715 3.33947 3.33947C4.27715 2.40178 5.54892 1.875 6.875 1.875H53.125C54.4511 1.875 55.7229 2.40178 56.6605 3.33947C57.5982 4.27715 58.125 5.54892 58.125 6.875V58.125M1.9225 12.41H58.095M12.705 1.875V12.41M23.5375 1.875V12.41'
          stroke={stroke}
          strokeWidth='3.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_2498_75412'>
          <rect width='60' height='60' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
