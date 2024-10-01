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

  useEffect(() => {
    const scrollHandler = options?.throttle
      ? throttle(handleScroll, options.throttle)
      : handleScroll

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      if (options?.throttle) {
        // eslint-disable-next-line no-extra-semi
        ;(scrollHandler as ReturnType<typeof throttle>).cancel()
      }
    }
  }, [options?.throttle])

  return scrollPosition
}
