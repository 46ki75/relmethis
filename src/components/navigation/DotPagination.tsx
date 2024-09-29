'use client'

import React from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/20/solid'

import isEqual from 'react-fast-compare'

import styles from './DotPagination.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface DotPaginationProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * The current page. Provide a reactive value. `page` starts from 1.
   */
  currentPage: number
  /**
   * A function to navigate to the specified `page`. `page` starts from 1.
   * @param page The page to navigate to
   * @returns {void}
   */
  setCurrentPage: (page: number) => void
  /**
   * The total number of pages
   */
  length: number
  /**
   * For lengths exceeding this number, the pagination design will change from dots to numbers.
   * Default value is `8`.
   */
  threshold?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const DotPaginationComponent = ({
  isDark = false,
  currentPage,
  length,
  setCurrentPage,
  threshold = 8
}: DotPaginationProps) => {
  const renderDotIndicator = () =>
    new Array(length).fill(null).map((_, index) => (
      <span
        className={classNames(styles.dot, {
          [styles.selected]: index + 1 === currentPage
        })}
        onClick={() => {
          setCurrentPage(index + 1)
        }}
      ></span>
    ))

  const renderNumberIndicator = () => (
    <>
      <span>{currentPage}</span>
      <sub>/</sub>
      <sub>{length}</sub>
    </>
  )

  const end = () => setCurrentPage(length)
  const start = () => setCurrentPage(1)
  const prev = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1)
    }
  }
  const next = () => {
    if (currentPage < length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const { ref } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
  })

  return (
    <nav ref={ref} className={styles.wrapper}>
      <ChevronDoubleLeftIcon
        className={classNames({ [styles.disable]: currentPage === 1 })}
        onClick={start}
      />
      <ChevronLeftIcon
        className={classNames({ [styles.disable]: currentPage === 1 })}
        onClick={prev}
      />

      <div className={styles.indicator}>
        {length <= threshold ? renderDotIndicator() : renderNumberIndicator()}
      </div>

      <ChevronRightIcon
        className={classNames({ [styles.disable]: currentPage === length })}
        onClick={next}
      />
      <ChevronDoubleRightIcon
        className={classNames({ [styles.disable]: currentPage === length })}
        onClick={end}
      />
    </nav>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const DotPagination = React.memo(DotPaginationComponent, (p, n) =>
  isEqual(p, n)
)
