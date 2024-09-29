'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'

import isEqual from 'react-fast-compare'

import styles from './Divider.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'
import classNames from 'classnames'
import { rgba } from 'polished'

// # --------------------------------------------------------------------------------
//
// Props Interface
//
// # --------------------------------------------------------------------------------

interface DividerProps {
  /**
   * **optional?**
   *
   * If no text is input, a simple horizontal line will be drawn.
   * If text is input, it will be inserted in the middle of the horizontal line.
   *
   */
  text?: string
  /**
   * **optional?**
   *
   * Specify the color in a string.
   *
   * E.G.) `'#000000'`, `'rgb(0, 0, 0)'`
   *
   */
  color?: string
}

// # --------------------------------------------------------------------------------
//
// Component
//
// # --------------------------------------------------------------------------------

const DividerComponent = ({
  text,
  color = rgba(128, 128, 128, 0.5)
}: DividerProps): JSX.Element => {
  const { ref: a, inView } = useInView()
  const { ref: b } = useCSSVariable({
    '--react-color': color,
    '--react-transform': `scaleX(${inView ? 1 : 0})`
  })
  const ref = useMergeRefs(a, b)

  return (
    <div className={styles.wrapper} ref={ref}>
      {text != null ? (
        <div className={styles['with-text-container']}>
          <div
            className={classNames(
              styles['with-text'],
              styles['with-text-left']
            )}
          >
            <div className={classNames(styles.dot, styles.left)}></div>
            <div className={classNames(styles.dot, styles.right)}></div>
          </div>
          <div>{text}</div>
          <div
            className={classNames(
              styles['with-text'],
              styles['with-text-right']
            )}
          >
            <div className={classNames(styles.dot, styles.left)}></div>
            <div className={classNames(styles.dot, styles.right)}></div>
          </div>
        </div>
      ) : (
        <div className={styles.simple}>
          <div className={classNames(styles.dot, styles.left)}></div>
          <div className={classNames(styles.dot, styles.right)}></div>
        </div>
      )}
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const Divider = React.memo(DividerComponent, isEqual)
