import React, { useEffect, useMemo, useRef } from 'react'
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

// commandline
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/command-line/prism-command-line.js'

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
  preStyle?: React.CSSProperties
  codeStyle?: React.CSSProperties
  className?: string
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  /**
   * Programming language. Affects syntax highlighting.
   *
   * ## Special Languages
   *
   * - `treeview`: Generates a file tree view. Specifically targets output generated by the `tree -F` command.
   * - `diff`: Highlights code differences. Automatically generates and highlights a diff when `code` and `oldCode` values are provided.
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
  showLineNumber?: boolean

  /**
   * @see https://prismjs.com/plugins/line-highlight/
   *
   * Highlights specific lines. e.g., `['5', '14-17']`
   */
  highlightLines?: (string | number)[]

  /**
   * @see https://prismjs.com/plugins/command-line/
   */
  commandLine?: {
    /**
     * Username displayed in the prompt. Default value is `user`.
     */
    user?: string
    /**
     * Hostname displayed in the prompt. Default value is `localhost`.
     */
    host?: string
    /**
     * Lines marked as standard output. Only the left side of standard input lines will display the prompt.
     * e.g., `['2', '4-8']`
     */
    output?: (string | number)[]
    /**
     * Fully customizable prompt. e.g., `$`
     */
    prompt?: string
    continuationPrompt?: string
    continuationStr?: string
    filterOutput?: string
    filterContinuation?: string
  }
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CodeHighlighterComponent = (props: CodeHighlighterProps) => {
  const {
    style,
    preStyle,
    codeStyle,
    className,
    isDark = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
    code,
    oldCode,
    language = oldCode != null ? 'diff' : 'txt',
    transitionDuration = 400,
    showLineNumber: showNumber = false,
    highlightLines = [],
    commandLine
  } = props

  // # --------------------------------------------------------------------------------
  //
  // reactive values
  //
  // # --------------------------------------------------------------------------------

  const highlightLinesString = useMemo(
    () => highlightLines.join(', '),
    [highlightLines]
  )

  // # --------------------------------------------------------------------------------
  //
  // render
  //
  // # --------------------------------------------------------------------------------

  const codeRef = useRef(null)

  useEffect(() => {
    Prism.plugins.autoloader.languages_path =
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/'
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, showNumber, language, highlightLinesString])

  // # --------------------------------------------------------------------------------
  //
  // CSS Variables
  //
  // # --------------------------------------------------------------------------------

  const { ref: cssRef } = useCSSVariable({
    '--react-transition-duration': transitionDuration + 'ms'
  })

  // # --------------------------------------------------------------------------------
  //
  // render
  //
  // # --------------------------------------------------------------------------------

  return (
    <div
      style={{ ...style }}
      ref={cssRef}
      className={classNames(
        styles['code-highlighter'],
        {
          [`relmethis-codeblock-container-light`]: !isDark,
          [`relmethis-codeblock-container-dark`]: isDark
        },
        className
      )}
    >
      <pre
        style={{
          ...preStyle,
          paddingLeft:
            highlightLines.length > 0 && !showNumber ? '2.5rem' : 'auto'
        }}
        className={classNames(styles['code-highlighter__pre'], {
          ['line-numbers']: commandLine != null ? false : showNumber,
          ['command-line']: commandLine != null
        })}
        data-line={highlightLinesString}
        data-user={commandLine?.user}
        data-host={commandLine?.host}
        data-output={commandLine?.output?.join(', ')}
        data-prompt={commandLine?.prompt}
        data-continuation-prompt={commandLine?.continuationPrompt}
        data-continuation-str={commandLine?.continuationStr}
        data-filter-output={commandLine?.filterOutput}
        data-filter-continuation={commandLine?.filterContinuation}
      >
        <code
          ref={codeRef}
          className={classNames(
            `language-${language}`,
            styles['code-highlighter__code']
          )}
          style={codeStyle}
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
