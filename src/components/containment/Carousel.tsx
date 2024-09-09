/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { useCarousel, UseCarouselProps } from './useCarousel'
import { BarPagination } from '../navigation/BarPagination'
import { DotPagination } from '../navigation/DotPagination'

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
  const { currentPage, setCurrentPage, render } = useCarousel({
    children,
    autoResize
  })

  return (
    <>
      {bar && (
        <BarPagination
          length={children.length}
          isDark={isDark}
          active={currentPage - 1}
          onBarClick={(index) => {
            setCurrentPage(index + 1)
          }}
        />
      )}
      {render()}
      {control && (
        <DotPagination
          isDark={isDark}
          setCurrentPaget={setCurrentPage}
          currentPage={currentPage}
          length={children.length}
        />
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
