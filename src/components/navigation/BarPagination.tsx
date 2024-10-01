import React from 'react'

import isEqual from 'react-fast-compare'

import styles from './BarPagination.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BarPaginationProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Total number of pages
   */
  length: number
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
   * Thickness of the indicator
   */
  weight?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BarPaginationComponent = ({
  length,
  isDark = false,
  currentPage,
  setCurrentPage,
  weight = 8
}: BarPaginationProps) => {
  const { ref } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    '--react-bar-weight': weight + 'px'
  })

  return (
    <nav className={styles['bar-paginarion']} ref={ref}>
      {new Array(length).fill(null).map((_, index) => (
        <div
          key={index}
          className={clsx(styles['bar-paginarion__bar'], {
            [styles['bar-paginarion__bar--active']]: currentPage === index + 1
          })}
          onClick={() => {
            setCurrentPage(index + 1)
          }}
        ></div>
      ))}
    </nav>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const BarPagination = React.memo(BarPaginationComponent, isEqual)
