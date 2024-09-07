/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React from 'react'
import { useInView } from 'react-intersection-observer'

// # --------------------------------------------------------------------------------
//
// Styles
//
// # --------------------------------------------------------------------------------

const containerStyle = css`
  width: 100%;
  margin: 1rem 0;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const dividerStyle = (flag: boolean, color: string, inView: boolean) => css`
  position: relative;

  height: 1px;
  background-color: ${color};

  width: ${inView ? (flag ? '46%' : '100%') : '0%'};

  transition: width 1200ms;

  &::before {
    position: absolute;
    content: '';
    top: calc(50% - 2.5px);
    left: 0;
    height: 5px;
    width: 5px;
    background-color: ${color};
    border-radius: 50%;
  }

  &::after {
    position: absolute;
    content: '';
    top: calc(50% - 2.5px);
    right: 0;
    height: 5px;
    width: 5px;
    background-color: ${color};
    border-radius: 50%;
  }
`

// # --------------------------------------------------------------------------------
//
// Props Interface
//
// # --------------------------------------------------------------------------------

interface DividerProps {
  /**
   * **optional?**
   *
   * If no text is input, a simple horizontal line will be drawn.
   * If text is input, it will be inserted in the middle of the horizontal line.
   *
   */
  text?: string
  /**
   * **optional?**
   *
   * Specify the color in a string.
   *
   * E.G.) `'#000000'`, `'rgb(0, 0, 0)'`
   *
   */
  color?: string
}

// # --------------------------------------------------------------------------------
//
// Component
//
// # --------------------------------------------------------------------------------

const DividerComponent = ({
  text,
  color = 'rgba(128,128,128,0.4)'
}: DividerProps): JSX.Element => {
  const { ref, inView } = useInView()

  return (
    <div css={containerStyle} ref={ref}>
      {text != null ? (
        <>
          <div css={dividerStyle(true, color, inView)}></div>
          <div style={{ color }}>{text}</div>
          <div css={dividerStyle(true, color, inView)}></div>
        </>
      ) : (
        <div css={dividerStyle(false, color, inView)}></div>
      )}
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const Divider = React.memo(DividerComponent)
