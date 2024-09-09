/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { useInView } from 'react-intersection-observer'
import { isEqual } from 'lodash'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const pStyle = ({
  isDark,
  inView
}: {
  isDark: boolean
  inView: boolean
}) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  opacity: ${inView ? 1 : 0};
  transition: opacity 800ms;
  margin-block: 1.5rem;

  &::selection {
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ParagraphProps {
  children: ReactNode
  style?: React.CSSProperties
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ParagraphComponent = ({
  children,
  style,
  isDark = false
}: ParagraphProps) => {
  const { ref, inView } = useInView()

  return (
    <p style={style} css={pStyle({ isDark, inView })} ref={ref}>
      {children}
    </p>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Paragraph = React.memo(
  ParagraphComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isDark === nextProps.isDark &&
      isEqual(prevProps.style, nextProps.style) &&
      isEqual(prevProps.children, nextProps.children)
    )
  }
)
