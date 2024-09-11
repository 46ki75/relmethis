import React from 'react'
import styles from './InlineCode.module.scss'
import classNames from 'classnames'

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
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const InlineCodeComponent = ({ text, isDark = false }: InlineCodeProps) => {
  return (
    <code
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
