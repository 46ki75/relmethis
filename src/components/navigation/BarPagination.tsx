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
  padding: 8px 0;

  opacity: ${isActive ? 1 : 0.2};
  cursor: pointer;

  border-top: solid 4px
    ${isDark ? `rgba(255, 255, 255, 0.7)` : 'rgba(0, 0, 0, 0.7)'};

  transition:
    border-top-color 400ms,
    opacity 400ms;

  position: relative;

  &:hover {
    border-top-color: #6987b8;
    opacity: 1;
  }

  &:active {
    border-top-color: #59b57c;
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
