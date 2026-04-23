import React from 'react'

interface MoonCloudIconProps {
  width?: number
  height?: number
  stroke?: string
  className?: string
}

export const MoonCloudIcon: React.FC<MoonCloudIconProps> = ({
  width = 38,
  height = 33,
  stroke = '#828282',
  className
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 38 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g filter='url(#filter0_i_7334_3545)'>
        <path
          d='M13 17.0637C11.7638 16.4561 10.7151 15.5389 9.9612 14.4058C9.20729 13.2727 8.77522 11.9644 8.70918 10.6148C8.64315 9.26512 8.94552 7.92259 9.58537 6.72449C10.2252 5.52639 11.1796 4.51571 12.3508 3.79586C13.072 3.35254 13.0875 2.19139 12.2418 2.08302C9.69587 1.75593 7.119 2.403 5.05068 3.88879C2.98236 5.37458 1.58296 7.58388 1.14544 10.0542C0.707916 12.5245 1.2662 15.0642 2.70341 17.1418C4.14062 19.2193 6.34533 20.6735 8.85598 21.2'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M29.2587 12.9719C30.0834 13.4475 30.8065 14.0813 31.3868 14.8371C31.9671 15.5929 32.3932 16.4559 32.6408 17.3768C32.9066 18.3671 32.959 19.4028 32.7946 20.4149C33.7729 20.8695 34.6013 21.595 35.182 22.5058C35.7628 23.4165 36.0718 24.4747 36.0726 25.5557C36.0726 27.0596 35.4729 28.504 34.4106 29.5659C33.3477 30.628 31.9084 31.2248 30.4076 31.2258H29.1739L29.1599 31.2264H12.6649C11.164 31.2253 9.72476 30.6282 8.66198 29.5659C8.13579 29.0398 7.71817 28.4148 7.433 27.7269C7.14783 27.0389 7.0007 26.3013 7 25.5563C7 24.0524 7.59962 22.608 8.66198 21.5461C9.51367 20.6947 10.6132 20.1366 11.8018 19.9523C11.8285 19.7787 11.8642 19.6066 11.909 19.4362C12.0761 18.801 12.3669 18.2052 12.7647 17.6831C13.1625 17.161 13.6595 16.7231 14.227 16.3944C14.9456 15.9815 15.7554 15.7544 16.5834 15.7335C17.4114 15.7126 18.2316 15.8986 18.97 16.2748L19.3407 15.6324C20.3061 13.9623 21.8933 12.7445 23.7537 12.2464C25.6124 11.7496 27.5912 12.0104 29.2587 12.9719Z'
          stroke={stroke}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_i_7334_3545'
          x='0'
          y='1'
          width='37.0742'
          height='31.2266'
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
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow_7334_3545' />
        </filter>
      </defs>
    </svg>
  )
}
