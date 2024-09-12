import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './Template.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TemplateProps {
  style: React.CSSProperties

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

const TemplateComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
}: TemplateProps) => {
  return (
    <span className={styles.wrapper} style={style}>
      {String(isDark)}
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Template = React.memo(TemplateComponent, isEqual)
