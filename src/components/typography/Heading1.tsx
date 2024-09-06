/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { FragmentIdentifier } from './FragmentIdentifier'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const h1Style = ({ inView }: { inView: boolean }) => css`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.8);

  animation-name: ${fade};
  animation-duration: 800ms;
  animation-fill-mode: both;

  position: relative;

  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: ${inView ? '100%' : '0%'};
    width: ${inView ? '100%' : '0%'};

    border-left: solid 1px #d7925a;
    border-top: solid 1px #d7925a;

    transition:
      height 400ms ease-in-out 0ms,
      width 400ms ease-in-out 200ms;

    pointer-events: none;
  }

  &::after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    height: ${inView ? '100%' : '0%'};
    width: ${inView ? '100%' : '0%'};

    border-right: solid 1px #d7925a;
    border-bottom: solid 1px #d7925a;

    transition:
      height 400ms ease-in-out 0ms,
      width 400ms ease-in-out 200ms;

    pointer-events: none;
  }

  &::selection {
    background-color: #aed8be8c;
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
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const Heading1Component = ({
  text,
  identifier = text
}: Heading1Props) => {
  const { ref, inView } = useInView()

  return (
    <>
      <h1 id={identifier} css={h1Style({ inView })} ref={ref}>
        {text}
      </h1>
      <FragmentIdentifier identifier={identifier} />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading1 = React.memo(Heading1Component)
