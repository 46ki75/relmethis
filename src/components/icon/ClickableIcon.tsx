import React, { ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import styles from './ClickableIcon.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { type Property } from 'csstype'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ClickableIconProps {
  style?: React.CSSProperties

  padding?: Property.Padding

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

const ClickableIconComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  padding = '0.25rem',
  children
}: ClickableIconProps) => {
  const { ref } = useCSSVariable({
    '--react-padding': padding,
    '--react-bg-color-primary': isDark
      ? 'rgba(255,255,255,0.2)'
      : 'rgba(0, 0, 0, 0.2)',
    '--react-bg-color-secondary': isDark
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0, 0, 0, 0.1)'
  })

  return (
    <span ref={ref} className={styles.icon} style={style}>
      {children}
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ClickableIcon = React.memo(ClickableIconComponent, isEqual)
