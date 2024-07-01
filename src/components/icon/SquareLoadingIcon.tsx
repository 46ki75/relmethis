/** @jsxImportSource @emotion/react */

// # --------------------------------------------------------------------------------
//
// Modules
//
// # --------------------------------------------------------------------------------

import { css, keyframes } from '@emotion/react'
import React from 'react'

// # --------------------------------------------------------------------------------
//
// Styles
//
// # --------------------------------------------------------------------------------

const containerStyle = (size: number) => css`
  position: relative;
  width: ${size}px;
  height: ${size}px;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg) rotateY(0deg) scale(0);
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    transform: rotate(360deg) rotateY(400deg) scale(1);
    opacity: 0;
  }
`

const squareStyle = (color: string, delay: number) => css`
  position: absolute;
  width: 100%;
  height: 100%;

  animation-name: ${spin};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-delay: ${delay}ms;

  border: solid 1px ${color};
`

// # --------------------------------------------------------------------------------
//
// Props Interface
//
// # --------------------------------------------------------------------------------

interface SquareLoadingIconProps {
  /**
   * **optional**
   *
   * Icon size. Specify the length of both the vertical and horizontal sides.
   * The vertical and horizontal sides should be of the same length.
   */
  size: number
  /**
   * **optional
   *
   * Specify the color of the icon.
   */
  color: string
}

// # --------------------------------------------------------------------------------
//
// Component
//
// # --------------------------------------------------------------------------------

const SquareLoadingIconComponent = ({
  size,
  color
}: SquareLoadingIconProps): JSX.Element => {
  return (
    <div css={containerStyle(size)}>
      <div css={squareStyle(color, 0)}></div>
      <div css={squareStyle(color, 400)}></div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// Default Props
//
// # --------------------------------------------------------------------------------

SquareLoadingIconComponent.defaultProps = {
  size: 64,
  color: 'rgb(22, 22, 22)'
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const SquareLoadingIcon = React.memo(SquareLoadingIconComponent)
