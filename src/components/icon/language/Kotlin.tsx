'use client'

import React from 'react'
import { type LanguageIconSvgProps } from './Props'

export const Kotlin = React.memo(
  ({ size = '20px', color }: LanguageIconSvgProps) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 128 128'
      >
        <defs>
          <linearGradient
            id='deviconKotlin0'
            x1='500.003'
            x2='-.097'
            y1='579.106'
            y2='1079.206'
            gradientTransform='translate(15.534 -96.774)scale(.1939)'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='.003' stop-color={color ?? '#e44857'} />
            <stop offset='.469' stop-color={color ?? '#c711e1'} />
            <stop offset='1' stop-color={color ?? '#7f52ff'} />
          </linearGradient>
        </defs>
        <path
          fill='url(#deviconKotlin0)'
          d='M112.484 112.484H15.516V15.516h96.968L64 64Zm0 0'
        />
      </svg>
    )
  }
)
