/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { FragmentIdentifier } from './FragmentIdentifier'
import { useScrollToHash } from '../../hooks/useScrollToHash'

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
  useScrollToHash(identifier, 300)

  return (
    <section id={identifier}>
      <h3 css={headingStyle({ isDark })}>{text}</h3>
      <FragmentIdentifier identifier={identifier} isDark={isDark} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading3 = React.memo(Heading3Component)
