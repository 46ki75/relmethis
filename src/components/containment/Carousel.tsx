/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { useCarousel, UseCarouselProps } from './useCarousel'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/16/solid'
import { css } from '@emotion/react'

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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 200ms;

  &:hover {
    background-color: rgba(128, 128, 128, 0.25);
  }
`
const controlIndicatorStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
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
  opacity: ${isActive ? 0.8 : 0.3};
  width: ${isActive ? 10 : 6}px;
  height: ${isActive ? 10 : 6}px;
  border-radius: 50%;
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
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CarouselComponent = ({
  children,
  autoResize,
  isDark = false
}: CarouselProps) => {
  const { currentPage, scrollToPage, end, next, prev, start, renderCarousel } =
    useCarousel({
      children,
      autoResize
    })

  return (
    <>
      {renderCarousel()}
      <div css={controlContainere}>
        <ChevronDoubleLeftIcon css={iconStyle({ isDark })} onClick={start} />
        <ChevronLeftIcon css={iconStyle({ isDark })} onClick={prev} />
        <div css={controlIndicatorStyle({ isDark })}>
          <span>{currentPage}</span>
          <span>/</span>
          <span>{children.length}</span>
          <span
            css={dot({ isDark, isActive: false })}
            onClick={() => {
              scrollToPage(2)
            }}
          ></span>
          <span css={dot({ isDark, isActive: false })}></span>
          <span css={dot({ isDark, isActive: true })}></span>
          <span css={dot({ isDark, isActive: false })}></span>
        </div>
        <ChevronRightIcon css={iconStyle({ isDark })} onClick={next} />
        <ChevronDoubleRightIcon css={iconStyle({ isDark })} onClick={end} />
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Carousel = React.memo(CarouselComponent)
