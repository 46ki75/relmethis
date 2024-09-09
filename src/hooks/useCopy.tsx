import { useState, useEffect, useCallback } from 'react'

/**
 *
 * @param delay default: `3000` [ms]
 * @returns
 */
export const useCopy = (
  delay?: number
): {
  isCopied: boolean
  copy: (text: string) => void
} => {
  const [isCopied, setCopied] = useState(false)

  const copy = useCallback((text: string) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API is not available')
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.error('Failed to copy text:', error))
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, delay ?? 3000)

      return () => clearTimeout(timer)
    }
  }, [delay, isCopied])

  return { isCopied, copy }
}
