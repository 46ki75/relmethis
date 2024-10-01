import { useEffect, useState } from 'react'

export const useInViewById = (elementId: string) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = document.getElementById(elementId)
    if (!element) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting)
      })
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementId])

  return isInView
}
