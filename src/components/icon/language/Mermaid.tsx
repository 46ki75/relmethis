'use client'

import React from 'react'
import { type LanguageIconSvgProps } from './Props'

export const Mermaid = React.memo(
  ({ size = '20px', color }: LanguageIconSvgProps) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 32 32'
      >
        <path
          fill={color ?? '#fd366e'}
          d='M29.973 4.478A14.24 14.24 0 0 0 16 13.842c-2.107-5.82-7.787-9.628-13.973-9.364a14.25 14.25 0 0 0 6.2 12.36a7.65 7.65 0 0 1 3.316 6.32v4.376h8.916V23.16a7.65 7.65 0 0 1 3.315-6.32a14.25 14.25 0 0 0 6.2-12.36z'
        />
      </svg>
    )
  }
)
