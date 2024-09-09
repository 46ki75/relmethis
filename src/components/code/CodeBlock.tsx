/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React, {
  ReactNode,
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
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
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'
import { LanguageIcon } from '../icon/LanguageIcon'
import { Markdown } from '../markdown/Markdown'
import { Tooltip } from 'react-tooltip'
import { createPortal } from 'react-dom'
import { darken, lighten } from 'polished'
import { useCopy } from '../../hooks/useCopy'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = ({ isDark }: { isDark: boolean }) => css`
  background-color: ${isDark ? 'rgb(40, 44, 52)' : 'rgb(250, 250, 250)'};
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem rgba(128, 128, 128, 0.4);
  margin-block: 2rem;

  *::selection {
    background-color: ${isDark
      ? 'rgba(198, 222, 211, 0.2)'
      : 'rgba(138, 181, 159, 0.2)'};
  }
`

const headerStyle = css`
  box-sizing: border-box;
  padding: 0.75rem;
  width: 100%;
  font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono',
    monospace;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const captionStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(250, 250, 250, 0.8)' : 'rgba(40, 44, 52, 0.8)'};
`

const iconStyle = ({ isDark }: { isDark: boolean }) => css`
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 2px;
  color: ${isDark ? 'rgba(250, 250, 250, 0.8)' : 'rgba(40, 44, 52, 0.8)'};
`

const clickableIconStyle = ({ isDark }: { isDark: boolean }) => css`
  ${iconStyle({ isDark })};
  transition: background-color 200ms;

  cursor: pointer;

  &:hover {
    background-color: ${isDark
      ? 'rgba(250, 250, 250, 0.2)'
      : 'rgba(40, 44, 52, 0.2)'};
  }
`

const copiedtextStyle = ({ isShow }: { isShow: boolean }) => css`
  color: #59b57c;
  opacity: ${isShow ? 1 : 0};
  transition: opacity 400ms;
  user-select: none;
`

const hrStyle = ({ isDark }: { isDark: boolean }) => css`
  width: calc(100% - 1rem);
  margin: 0 0.5rem;
  padding: 0;
  border: none;
  border-bottom: solid 1px
    ${isDark ? 'rgba(250, 250, 250, 0.2)' : 'rgba(40, 44, 52, 0.2)'};
`

const fallbackStyle = css`
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(128, 128, 128, 0.5);
`

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const codeStyle = css`
  animation-name: ${fade};
  animation-duration: 800ms;
  animation-fill-mode: both;
`

// # --------------------------------------------------------------------------------
//
// inline styles
//
// # --------------------------------------------------------------------------------

const tooltipInlineStyle = ({
  isDark
}: {
  isDark: boolean
}): React.CSSProperties => ({
  background: isDark
    ? lighten(0.3, 'rgb(128,128,128)')
    : darken(0.3, 'rgb(128,128,128)'),
  color: isDark
    ? darken(0.3, 'rgb(128,128,128)')
    : lighten(0.3, 'rgb(128,128,128)')
})

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
  const deferredCode = useDeferredValue(code)
  const deferredLanguage = useDeferredValue(language)

  const [isShowNumber, setIsShowNumber] = useState<boolean>(false)

  useEffect(() => {
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
        <div css={codeStyle}>
          <KaTex equation={deferredCode} isDark={isDark} />
        </div>
      )
    } else if (deferredLanguage === 'mermaid') {
      return (
        <div css={codeStyle} style={{ margin: '2rem' }}>
          <Mermaid code={deferredCode} isDark={isDark} />
        </div>
      )
    } else if (deferredLanguage === 'markdown' || deferredLanguage === 'md') {
      return (
        <div style={{ padding: '1rem' }}>
          <Markdown markdown={deferredCode} isDark={isDark} />
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
  }, [deferredCode, deferredLanguage, isDark])

  return (
    <div css={wrapperStyle({ isDark })}>
      {/* header */}

      <div css={headerStyle}>
        <div>
          <LanguageIcon
            language={deferredLanguage}
            size={'20px'}
            color={undefined}
            isDark={isDark}
          />
          <span css={captionStyle({ isDark })}>{caption}</span>
        </div>
        <div>
          {<span css={copiedtextStyle({ isShow: isCopied })}>copied!</span>}

          {isAvailablePreview && (
            <ArrowsRightLeftIcon
              id='preview'
              css={clickableIconStyle({ isDark })}
              onClick={() => {
                setShowPreview(!showPreview)
              }}
            />
          )}

          <NumberedListIcon
            id='line-number'
            css={clickableIconStyle({ isDark })}
            onClick={() => {
              setIsShowNumber(!isShowNumber)
            }}
          />

          <ClipboardDocumentIcon
            id='copy'
            css={clickableIconStyle({ isDark })}
            onClick={() => {
              copy(deferredCode.trim())
            }}
          />

          {createPortal(
            <>
              <Tooltip
                style={tooltipInlineStyle({ isDark })}
                anchorSelect='#preview'
                content={'Toggle Code Preview'}
                place={'top-end'}
              />
              <Tooltip
                style={tooltipInlineStyle({ isDark })}
                anchorSelect='#line-number'
                content='Toggle Line Numbers'
                place={'top-end'}
              />
              <Tooltip
                style={tooltipInlineStyle({ isDark })}
                anchorSelect='#copy'
                content={'Copy Code to Clipboard'}
                place={'top-end'}
              />
            </>,
            document.body
          )}
        </div>
      </div>

      {/* divider */}

      <hr css={hrStyle({ isDark })} />

      {/* code */}

      <Suspense
        fallback={
          <div css={fallbackStyle}>
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
            isDark={isDark}
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
      css={codeStyle}
      style={isDark ? oneDark : oneLight}
      showLineNumbers={isShowNumber}
      customStyle={{ borderRadius: '0 0 0.25rem 0.25rem', margin: 0 }}
    >
      {code.trim()}
    </SyntaxHighlighter>
  )
)

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const CodeBlock = React.memo(CodeBlockComponent)
