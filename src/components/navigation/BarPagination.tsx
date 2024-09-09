/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  width: 100%;
  display: flex;
  gap: 2px;
`

const barStyle = ({
  isDark,
  isActive
}: {
  isDark: boolean
  isActive: boolean
}) => css`
  width: 100%;
  height: 24px;

  opacity: ${isActive ? 1 : 0.2};
  cursor: pointer;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0% 40%,
    ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} 40% 60%,
    rgba(0, 0, 0, 0) 60% 100%
  );

  transition: opacity 400ms;

  &:hover {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0% 40%,
      ${isActive ? '' : '#6987b8'} 40% 60%,
      rgba(0, 0, 0, 0) 60% 100%
    );
    opacity: 1;
  }

  &:active {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0% 40%,
      ${isActive ? '' : '#59b57c'} 40% 60%,
      rgba(0, 0, 0, 0) 60% 100%
    );
    opacity: 1;
  }
` // # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BarPaginationProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Total number of pages
   */
  length: number
  /**
   * The index of the active page, starting from 0
   */
  active: number
  /**
   * Function called when a bar is clicked.
   * @param index The index of the clicked bar, starting from 0
   * @returns {void}
   */
  onBarClick: (index: number) => void
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BarPaginationComponent = ({
  length,
  isDark = false,
  active,
  onBarClick: onClickCallback
}: BarPaginationProps) => {
  return (
    <nav css={wrapperStyle}>
      {new Array(length).fill(null).map((_, index) => (
        <div
          css={barStyle({ isDark, isActive: active === index })}
          onClick={() => {
            onClickCallback(index)
          }}
        ></div>
      ))}
    </nav>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const BarPagination = React.memo(BarPaginationComponent)
