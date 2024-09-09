/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { FragmentIdentifier } from './FragmentIdentifier'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const h1Style = ({
  inView,
  isDark
}: {
  inView: boolean
  isDark: boolean
}) => css`
  margin-block-start: 1rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  font-size: 1.6rem;

  transition: opacity 400ms;

  opacity: ${inView ? 1 : 0};

  position: relative;

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: ${inView ? '45%' : '50%'};
    width: ${inView ? '10%' : '0%'};
    height: 3px;
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};

    transition:
      left 400ms ease-in-out 0ms,
      height 400ms ease-in-out 0ms,
      width 400ms ease-in-out 0ms;
  }

  &::after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    width: ${inView ? '100%' : '0%'};

    border-bottom: solid 1px
      ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};

    transition: width 400ms ease-in-out 200ms;

    pointer-events: none;
  }

  &::selection {
    background: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading1Props {
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

export const Heading1Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading1Props) => {
  const { ref, inView } = useInView()

  return (
    <section id={identifier}>
      <h1 css={h1Style({ inView, isDark })} ref={ref}>
        {text}
      </h1>
      <FragmentIdentifier identifier={identifier} isDark={isDark} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading1 = React.memo(Heading1Component)
