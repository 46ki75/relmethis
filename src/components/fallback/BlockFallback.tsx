/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BlockFallbackProps {
  style?: React.CSSProperties
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BlockFallbackComponent = ({ style }: BlockFallbackProps) => {
  return (
    <div css={wrapperStyle} style={style}>
      <DotLoadingIcon size={32} color='rgba(128,128,128,0.5)' />
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const BlockFallback = React.memo(BlockFallbackComponent, isEqual)
