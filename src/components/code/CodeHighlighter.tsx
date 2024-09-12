import React, { useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'

import Prism from 'prismjs'

import './prism-one-light.scss'
import './prism-one-dark.scss'

import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

import 'prismjs/plugins/autoloader/prism-autoloader.js'

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

  showNumber?: boolean
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
  language = 'ts',
  code,
  transitionDuration = 400,
  showNumber = false
}: CodeHighlighterProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const { ref: cssRef } = useCSSVariable({
    '--react-transition-duration': transitionDuration + 'ms'
  })

  const codeRef = useRef(null)

  useEffect(() => {
    setIsLoading(true)
    Prism.plugins.autoloader.languages_path =
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/'

    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
    setIsLoading(false)
  }, [code, showNumber])

  return (
    <div
      ref={cssRef}
      className={classNames(styles['code-highlighter'], {
        [`relmethis-codeblock-container-light`]: !isDark,
        [`relmethis-codeblock-container-dark`]: isDark,
        [styles['code-highlighter--loading']]: isLoading
      })}
      style={style}
    >
      <pre
        className={classNames(styles['code-highlighter__pre'], {
          ['line-numbers']: showNumber
        })}
      >
        <code
          ref={codeRef}
          className={classNames(
            `language-${language}`,
            styles['code-highlighter__code']
          )}
        >
          {code.trim()}
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
