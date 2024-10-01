import React, { useCallback, useEffect, useState } from 'react'
import { BarsArrowDownIcon } from '@heroicons/react/16/solid'
import isEqual from 'react-fast-compare'

import styles from './TableOfContents.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TableOfContentsProps {
  /**
   * Whether to apply the dark theme
   */
  isDark?: boolean
  fontSizeRatio?: number
  maxLevel?: 1 | 2 | 3 | 4 | 5 | 6
  headings: Array<{
    /**
     * The text content to be displayed
     */
    text: string
    /**
     * The level of the heading
     */
    level: 1 | 2 | 3 | 4 | 5 | 6
    /**
     * A page link specified by the FragmentIdentifier.
     * This should be the id attribute of the corresponding heading.
     * If not specified, the `text` will be used.
     */
    identifier?: string
  }>
}
// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const TableOfContentsComponent = ({
  isDark = false,
  fontSizeRatio = 1,
  maxLevel = 6,
  headings
}: TableOfContentsProps) => {
  const [activeElementId, setActiveElementId] = useState('')

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          setActiveElementId(entry.target.id)
        }
      })
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    })

    const elements = document.querySelectorAll('section[id]')
    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [handleIntersection])

  const { ref } = useCSSVariable({
    '--react-color-fg': isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)',
    '--react-color-bg': isDark
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    '--react-sup-color-fg': isDark
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(0, 0, 0, 0.4)',
    '--react-sup-color-bg': isDark
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(255, 255, 255, 0.4)',
    '--react-font-size-ratio': fontSizeRatio
  })

  return (
    headings.length > 0 && (
      <nav className={styles.wrapper} ref={ref}>
        {headings.map(
          (heading, index) =>
            heading.level <= maxLevel && (
              <a
                key={`${index}-${heading.identifier}`}
                className={clsx({
                  [styles['in-section']]:
                    (heading.identifier ?? heading.text) === activeElementId,
                  [styles.light]: !isDark,
                  [styles.dark]: isDark,
                  [styles.h1]: heading.level === 1,
                  [styles.h2]: heading.level === 2,
                  [styles.h3]: heading.level === 3,
                  [styles.h4]: heading.level === 4,
                  [styles.h5]: heading.level === 5,
                  [styles.h6]: heading.level === 6
                })}
                href={`#${heading.identifier ?? heading.text}`}
              >
                <sup>
                  H<sub>{heading.level}</sub>
                </sup>
                <span>
                  {heading.text}
                  <BarsArrowDownIcon className={styles.icon} />
                </span>
              </a>
            )
        )}
      </nav>
    )
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const TableOfContents = React.memo(
  TableOfContentsComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isDark === nextProps.isDark &&
      prevProps.fontSizeRatio === nextProps.fontSizeRatio &&
      prevProps.maxLevel === nextProps.maxLevel &&
      isEqual(prevProps.headings, nextProps.headings)
    )
  }
)
