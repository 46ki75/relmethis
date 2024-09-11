import React, {
  ReactNode,
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'

// highlight
import type { Prism as SyntaxHighlighterType } from 'react-syntax-highlighter'
const SyntaxHighlighter = React.lazy(() =>
  import('react-syntax-highlighter').then((module) => ({
    default: module.Prism
  }))
) as React.ComponentType<React.ComponentProps<typeof SyntaxHighlighterType>>

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

import {
  oneLight,
  oneDark
} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
  isDark = false,
  enablePreview = true
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

  const { copy, isCopied } = useCopy()

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

  const COLOR_LIGHT = 'rgb(250, 250, 250)'
  const COLOR_DARK = 'rgb(40, 44, 52)'

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
          <MemoizedSyntaxHighlighter
            code={code}
            language={deferredLanguage}
            isDark={isDarkLocal}
            isShowNumber={isShowNumber}
          />
        )}
      </Suspense>
    </div>
  )
}

const MemoizedSyntaxHighlighter = React.memo(
  ({
    code,
    language = 'txt',
    isDark = false,
    isShowNumber = true
  }: {
    code: string
    language?: string
    isDark?: boolean
    isShowNumber?: boolean
  }) => (
    <SyntaxHighlighter
      language={language}
      className={`${styles['fade-in']} ${styles['syntax-highlighter']}`}
      style={isDark ? oneDark : oneLight}
      showLineNumbers={isShowNumber}
      customStyle={{ margin: 0, borderRadius: '0 0 0.25rem 0.25rem' }}
    >
      {code.trim()}
    </SyntaxHighlighter>
  ),
  isEqual
)

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const CodeBlock = React.memo(CodeBlockComponent, isEqual)
