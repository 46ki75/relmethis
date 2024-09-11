import React from 'react'

import isEqual from 'react-fast-compare'

import styles from './DotLoadingIcon.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface DotLoadingIconProps {
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
// component
//
// # --------------------------------------------------------------------------------

export const DotLoadingIconComponent = ({
  isDark = false,
  color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  size = 64
}: DotLoadingIconProps) => {
  const { ref } = useCSSVariable({
    '--react-color': color,
    '--react-size': size + 'px'
  })

  return (
    <div className={styles.wrapper} ref={ref}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const DotLoadingIcon = React.memo(DotLoadingIconComponent, isEqual)
