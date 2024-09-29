'use client'

import React from 'react'

import { DotLoadingIcon } from '../icon/DotLoadingIcon'

import { RectangleWave } from './RectangleWave'

import isEqual from 'react-fast-compare'

import styles from './NotFullscreenFallback.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface NotFullscreenFallbackProps {
  style?: React.CSSProperties
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

/**
 * UNIVERSAL (NO DOM ACCESS)
 */
const NotFullscreenFallbackComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
}: NotFullscreenFallbackProps) => {
  return (
    <div
      className={styles['full-screen-fallback']}
      style={{
        backgroundColor: isDark
          ? 'rgb(25.5, 25.5, 25.5)'
          : 'rgb(229.5, 229.5, 229.5)',
        ...style
      }}
    >
      <RectangleWave color='rgba(128,128,128,0.8)' />
      <DotLoadingIcon size={64} color='rgba(128,128,128,0.8)' />
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const NotFullscreenFallback = React.memo(
  NotFullscreenFallbackComponent,
  isEqual
)
