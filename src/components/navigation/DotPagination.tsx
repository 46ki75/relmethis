/** @jsxImportSource @emotion/react */

import React from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/20/solid'
import { css } from '@emotion/react'
import { isEqual } from 'lodash'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const controlContainere = css`
  margin-block: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const iconStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  padding: 0.25rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 200ms,
    color 200ms;

  &:hover {
    background-color: rgba(128, 128, 128, 0.25);
    color: #6987b8;
  }

  &:active {
    color: #59b57c;
  }
`

const controlIndicatorStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
`

const dot = ({
  isDark,
  isActive
}: {
  isDark: boolean
  isActive: boolean
}) => css`
  background-color: ${isDark
    ? 'rgba(255, 255, 255, 0.7)'
    : 'rgba(0, 0, 0, 0.7)'};
  opacity: ${isActive ? 0.9 : 0.2};
  width: ${isActive ? 16 : 10}px;
  height: ${isActive ? 16 : 10}px;
  border-radius: 50%;

  cursor: pointer;

  transition:
    width 400ms,
    height 400ms,
    opacity 400ms,
    transform 200ms;

  position: relative;

  &:hover {
    transform: scale(1.2);
    background-color: #6987b8;
    opacity: 1;
  }

  &:active {
    background-color: #59b57c;
    opacity: 1;
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface DotPaginationProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * The current page. Provide a reactive value. `page` starts from 1.
   */
  currentPage: number
  /**
   * A function to navigate to the specified `page`. `page` starts from 1.
   * @param page The page to navigate to
   * @returns {void}
   */
  setCurrentPaget: (page: number) => void
  /**
   * The total number of pages
   */
  length: number
  /**
   * For lengths exceeding this number, the pagination design will change from dots to numbers.
   * Default value is `8`.
   */
  threshold?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const DotPaginationComponent = ({
  isDark = false,
  currentPage,
  length,
  setCurrentPaget,
  threshold = 8
}: DotPaginationProps) => {
  const renderDotIndicator = () =>
    new Array(length).fill(null).map((_, index) => (
      <span
        css={dot({ isDark, isActive: index + 1 === currentPage })}
        onClick={() => {
          setCurrentPaget(index + 1)
        }}
      ></span>
    ))

  const renderNumberIndicator = () => (
    <>
      <span>{currentPage}</span>
      <sub>/</sub>
      <sub>{length}</sub>
    </>
  )

  const end = () => setCurrentPaget(length)
  const start = () => setCurrentPaget(1)
  const prev = () => {
    if (currentPage >= 2) {
      setCurrentPaget(currentPage - 1)
    }
  }
  const next = () => {
    if (currentPage < length) {
      setCurrentPaget(currentPage + 1)
    }
  }

  return (
    <div css={controlContainere}>
      <ChevronDoubleLeftIcon css={iconStyle({ isDark })} onClick={start} />
      <ChevronLeftIcon css={iconStyle({ isDark })} onClick={prev} />

      <div css={controlIndicatorStyle({ isDark })}>
        {length <= threshold ? renderDotIndicator() : renderNumberIndicator()}
      </div>

      <ChevronRightIcon css={iconStyle({ isDark })} onClick={next} />
      <ChevronDoubleRightIcon css={iconStyle({ isDark })} onClick={end} />
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const DotPagination = React.memo(DotPaginationComponent, (p, n) =>
  isEqual(p, n)
)
