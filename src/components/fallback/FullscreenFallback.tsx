'use client'

import React from 'react'

import { createPortal } from 'react-dom'

import isEqual from 'react-fast-compare'

import { NotFullscreenFallback } from './NotFullscreenFallback'

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
