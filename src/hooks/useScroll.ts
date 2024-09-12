import { useState, useEffect, useCallback } from 'react'
import throttle from 'lodash/throttle'

export interface ScrollState {
  x: number
  y: number
}

export const useScroll = (
  elementRef: React.RefObject<HTMLElement>,
  options?: { throttle?: number }
): ScrollState => {
  const [scrollPosition, setScrollPosition] = useState<ScrollState>({
    x: 0,
    y: 0
  })

  const handleScroll = useCallback(() => {
    if (elementRef.current) {
      setScrollPosition({
        x: elementRef.current.scrollLeft,
        y: elementRef.current.scrollTop
      })
    }
  }, [elementRef])

  useEffect(() => {
    const element = elementRef.current

    // スロットリングされたスクロールハンドラを定義
    const scrollHandler = options?.throttle
      ? throttle(handleScroll, options.throttle)
      : handleScroll

    if (element) {
      element.addEventListener('scroll', scrollHandler)
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', scrollHandler)
      }

      if (options?.throttle) {
        // eslint-disable-next-line no-extra-semi
        ;(scrollHandler as ReturnType<typeof throttle>).cancel()
      }
    }
  }, [elementRef, handleScroll, options?.throttle])

  return scrollPosition
}
