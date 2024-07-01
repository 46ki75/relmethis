/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React from 'react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wave = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  30% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
`

const style = (color: string) => css`
  position: absolute;

  width: 100%;
  height: 100%;

  border: solid 1px ${color};

  animation-name: ${wave};
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface RectangleWaveProps {
  /**
   * **optional**
   */
  color: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const RectangleWaveComponent = ({ color }: RectangleWaveProps): JSX.Element => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 400 }}>
      <div css={style(color)}></div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

RectangleWaveComponent.defaultProps = {
  color: 'rgb(0, 0, 0)'
}

export const RectangleWave = React.memo(RectangleWaveComponent)
