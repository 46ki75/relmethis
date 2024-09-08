/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { FragmentIdentifier } from './FragmentIdentifier'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  font-size: 1.25rem;
  margin-block-start: 2rem;
  margin-block-end: 0;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading5Props {
  /**
   * The text to be displayed
   */
  text: string
  /**
   * The ID to be assigned to the tag. Defaults to the value of `text` if not provided
   */
  identifier?: string
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

const Heading5Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading5Props) => {
  return (
    <section id={identifier}>
      <h5 css={style({ isDark })}>{text}</h5>
      <FragmentIdentifier identifier={identifier} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading5 = React.memo(Heading5Component)
