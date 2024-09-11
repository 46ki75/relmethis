import React, { useEffect, useRef, useState } from 'react'

import katex from 'katex'
import 'katex/dist/katex.min.css'

import isEqual from 'react-fast-compare'
import styles from './KaTex.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

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
  equation,
  display = true,
  isDark = false,
  throwOnError = display
}: KaTexProps) => {
  const [error, setError] = useState<string | null>(null)

  const targetRef = useRef<HTMLSpanElement>(null)

  const { ref: cssVariableRef } = useCSSVariable({
    '--react-margin': display ? '0.5rem' : '0rem 0.5rem 0rem 0.5rem',
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
  })

  const ref = useMergeRefs(targetRef, cssVariableRef)

  useEffect(() => {
    setError(null)
    if (targetRef.current) {
      try {
        katex.render(equation, targetRef.current, {
          throwOnError: display && throwOnError,
          displayMode: display
        })
        setError(null)
      } catch (err) {
        console.error('KaTeX rendering error:', err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }
  }, [equation, display, throwOnError])

  return error ? (
    <>
      <div className={styles.error}>
        <div>
          <span className={styles.badge}>ERROR</span>
          <span className={styles.message}>{error}</span>
        </div>
        <code className={styles.code}>{equation}</code>
      </div>
    </>
  ) : (
    <span ref={ref} className={styles.katex}></span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const KaTex = React.memo(KaTexComponent, isEqual)
