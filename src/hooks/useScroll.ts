import { useState, useEffect, useCallback } from 'react'

export interface ScrollState {
  x: number
  y: number
}

export const useScroll = (
  elementRef: React.RefObject<HTMLElement>
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
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [elementRef, handleScroll])

  return scrollPosition
}
