import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './ToggleTheme.module.scss'
import { Property } from 'csstype'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ToggleThemeProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  onClick?: () => void

  size?: Property.Width | Property.Width
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ToggleThemeComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  size = '24px',
  onClick
}: ToggleThemeProps) => {
  return isDark ? (
    <MoonIcon
      className={styles.dark}
      style={{ ...style, width: size }}
      onClick={onClick}
    />
  ) : (
    <SunIcon
      className={styles.light}
      style={{ ...style, width: size }}
      onClick={onClick}
    />
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ToggleTheme = React.memo(ToggleThemeComponent, isEqual)
