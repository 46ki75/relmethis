'use client'

import React, { ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import styles from './ScrollWindow.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ScrollWindowProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  children: ReactNode
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ScrollWindowComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  children
}: ScrollWindowProps) => {
  void String(isDark)

  return (
    <div className={styles['scroll-window']} style={style}>
      {children}
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ScrollWindow = React.memo(ScrollWindowComponent, isEqual)
