'use client'

import React, { useEffect, useState } from 'react'

// scss modules
import styles from './Pagetop.module.scss'

import { darken, lighten } from 'polished'
import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import clsx from 'clsx'
import { useWindowScroll } from '../../hooks/useWindowScroll'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface PagetopProps {
  /**
   * Displayed on the bottom left or bottom right
   */
  position?: 'left' | 'right'

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  /**
   * The height and width size. Default is 64[px]
   */
  size?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const PagetopComponent = ({
  position = 'right',
  isDark = false,
  size = 64
}: PagetopProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true)
  const { y } = useWindowScroll({ throttle: 500 })

  useEffect(() => {
    setIsVisible(y > 100)
  }, [y])

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { ref } = useCSSVariable({
    '--react-color-fg': isDark ? lighten(0.7, 'black') : darken(0.7, 'white'),
    '--react-position-left': position === 'left' ? '0' : 'auto',
    '--react-position-right': position === 'right' ? '0' : 'auto',
    '--react-position-opacity': isVisible ? 1 : 0,
    '--react-size': `${size}px`,
    '--react-chevron-height': `${size / 4}px`,
    '--react-font-size': `${size / 6}px`
  })

  return (
    <nav
      ref={ref}
      onClick={toTop}
      className={clsx(styles.wrapper, {
        [styles['react-is-visible']]: isVisible
      })}
    >
      <div></div>
      <div></div>
      <div></div>

      <span>Back to Top</span>
    </nav>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Pagetop = React.memo(PagetopComponent, isEqual)
