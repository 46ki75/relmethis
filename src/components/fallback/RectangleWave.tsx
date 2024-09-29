import React from 'react'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

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
  const { ref } = useCSSVariable({ '--react-color': color })

  return <div ref={ref} className={styles['rectangle-wave']}></div>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const RectangleWave = React.memo(RectangleWaveComponent, isEqual)
