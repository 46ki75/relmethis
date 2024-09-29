'use client'

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
  /**
   * Set this to `true` if the code is not functioning correctly.
   * The default value is `false`.
   */
  invalidCode?: boolean
  locale?: 'en-US' | 'ja-JP'
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
  highlightLines,
  invalidCode = false,
  locale = 'en-US'
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
        {/* captions */}

        <div>
          <LanguageIcon
            language={deferredLanguage}
            size={20}
            color={undefined}
            isDark={isDarkLocal}
          />
          <span className={styles.caption}>{caption}</span>

          {/* invalid code caution */}
          {invalidCode && (
            <div className={styles.badge}>
              {locale === 'en-US' ? 'Invalid Code' : '誤りを含むコード'}
            </div>
          )}
        </div>

        {/* buttons */}

        <div>
          {
            <span className={styles['copy-text']}>
              {locale === 'en-US' ? 'copied!' : 'コピーしました'}
            </span>
          }

          {isAvailablePreview && (
            <SimpleTooltip
              content={
                locale === 'en-US' ? 'Toggle Code Preview' : 'コピーしました'
              }
              isDark={isDarkLocal}
              place='top'
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
            content={
              locale === 'en-US'
                ? 'Toggle Line Numbers'
                : '行番号表示の切り替え'
            }
            isDark={isDarkLocal}
            place='top'
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
            content={
              locale === 'en-US' ? 'Copy Code to Clipboard' : 'コードのコピー'
            }
            isDark={isDarkLocal}
            place='top'
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
            content={locale === 'en-US' ? 'Toggle Theme' : 'テーマ切り替え'}
            isDark={isDarkLocal}
            place='top'
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
