import { useEffect } from 'react'

/**
 * Custom Hook: Scrolls to an element based on the page's fragment identifier (hash).
 *
 * @param identifier - The ID assigned to the target element to scroll to.
 *                     Compared with `window.location.hash`, and if it matches the identifier, it scrolls to that element.
 * @param delay - Optional delay time for the scroll action (in milliseconds). Default is 200ms.
 *                This is used if `requestIdleCallback` is not supported.
 *
 * This hook triggers when the page loads or when the `identifier` changes,
 * smoothly scrolling to the element that matches the current URL's fragment identifier.
 * If the browser is idle, it uses `requestIdleCallback` for scrolling.
 */
export const useScrollToHash = (identifier: string, delay?: number) => {
  useEffect(() => {
    const scrollWhenIdle = () => {
      const hash = window.location.hash
      if (hash && hash.substring(1) === identifier) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(scrollWhenIdle)
    } else {
      setTimeout(scrollWhenIdle, delay ?? 200)
    }
  }, [delay, identifier])
}
