/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'
import { createPortal } from 'react-dom'
import { darken } from 'polished'
import { RectangleWave } from './RectangleWave'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${darken(0.05, 'white')};
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface FullscreenFallbackProps {
  style?: React.CSSProperties
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const FullscreenFallbackComponent = ({ style }: FullscreenFallbackProps) => {
  return createPortal(
    <div css={wrapperStyle} style={style}>
      <RectangleWave color='rgba(128,128,128,0.8)' />
      <DotLoadingIcon size={64} color='rgba(128,128,128,0.8)' />
    </div>,
    document.body
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const FullscreenFallback = React.memo(FullscreenFallbackComponent)
