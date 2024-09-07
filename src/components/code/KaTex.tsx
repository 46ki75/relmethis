/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'

import katex from 'katex'
import 'katex/dist/katex.min.css'
import { rgba } from 'polished'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({
  display,
  isDark
}: {
  display: boolean
  isDark: boolean
}) => css`
  ${!display && 'margin-left: 0.5rem;'}
  ${!display && 'margin-right: 0.5rem;'}
  ${display && 'margin: 0.5rem;'}
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`

const errorStyle = css`
  color: rgba(255, 255, 255, 0.8);
  padding: 0 0.25rem;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
  background-color: ${rgba('#b36472', 0.45)};
`

const errorMessageStyle = css`
  color: #b36472;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface KaTexProps {
  /**
   * The KaTex expression.
   */
  equation: string
  /**
   * If `true`, the expression will be rendered as a **block** element.
   * If `false`, it will be rendered as an **inline** element. The default value is true, rendering it as a block element.
   */
  display?: boolean
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Whether to display errors.
   * Note: Errors will not be displayed for inline elements even if set to `true`.
   * Errors will be displayed as block elements.
   */
  throwOnError?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const KaTexComponent = ({
  equation: expression,
  display = true,
  isDark = false,
  throwOnError = display
}: KaTexProps) => {
  const targetRef = useRef<HTMLSpanElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (targetRef.current) {
      try {
        katex.render(expression, targetRef.current, {
          throwOnError: display && throwOnError,
          displayMode: display
        })
        setError(null)
      } catch (err) {
        console.error('KaTeX rendering error:', err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }
  }, [expression, display, throwOnError])

  return error ? (
    <>
      <div>
        <div title={error}>
          <span css={errorStyle}>ERROR</span>
          <span css={errorMessageStyle}>{error}</span>
        </div>
        <code>{expression}</code>
      </div>
    </>
  ) : (
    <span ref={targetRef} css={style({ display, isDark })}></span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const KaTex = React.memo(KaTexComponent)
