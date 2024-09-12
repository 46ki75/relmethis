import React, { useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// styles
import styles from './CodeHighlighter.module.scss'
import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// prism import
//
// # --------------------------------------------------------------------------------

import Prism from 'prismjs'

//styles
import './prism-one-light.scss'
import './prism-one-dark.scss'

// line numbers
// @see https://prismjs.com/plugins/line-numbers/
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

// line highlight
// @see https://prismjs.com/plugins/line-highlight/
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.js'

// language autoloader
import 'prismjs/plugins/autoloader/prism-autoloader.js'

// previewers @see https://prismjs.com/plugins/previewers/
import 'prismjs/plugins/previewers/prism-previewers.css'
import 'prismjs/plugins/previewers/prism-previewers.js'

// diff-highlight
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.js'

// treeview
import 'prismjs/plugins/treeview/prism-treeview.css'
import 'prismjs/plugins/treeview/prism-treeview.js'

// # --------------------------------------------------------------------------------
//
// utils
//
// # --------------------------------------------------------------------------------

function generatePrismDiff(oldCode: string, newCode: string): string {
  const oldLines = oldCode.split('\n')
  const newLines = newCode.split('\n')
  const maxLength = Math.max(oldLines.length, newLines.length)

  let diffResult = ''

  for (let i = 0; i < maxLength; i++) {
    const oldLine = oldLines[i] || ''
    const newLine = newLines[i] || ''

    if (oldLine === newLine) {
      diffResult += ` ${oldLine}\n`
    } else {
      if (oldLine) {
        diffResult += `-${oldLine}\n`
      }
      if (newLine) {
        diffResult += `+${newLine}\n`
      }
    }
  }

  return diffResult.trim()
}

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
   *
   * ## 特殊な言語
   *
   * - `treeview`: ファイルのツリービューを生成します。 `tree -F` コマンドで生成された出力が対象です。
   * - `diff`: コードの差分をハイライトします。 `code` と `oldCode` に値を渡すと自動で diff を生成してハイライトします。
   */
  language?: string

  /**
   * The content of the code
   */
  code: string

  /**
   * Used for creating a diff. If this prop is provided, the language will be
   * forced to `'diff'`.
   */
  oldCode?: string

  /**
   * Transition duration (in milliseconds) for theme changes
   */
  transitionDuration?: number

  /**
   * If `true`, numbers will be displayed on the left side of the code.
   */
  showNumber?: boolean

  /**
   * @see https://prismjs.com/plugins/line-highlight/
   *
   * Highlights specific lines. e.g., `['5', '14-17']`
   */
  highlightLines?: string[]
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
  code,
  oldCode,
  language = oldCode != null ? 'diff' : 'txt',
  transitionDuration = 400,
  showNumber = false,
  highlightLines = []
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
        data-line={highlightLines.join(', ')}
      >
        <code
          ref={codeRef}
          className={classNames(
            `language-${language}`,
            styles['code-highlighter__code']
          )}
        >
          {oldCode != null
            ? generatePrismDiff(oldCode.trim(), code.trim())
            : code.trim()}
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
