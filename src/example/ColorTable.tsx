import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './ColorTable.module.scss'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ColorTableProps {
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

const ColorTableComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
}: ColorTableProps) => {
  return (
    <span className={clsx(styles.wrapper)} style={style}>
      <span>{String(isDark)}</span>
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ColorTable = React.memo(ColorTableComponent, isEqual)
