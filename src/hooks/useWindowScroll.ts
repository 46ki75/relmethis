import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

export interface State {
  x: number
  y: number
}

export const useWindowScroll = (options?: { throttle?: number }): State => {
  const [scrollPosition, setScrollPosition] = useState<State>({
    x: window.scrollX,
    y: window.scrollY
  })

  const handleScroll = () => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY
    })
  }

  const throttledHandleScroll = options?.throttle
    ? throttle(handleScroll, options.throttle)
    : null

  useEffect(() => {
    const scrollHandler = throttledHandleScroll || handleScroll
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
      if (throttledHandleScroll) {
        throttledHandleScroll.cancel()
      }
    }
  }, [throttledHandleScroll])

  return scrollPosition
}
