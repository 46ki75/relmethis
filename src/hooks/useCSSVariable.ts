'use client'

import { useRef, useEffect } from 'react'

interface CSSVariables {
  [key: string]: string | number
}

export const useCSSVariable = <T extends HTMLElement = HTMLDivElement>(
  initialVariables: CSSVariables
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      Object.entries(initialVariables).forEach(([key, value]) => {
        if (element.style.getPropertyValue(key) !== String(value)) {
          element.style.setProperty(key, String(value))
        }
      })
    }
  }, [initialVariables])

  return { ref }
}
