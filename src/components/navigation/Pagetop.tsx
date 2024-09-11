import { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'
import React from 'react'
import { createPortal } from 'react-dom'
import { darken, lighten } from 'polished'

import isEqual from 'react-fast-compare'

// scss modules
import styles from './Pagetop.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface PagetopProps {
  position?: 'left' | 'right'

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const PagetopComponent = ({
  position = 'right',
  isDark = false
}: PagetopProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true)
  const { y } = useWindowScroll()

  useEffect(() => {
    setIsVisible(y > 100)
  }, [y])

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { ref } = useCSSVariable({
    '--react-color-fg': isDark ? lighten(0.7, 'black') : darken(0.7, 'white'),
    '--react-position-left': position === 'left' ? '8px' : 'auto',
    '--react-position-right': position === 'right' ? '8px' : 'auto',
    '--react-position-opacity': isVisible ? 1 : 0
  })

  return createPortal(
    <>
      <nav
        ref={ref}
        onClick={toTop}
        className={classNames(styles.wrapper, {
          [styles['react-is-visible']]: isVisible
        })}
      >
        <div></div>
        <div></div>
        <div></div>

        <span>Back to Top</span>
      </nav>
    </>,
    document.body
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Pagetop = React.memo(PagetopComponent, isEqual)
