'use client'

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
export const NotFullscreenFallback = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
}: FullscreenFallbackProps) => {
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

const FullscreenFallbackComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
}: FullscreenFallbackProps) => {
  return createPortal(
    <NotFullscreenFallback style={style} isDark={isDark} />,
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
