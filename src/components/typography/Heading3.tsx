/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { FragmentIdentifier } from './FragmentIdentifier'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const headingStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  padding: 0 0 0.25rem 0.5rem;
  font-size: 1.4rem;
  margin-block-start: 2rem;

  position: relative;

  border-left: solid 3px
    ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  border-bottom: dotted 1px
    ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading3Props {
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

export const Heading3Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading3Props) => {
  return (
    <section id={identifier}>
      <h3 css={headingStyle({ isDark })}>{text}</h3>
      <FragmentIdentifier identifier={identifier} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading3 = React.memo(Heading3Component)
