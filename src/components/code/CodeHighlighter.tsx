import React, { useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// styles
import 'prism-theme-vars/base.css'
import styles from './CodeHighlighter.module.scss'
import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// prism import
//
// # --------------------------------------------------------------------------------

import Prism from 'prismjs'

//styles
import './prism-one-common.scss'

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
import { useDeepCompareEffect } from 'react-use'

// # --------------------------------------------------------------------------------
//
// themes
//
// # --------------------------------------------------------------------------------

const VITESSE_LIGHT = {
  '--prism-foreground': '#393a34',
  '--prism-background': '#eaeaea',
  '--prism-comment': '#a0ada0',
  '--prism-string': '#b56959',
  '--prism-literal': '#2f8a89',
  '--prism-number': '#296aa3',
  '--prism-keyword': '#098f53',
  '--prism-function': '#6c7834',
  '--prism-boolean': '#1c6b48',
  '--prism-constant': '#a65e2b',
  '--prism-deleted': '#a14f55',
  '--prism-class': '#2993a3',
  '--prism-builtin': '#ab5959',
  '--prism-property': '#b58451',
  '--prism-namespace': '#b05a78',
  '--prism-punctuation': '#8e8f8b',
  '--prism-decorator': '#bd8f8f',
  '--prism-regex': '#ab5e3f',
  '--prism-json-property': '#698c96',
  '--prism-selection-background': '#dddddd',
  '--prism-inline-background': 'var(--prism-background)',
  '--prism-operator': 'var(--prism-punctuation)',
  '--prism-variable': 'var(--prism-literal)',
  '--prism-symbol': 'var(--prism-literal)',
  '--prism-interpolation': 'var(--prism-literal)',
  '--prism-selector': 'var(--prism-keyword)',
  '--prism-keyword-control': 'var(--prism-keyword)',
  '--prism-line-number': '#a5a5a5',
  '--prism-line-number-gutter': '#333333',
  '--prism-line-highlight-background': '#eeeeee',
  '--prism-marker-color': 'var(--prism-foreground)',
  '--prism-marker-opacity': '0.4',
  '--prism-marker-font-size': '0.8em',
  '--prism-font-size': '1em',
  '--prism-line-height': '1.5em',
  '--prism-font-family': 'monospace',
  '--prism-inline-font-size': 'var(--prism-font-size)',
  '--prism-block-font-size': 'var(--prism-font-size)',
  '--prism-tab-size': '2',
  '--prism-block-padding-x': '1em',
  '--prism-block-padding-y': '1em',
  '--prism-block-margin-x': '0',
  '--prism-block-margin-y': '0.5em',
  '--prism-block-radius': '0.3em',
  '--prism-inline-padding-x': '0.3em',
  '--prism-inline-padding-y': '0.1em',
  '--prism-inline-radius': '0.3em',
  '--prism-comment-style': 'italic',
  '--prism-url-decoration': 'underline'
}

const VITESSE_DARK = {
  '--prism-scheme': 'dark',
  '--prism-foreground': '#d4cfbf',
  '--prism-background': '#1e1e1e',
  '--prism-comment': '#758575',
  '--prism-string': '#d48372',
  '--prism-literal': '#429988',
  '--prism-number': '#6394bf',
  '--prism-keyword': '#4d9375',
  '--prism-function': '#a1b567',
  '--prism-boolean': '#1c6b48',
  '--prism-variable': '#c2b36e',
  '--prism-constant': 'var(--prism-literal)',
  '--prism-symbol': 'var(--prism-literal)',
  '--prism-interpolation': 'var(--prism-literal)',
  '--prism-deleted': '#a14f55',
  '--prism-class': '#54b1bf',
  '--prism-builtin': '#e0a569',
  '--prism-property': '#dd8e6e',
  '--prism-namespace': '#db889a',
  '--prism-punctuation': '#858585',
  '--prism-decorator': '#bd8f8f',
  '--prism-operator': 'var(--prism-punctuation)',
  '--prism-selector': 'var(--prism-keyword)',
  '--prism-keyword-control': 'var(--prism-keyword)',
  '--prism-regex': '#ab5e3f',
  '--prism-json-property': '#6b8b9e',
  '--prism-inline-background': 'var(--prism-background)',
  '--prism-line-number': '#888888',
  '--prism-line-number-gutter': '#eeeeee',
  '--prism-line-highlight-background': '#444444',
  '--prism-selection-background': '#444444',
  '--prism-marker-color': 'var(--prism-foreground)',
  '--prism-marker-opacity': '0.4',
  '--prism-marker-font-size': '0.8em',
  '--prism-font-size': '1em',
  '--prism-line-height': '1.5em',
  '--prism-font-family': 'monospace',
  '--prism-inline-font-size': 'var(--prism-font-size)',
  '--prism-block-font-size': 'var(--prism-font-size)',
  '--prism-tab-size': '2',
  '--prism-block-padding-x': '1em',
  '--prism-block-padding-y': '1em',
  '--prism-block-margin-x': '0',
  '--prism-block-margin-y': '0.5em',
  '--prism-block-radius': '0.3em',
  '--prism-inline-padding-x': '0.3em',
  '--prism-inline-padding-y': '0.1em',
  '--prism-inline-radius': '0.3em',
  '--prism-comment-style': 'italic',
  '--prism-url-decoration': 'underline'
}

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
    showLineNumber = false,
    highlightLines = [],
    commandLine
  } = props

  // # --------------------------------------------------------------------------------
  //
  // render
  //
  // # --------------------------------------------------------------------------------

  const codeRef = useRef(null)

  const highlight = () => {
    Prism.plugins.autoloader.languages_path =
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/'
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }

  useEffect(() => {
    highlight()
  }, [code, oldCode, language, showLineNumber])

  useDeepCompareEffect(() => {
    highlight()
  }, [highlightLines, commandLine])

  // # --------------------------------------------------------------------------------
  //
  // CSS Variables
  //
  // # --------------------------------------------------------------------------------

  const { ref: cssRef } = useCSSVariable({
    '--react-transition-duration': transitionDuration + 'ms',
    ...(isDark ? VITESSE_DARK : VITESSE_LIGHT)
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
        'relmethis-codeblock-container-common',
        className
      )}
    >
      <pre
        style={{
          ...preStyle,
          paddingLeft:
            highlightLines.length > 0 && !showLineNumber ? '2.5rem' : undefined
        }}
        className={classNames(styles['code-highlighter__pre'], {
          ['line-numbers']: commandLine != null ? false : showLineNumber,
          ['command-line']: commandLine != null
        })}
        data-line={highlightLines.join(', ')}
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
