import { useState, useEffect } from 'react'

export interface State {
  x: number
  y: number
}

export const useWindowScroll = (): State => {
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
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}
