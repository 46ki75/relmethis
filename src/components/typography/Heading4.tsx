/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { FragmentIdentifier } from './FragmentIdentifier'
import { useScrollToHash } from '../../hooks/useScrollToHash'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  font-size: 1.3rem;
  margin-block-start: 2rem;
  margin-block-end: 0;

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

export interface Heading4Props {
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

const Heading4Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading4Props) => {
  useScrollToHash(identifier, 400)

  return (
    <section id={identifier}>
      <h4 css={style({ isDark })}>{text}</h4>
      <FragmentIdentifier identifier={identifier} isDark={isDark} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading4 = React.memo(Heading4Component, isEqual)
