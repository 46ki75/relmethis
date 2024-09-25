import React, {
  ReactNode,
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'

// KaTex
import type { KaTex as KaTexType } from './KaTex'
const KaTex = React.lazy(() =>
  import('./KaTex').then((module) => ({
    default: module.KaTex
  }))
) as React.ComponentType<React.ComponentProps<typeof KaTexType>>

// mermaid
import type { Mermaid as MermaidType } from './Mermaid'
const Mermaid = React.lazy(() =>
  import('./Mermaid').then((module) => ({
    default: module.Mermaid
  }))
) as React.ComponentType<React.ComponentProps<typeof MermaidType>>

// icons
import {
  NumberedListIcon,
  ClipboardDocumentIcon,
  ArrowsRightLeftIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'
import { LanguageIcon } from '../icon/LanguageIcon'

import { useCopy } from '../../hooks/useCopy'

import { SimpleTooltip } from '../containment/SimpleTooltip'
import { Markdown } from '../markdown/Markdown'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './CodeBlock.module.scss'
import { darken, lighten } from 'polished'
import { CodeHighlighter } from './CodeHighlighter'

// # --------------------------------------------------------------------------------
//
// Props Interface
//
// # --------------------------------------------------------------------------------

interface CodeBlockProps {
  /**
   * The source code string to be highlighted
   */
  code: string
  /**
   * The language of the code
   */
  language?: string
  /**
   * The caption displayed in the header above the code
   */
  caption?: string
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Displays a preview of the code. When set to `true`,
   * the preview is shown first; when set to `false`, the code is shown first.
   */
  enablePreview?: boolean
  /**
   * @see https://prismjs.com/plugins/line-highlight/
   *
   * Highlights specific lines. e.g., `['5', '14-17']`
   */
  highlightLines?: (string | number)[]
}

// # --------------------------------------------------------------------------------
//
// Component
//
// # --------------------------------------------------------------------------------

const CodeBlockComponent = ({
  code,
  language = 'txt',
  caption = language,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  enablePreview = true,
  highlightLines
}: CodeBlockProps) => {
  const [isDarkLocal, setIsDarkLocal] = useState(isDark)

  useEffect(() => {
    setIsDarkLocal(isDark)
  }, [isDark])

  const deferredCode = useDeferredValue(code)
  const deferredLanguage = useDeferredValue(language)

  // Determine whether to show or hide the number based on the screen size once

  const [isShowNumber, setIsShowNumber] = useState<boolean>(false)

  useLayoutEffect(() => {
    const media = window.matchMedia('(min-width: 480px)')
    setIsShowNumber(media.matches)
  }, [])

  const { copy, isCopied } = useCopy(2000)

  // # --------------------------------------------------------------------------------
  //
  // preview
  //
  // # --------------------------------------------------------------------------------

  const previewAvailableLanguages = ['katex', 'mermaid', 'markdown', 'md']

  const isAvailablePreview =
    previewAvailableLanguages.includes(deferredLanguage)

  const [showPreview, setShowPreview] = useState(
    enablePreview && isAvailablePreview
  )

  const renderPreviewComponent = useCallback((): ReactNode => {
    if (deferredLanguage === 'katex') {
      return (
        <div className={styles['fade-in']}>
          <KaTex equation={deferredCode} isDark={isDarkLocal} />
        </div>
      )
    } else if (deferredLanguage === 'mermaid') {
      return (
        <div className={styles['fade-in']} style={{ margin: '2rem' }}>
          <Mermaid code={deferredCode} isDark={isDarkLocal} />
        </div>
      )
    } else if (deferredLanguage === 'markdown' || deferredLanguage === 'md') {
      return (
        <div style={{ padding: '1rem' }}>
          <Markdown markdown={deferredCode} isDark={isDarkLocal} />
        </div>
      )
    } else {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: 'rgba(128,128,128,0.5)'
          }}
        >
          <div style={{ margin: '2rem' }}>Preview not available</div>
        </div>
      )
    }
  }, [deferredCode, deferredLanguage, isDarkLocal])

  // # --------------------------------------------------------------------------------
  //
  // CSS Variables
  //
  // # --------------------------------------------------------------------------------

  const COLOR_LIGHT = '#f5f5f5'
  const COLOR_DARK = '#272727'

  const { ref } = useCSSVariable({
    '--react-color-fg': isDarkLocal
      ? darken(0.15, COLOR_LIGHT)
      : lighten(0.15, COLOR_DARK),
    '--react-color-bg': isDarkLocal ? COLOR_DARK : COLOR_LIGHT,
    '--react-copy-text-opacity': isCopied ? 0.8 : 0
  })

  // # --------------------------------------------------------------------------------
  //
  // render
  //
  // # --------------------------------------------------------------------------------

  return (
    <div ref={ref} className={styles['code-block']}>
      {/* header */}

      <div className={styles.header}>
        <div>
          <LanguageIcon
            language={deferredLanguage}
            size={20}
            color={undefined}
            isDark={isDarkLocal}
          />
          <span className={styles.caption}>{caption}</span>
        </div>
        <div>
          {<span className={styles['copy-text']}>copied!</span>}

          {isAvailablePreview && (
            <SimpleTooltip
              content={'Toggle Code Preview'}
              isDark={isDarkLocal}
              place='bottom'
              margin={24}
            >
              <ArrowsRightLeftIcon
                className={styles.icon}
                onClick={() => {
                  setShowPreview(!showPreview)
                }}
              />
            </SimpleTooltip>
          )}
          <SimpleTooltip
            content={'Toggle Line Numbers'}
            isDark={isDarkLocal}
            place='bottom'
            margin={24}
          >
            <NumberedListIcon
              className={styles.icon}
              onClick={() => {
                setIsShowNumber(!isShowNumber)
              }}
            />
          </SimpleTooltip>

          <SimpleTooltip
            content={'Copy Code to Clipboard'}
            isDark={isDarkLocal}
            place='bottom'
            margin={24}
          >
            <ClipboardDocumentIcon
              className={styles.icon}
              onClick={() => {
                copy(deferredCode.trim())
              }}
            />
          </SimpleTooltip>

          <SimpleTooltip
            content={'Toggle Theme'}
            isDark={isDarkLocal}
            place='bottom'
            margin={24}
          >
            {isDarkLocal ? (
              <MoonIcon
                className={styles.icon}
                onClick={() => {
                  setIsDarkLocal(false)
                }}
              />
            ) : (
              <SunIcon
                className={styles.icon}
                onClick={() => {
                  setIsDarkLocal(true)
                }}
              />
            )}
          </SimpleTooltip>
        </div>
      </div>

      {/* divider */}

      <hr className={styles.hr} />

      {/* code */}

      <Suspense
        fallback={
          <div className={styles.fallback}>
            <DotLoadingIcon size={32} color='rgba(128,128,128,0.8)' />
          </div>
        }
      >
        {showPreview ? (
          renderPreviewComponent()
        ) : (
          <CodeHighlighter
            language={deferredLanguage}
            showLineNumber={isShowNumber}
            isDark={isDarkLocal}
            code={code.trim()}
            highlightLines={highlightLines?.map((t) => t.toString().trim())}
            preStyle={{ margin: 0, borderRadius: '0 0 0.25rem 0.25rem' }}
          />
        )}
      </Suspense>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const CodeBlock = React.memo(CodeBlockComponent, isEqual)
