/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React from 'react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0%) scaleY(0.3) scaleX(1.5);
  }

  10% {
    transform: scaleY(0.8) scaleX(1.2);
  }

  100% {
    transform: translateY(-400%) scaleY(1.1);
  }
`

const containerStyle = css`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`

const dotStyle = css`
  width: 20%;
  height: 20%;
  border-radius: 50%;

  animation-name: ${bounceAnimation};
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-out;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface DotLoadingIconProps {
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
// component
//
// # --------------------------------------------------------------------------------

export const DotLoadingIconComponent = ({
  color,
  size
}: DotLoadingIconProps) => {
  return (
    <div css={containerStyle} style={{ width: size, height: size }}>
      <div
        css={dotStyle}
        style={{ background: color, animationDelay: '-100ms' }}
      ></div>
      <div
        css={dotStyle}
        style={{ background: color, animationDelay: '0ms' }}
      ></div>
      <div
        css={dotStyle}
        style={{ background: color, animationDelay: '100ms' }}
      ></div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

DotLoadingIconComponent.defaultProps = {
  size: 64,
  color: 'black'
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const DotLoadingIcon = React.memo(DotLoadingIconComponent)
