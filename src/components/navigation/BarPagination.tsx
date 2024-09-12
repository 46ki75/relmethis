import React from 'react'

import isEqual from 'react-fast-compare'

import styles from './BarPagination.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

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
  setCurrentPage
}: BarPaginationProps) => {
  const { ref } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
  })

  return (
    <nav className={styles.wrapper} ref={ref}>
      {new Array(length).fill(null).map((_, index) => (
        <div
          key={index}
          className={currentPage === index + 1 ? styles['current-page'] : ''}
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
