/** @jsxImportSource @emotion/react */

import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { css } from '@emotion/react'
import { BlockFallback } from '../fallback/BlockFallback'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
  &::-webkit-scrollbar {
    width: 0; /* Chrome, Safari */
    height: 0;
  }
`

const containerStyle = ({ length }: { length: number }) => css`
  width: ${100 * length}%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const childrenContainerStyle = css`
  scroll-snap-align: center;
  width: 100%;
  flex-basis: 100%;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface UseCarouselProps {
  children: ReactNode[]
}

// # --------------------------------------------------------------------------------
//
// hooks
//
// # --------------------------------------------------------------------------------

// eslint-disable-next-line react-refresh/only-export-components
export const useCarousel = ({ children }: UseCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)

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
      threshold: 0.5
    }

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetElement = entry.target as HTMLElement
          const index = parseInt(targetElement.dataset.index || '0', 10)
          setCurrentPage(index + 1)
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
  }, [])

  const renderCarousel = () => (
    <div css={wrapperStyle} ref={scrollContainerRef}>
      <div css={containerStyle({ length: children.length })}>
        {children.map((child, index) => (
          <Suspense key={index} fallback={<BlockFallback />}>
            <div css={childrenContainerStyle} data-index={index}>
              {child}
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  )

  return { renderCarousel, prev, next, start, end, currentPage }
}
