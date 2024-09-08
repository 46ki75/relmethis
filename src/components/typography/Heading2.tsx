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

const topStyle = ({ isDark }: { isDark: boolean }) => css`
  margin-block-start: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  div:nth-of-type(1) {
    width: 4px;
    height: 4px;
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
  }

  div:nth-of-type(2) {
    width: 20%;
    height: 1px;
    border-top: dashed 1px
      ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  }
`

const headingStyle = ({ isDark }: { isDark: boolean }) => css`
  margin: 0;
  position: relative;
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  font-size: 1.5rem;

  &::selection {
    background: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }

  &::after {
    position: absolute;
    content: '';
    right: 2px;
    bottom: 0;
    width: 6px;
    height: 8px;
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    opacity: 0.8;
    transform: skewX(-25deg);
  }

  &::before {
    position: absolute;
    content: '';
    right: 10px;
    bottom: 0;
    width: 6px;
    height: 8px;
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    opacity: 0.8;
    transform: skewX(-25deg);
  }
`

const bottomStyle = ({
  inView,
  isDark
}: {
  inView: boolean
  isDark: boolean
}) => css`
  height: 2px;
  width: ${inView ? '100%' : '0%'};
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: solid 1px
    ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};

  transition: width 800ms;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: 16px;
    height: 2px;
    top: 2px;
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading2Props {
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

const Heading2Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading2Props) => {
  const { ref, inView } = useInView()

  return (
    <section id={identifier}>
      <div css={topStyle({ isDark })}>
        <div></div>
        <div></div>
      </div>
      <h2 ref={ref} css={headingStyle({ isDark })} id={identifier}>
        {text}
      </h2>
      <div css={bottomStyle({ inView, isDark })}></div>
      <FragmentIdentifier identifier={identifier} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading2 = React.memo(Heading2Component)
