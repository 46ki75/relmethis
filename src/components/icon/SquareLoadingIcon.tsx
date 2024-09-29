'use client'

import React from 'react'

import isEqual from 'react-fast-compare'

import styles from './SquareLoadingIcon.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// Props Interface
//
// # --------------------------------------------------------------------------------

interface SquareLoadingIconProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * **optional**
   *
   * Icon size. Specify the length of both the vertical and horizontal sides.
   * The vertical and horizontal sides should be of the same length.
   */
  size?: number
  /**
   * **optional
   *
   * Specify the color of the icon.
   */
  color?: string
}

// # --------------------------------------------------------------------------------
//
// Component
//
// # --------------------------------------------------------------------------------

const SquareLoadingIconComponent = ({
  isDark = false,
  color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  size = 64
}: SquareLoadingIconProps): JSX.Element => {
  const { ref } = useCSSVariable({
    '--react-size': size + 'px',
    '--react-color': color
  })

  return (
    <div ref={ref} className={styles.wrapper}>
      <div></div>
      <div></div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const SquareLoadingIcon = React.memo(SquareLoadingIconComponent, isEqual)
