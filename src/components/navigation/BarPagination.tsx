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
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BarPaginationProps {
  pages: Array<{
    isActive?: boolean
    onClick?: React.MouseEventHandler<HTMLSpanElement>
  }>
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

const BarPaginationComponent = ({
  pages,
  isDark = false
}: BarPaginationProps) => {
  return (
    <nav css={wrapperStyle}>
      {pages.map((page) => (
        <div
          css={barStyle({ isDark, isActive: page.isActive ?? false })}
          onClick={page.onClick}
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
