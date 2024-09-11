import React from 'react'

import { DotLoadingIcon } from '../icon/DotLoadingIcon'
import { createPortal } from 'react-dom'

import { RectangleWave } from './RectangleWave'

import isEqual from 'react-fast-compare'

import styles from './FullscreenFallback.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface FullscreenFallbackProps {
  style?: React.CSSProperties
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const FullscreenFallbackComponent = ({ style }: FullscreenFallbackProps) => {
  return createPortal(
    <div className={styles.wrapper} style={style}>
      <RectangleWave color='rgba(128,128,128,0.8)' />
      <DotLoadingIcon size={64} color='rgba(128,128,128,0.8)' />
    </div>,
    document.body
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const FullscreenFallback = React.memo(
  FullscreenFallbackComponent,
  isEqual
)
