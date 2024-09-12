import React, { useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'

import Prism from 'prismjs'

import './prism-one-common.scss'
import './prism-one-light.scss'
import './prism-one-dark.scss'
import styles from './CodeHighlighter.module.scss'
import classNames from 'classnames'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface CodeHighlighterProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  /**
   * Programming language. Affects syntax highlighting.
   */
  language?: string

  /**
   * The content of the code
   */
  code: string

  /**
   * Transition duration (in milliseconds) for theme changes
   */
  transitionDuration?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CodeHighlighterComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  language = 'js',
  code,
  transitionDuration = 400
}: CodeHighlighterProps) => {
  const { ref: cssRef } = useCSSVariable({
    '--react-transition-duration': transitionDuration + 'ms'
  })

  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code])

  return (
    <div
      ref={cssRef}
      className={classNames(styles['code-highlighter'], {
        [`relmethis-codeblock-container-light`]: !isDark,
        [`relmethis-codeblock-container-dark`]: isDark
      })}
      style={style}
    >
      <pre className={styles['code-highlighter__pre']}>
        <code
          ref={codeRef}
          className={classNames(
            `language-${language}`,
            styles['code-highlighter__code']
          )}
        >
          {code}
        </code>
      </pre>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const CodeHighlighter = React.memo(CodeHighlighterComponent, isEqual)
