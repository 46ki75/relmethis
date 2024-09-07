/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  padding: 0.25rem 0.5rem;
  background-color: rgba(128, 128, 128, 0.1);
  border-radius: 0.25rem;
  font-family: monospace;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface InlineCodeProps {
  /**
   * The text to be displayed
   */
  text: string
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

const InlineCodeComponent = ({ text, isDark = false }: InlineCodeProps) => {
  return <code css={style({ isDark })}>{text}</code>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineCode = React.memo(InlineCodeComponent)
