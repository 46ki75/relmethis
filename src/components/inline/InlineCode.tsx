import React from 'react'
import styles from './InlineCode.module.scss'
import classNames from 'classnames'
import { type Property } from 'csstype'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { getLuminance } from 'polished'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface InlineCodeProps {
  /**
   * The text to be displayed
   */
  text: string
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * The color of the text
   */
  color?: Property.Color
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const InlineCodeComponent = ({
  text,
  isDark = false,
  color = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
}: InlineCodeProps) => {
  const { ref } = useCSSVariable({
    '--react-color-fg': color,
    '--react-color-bg': color,
    '--react-color-fg-selection':
      getLuminance(color) < 0.5 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
  })

  return (
    <code
      ref={ref}
      className={classNames(styles.code, {
        [styles['react-dark']]: isDark,
        [styles['react-light']]: !isDark
      })}
    >
      {text}
    </code>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineCode = React.memo(InlineCodeComponent)
