/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { useCarousel, UseCarouselProps } from './useCarousel'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/20/solid'
import { css } from '@emotion/react'
import { BarPagination } from '../navigation/BarPagination'

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
    transform: scale(1.5);
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

export interface CarouselProps extends UseCarouselProps {
  children: ReactNode[]
  /**
   * - `true`: The container size automatically adjusts to the size of the displayed page
   * - `false`: The container size is fixed to the largest size
   */
  autoResize?: boolean
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Whether to display indicators showing the current position
   */
  bar?: boolean
  /**
   * Whether to display controls at the bottom of the carousel
   */
  control?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CarouselComponent = ({
  children,
  autoResize,
  isDark = false,
  bar = true,
  control = true
}: CarouselProps) => {
  const { currentPage, scrollToPage, end, next, prev, start, renderCarousel } =
    useCarousel({
      children,
      autoResize
    })

  const renderIndicator = () => (
    <div css={controlIndicatorStyle({ isDark })}>
      {children.length <= 8 ? (
        new Array(children.length).fill(null).map((_, index) => (
          <span
            css={dot({ isDark, isActive: index + 1 === currentPage })}
            onClick={() => {
              scrollToPage(index + 1)
            }}
          ></span>
        ))
      ) : (
        <>
          <span>{currentPage}</span>
          <sub>/</sub>
          <sub>{children.length}</sub>
        </>
      )}
    </div>
  )

  return (
    <>
      {bar && (
        <BarPagination
          length={children.length}
          isDark={isDark}
          active={currentPage - 1}
          onBarClick={(index) => {
            scrollToPage(index + 1)
          }}
        />
      )}
      {renderCarousel()}
      {control && (
        <div css={controlContainere}>
          <ChevronDoubleLeftIcon css={iconStyle({ isDark })} onClick={start} />
          <ChevronLeftIcon css={iconStyle({ isDark })} onClick={prev} />
          {renderIndicator()}
          <ChevronRightIcon css={iconStyle({ isDark })} onClick={next} />
          <ChevronDoubleRightIcon css={iconStyle({ isDark })} onClick={end} />
        </div>
      )}
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Carousel = React.memo(CarouselComponent)
