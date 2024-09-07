/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = css`
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
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const InlineCodeComponent = ({ text }: InlineCodeProps) => {
  return <code css={style}>{text}</code>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineCode = React.memo(InlineCodeComponent)
