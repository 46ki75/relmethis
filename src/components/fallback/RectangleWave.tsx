import React from 'react'

import isEqual from 'react-fast-compare'

import styles from './RectangleWave.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface RectangleWaveProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  color?: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const RectangleWaveComponent = ({
  isDark = false,
  color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
}: RectangleWaveProps): JSX.Element => {
  return (
    <div
      aria-hidden={'true'}
      className={styles['rectangle-wave']}
      style={{ border: `solid 1px ${color}` }}
    ></div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const RectangleWave = React.memo(RectangleWaveComponent, isEqual)
