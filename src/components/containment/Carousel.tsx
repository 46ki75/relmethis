/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { useCarousel } from './useCarousel'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface CarouselProps {
  children: ReactNode[]
  /**
   * - `true`: The container size automatically adjusts to the size of the displayed page
   * - `false`: The container size is fixed to the largest size
   */
  autoResize?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CarouselComponent = ({ children, autoResize }: CarouselProps) => {
  const { currentPage, end, next, prev, start, renderCarousel } = useCarousel({
    children,
    autoResize
  })

  return (
    <>
      {renderCarousel()}
      <button onClick={start}>START</button>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <button onClick={end}>END</button>
      <div>
        現在のページ: {currentPage} / {children.length}
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
