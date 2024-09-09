/** @jsxImportSource @emotion/react */

import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { rgba } from 'polished'
import { BarsArrowDownIcon } from '@heroicons/react/16/solid'
import { isEqual } from 'lodash'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  box-sizing: border-box;
  padding-left: 0.25rem;
  border-left: solid 2px rgba(128, 128, 128, 0.2);
`

const headingStyle = ({
  level,
  isDark,
  inSection,
  fontSizeRatio
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6
  isDark: boolean
  inSection: boolean
  fontSizeRatio: number
}) => css`
  all: unset;
  color: ${inSection
    ? '#6987b8'
    : rgba(isDark ? 'white' : 'black', 0.83 - level * 0.02)};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  font-size: ${(1.2 - level * 0.03) * fontSizeRatio}rem;
  padding: 0.25rem;
  padding-left: ${1.25 * (level - 1)}rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 300ms;

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    transition: border 400ms;
    border-left: solid 4px ${inSection ? rgba('#6987b8', 0.8) : 'transparent'};
  }

  *::selection {
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }

  &:hover {
    background-color: ${rgba('#6987b8', 0.15)};
  }

  sup {
    color: ${rgba(isDark ? 'white' : 'black', 0.4)};
    font-size: 0.75rem;
    margin-inline-start: 0.75rem;
    margin-inline-end: 0.5rem;
  }
`

const iconStyle = css`
  color: #6987b8;
  width: 12px;
  height: 12px;
  margin-inline: 0.5rem;
`

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

  return (
    headings.length > 0 && (
      <nav css={wrapperStyle}>
        {headings.map(
          (heading, index) =>
            heading.level <= maxLevel && (
              <React.Fragment key={`${index}-${heading.level}`}>
                <a
                  css={headingStyle({
                    level: heading.level,
                    isDark,
                    inSection:
                      (heading.identifier ?? heading.text) === activeElementId,
                    fontSizeRatio
                  })}
                  href={`#${heading.identifier ?? heading.text}`}
                >
                  <sup>
                    H<sub>{heading.level}</sub>
                  </sup>
                  <span>
                    {heading.text}
                    <BarsArrowDownIcon css={iconStyle} />
                  </span>
                </a>
              </React.Fragment>
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
