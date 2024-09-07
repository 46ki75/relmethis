/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import { RerenderInView } from '../utils/RerenderInView'
import React from 'react'

// # --------------------------------------------------------------------------------
//
// Styles
//
// # --------------------------------------------------------------------------------

const containerStyle = css`
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const animation = keyframes`
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
`

const animationHalf = keyframes`
    from {
        width: 0%;
    }

    to {
        width: 46%;
    }
`

const dividerStyle = (flag: boolean, color: string) => css`
  position: relative;

  height: 1px;
  background-color: ${color};

  animation-name: ${flag ? animationHalf : animation};
  animation-duration: 1200ms;
  animation-fill-mode: both;

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
  color = 'rgba(128,128,128,0.3)'
}: DividerProps): JSX.Element => {
  return (
    <RerenderInView
      element={
        <div css={containerStyle}>
          {text != null ? (
            <>
              <div css={dividerStyle(true, color)}></div>
              <div style={{ color }}>{text}</div>
              <div css={dividerStyle(true, color)}></div>
            </>
          ) : (
            <div css={dividerStyle(false, color)}></div>
          )}
        </div>
      }
    />
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const Divider = React.memo(DividerComponent)
