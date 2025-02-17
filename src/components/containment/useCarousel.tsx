import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { BlockFallback } from '../fallback/BlockFallback'

import styles from './useCarousel.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface UseCarouselProps {
  children: ReactNode[]
  /**
   * - `true`: The container size automatically adjusts to the size of the displayed page
   * - `false`: The container size is fixed to the largest size
   */
  autoResize?: boolean
}

// # --------------------------------------------------------------------------------
//
// hooks
//
// # --------------------------------------------------------------------------------

// eslint-disable-next-line react-refresh/only-export-components
export const useCarousel = ({
  children,
  autoResize = true
}: UseCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentHeight, setCurrentHeight] = useState<number | null>(null)
  const [currentWidth, setCurrentWidth] = useState<number | '100%'>('100%')
  const childRefs = useRef<(HTMLDivElement | null)[]>([])

  const start = useCallback(() => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
  }, [])

  const end = useCallback(() => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: 'smooth'
      })
  }, [])

  const next = useCallback(() => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft
      const containerWidth = scrollContainerRef.current.clientWidth

      scrollContainerRef.current.scrollTo({
        left: currentScroll + containerWidth,
        behavior: 'smooth'
      })
    }
  }, [])

  const prev = useCallback(() => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft
      const containerWidth = scrollContainerRef.current.clientWidth

      scrollContainerRef.current.scrollTo({
        left: currentScroll - containerWidth,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollToPage = useCallback((page: number) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth

      scrollContainerRef.current.scrollTo({
        left: containerWidth * (page - 1),
        behavior: 'smooth'
      })
    }
  }, [])

  // # --------------------------------------------------------------------------------
  //
  // side effects
  //
  // # --------------------------------------------------------------------------------

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const options = {
      root: scrollContainer,
      rootMargin: '0px',
      threshold: 0.1
    }

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetElement = entry.target as HTMLElement
          const index = parseInt(targetElement.dataset.index || '0', 10)
          setCurrentPage(index + 1)

          if (autoResize) {
            const height = targetElement.offsetHeight
            setCurrentHeight(height)
            const width = targetElement.offsetWidth
            setCurrentWidth(width)
          } else {
            setCurrentHeight(null)
            setCurrentWidth('100%')
          }
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    const childElements = scrollContainer.querySelectorAll('[data-index]')
    childElements.forEach((child) => {
      observer.observe(child)
    })

    return () => {
      childElements.forEach((child) => {
        observer.unobserve(child)
      })
    }
  }, [autoResize])

  useEffect(() => {
    const currentRefs = childRefs.current
    const resizeObservers: ResizeObserver[] = []

    currentRefs.forEach((ref, index) => {
      if (ref) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (index + 1 === currentPage && autoResize) {
              setCurrentHeight(entry.contentRect.height)
              setCurrentWidth(entry.contentRect.width)
            }
          }
        })
        observer.observe(ref)
        resizeObservers.push(observer)
      }
    })

    return () => {
      resizeObservers.forEach((observer, index) => {
        if (currentRefs[index]) {
          observer.unobserve(currentRefs[index]!)
        }
      })
    }
  }, [currentPage, autoResize])

  const { ref: cssVariableRef } = useCSSVariable({
    '--react-height': currentHeight != null ? `${currentHeight}px` : 'auto',
    '--react-width': `${100 * children.length}%`
  })

  const ref = useMergeRefs(scrollContainerRef, cssVariableRef)

  const render = () => (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles['carousel-container']}>
        {children.map((child, index) => (
          <Suspense key={index} fallback={<BlockFallback />}>
            <div
              className={styles['children-container']}
              data-index={index}
              ref={(el) => (childRefs.current[index] = el)}
              style={{ width: currentWidth }}
            >
              {child}
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  )

  return {
    render,
    prev,
    next,
    start,
    end,
    currentPage,
    setCurrentPage: scrollToPage
  }
}
