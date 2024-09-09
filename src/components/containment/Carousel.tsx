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
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CarouselComponent = ({ children }: CarouselProps) => {
  const { currentPage, end, next, prev, start, renderCarousel } = useCarousel({
    children
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
