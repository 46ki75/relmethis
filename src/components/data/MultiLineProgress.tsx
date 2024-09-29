'use client'

import React, { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

import styles from './MultiLineProgress.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'
import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MultiLineProgressProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * **optional** default: 6
   *
   * Specify the thickness of the progress bar in pixels.
   */
  weight: number
  /**
   * **optional** default: 'rgb(22, 22, 22)'
   *
   * The color specified here refers to the color of
   * the loading animation progress bar.
   * When specifying the color of the bar,
   * please use the color attribute of the data array.
   */
  color: string
  /**
   * **optional** default: false
   *
   * Boolean value indicating whether it is in the process of loading.
   * During loading, the progress bar animates.
   */
  isLoading?: boolean
  /**
   * **required**
   *
   * This data consists of an array of objects.
   * - `label`: Label used for data display. It must be unique.
   * - `value`: Value used for data display.
   *            It doesn't have to add up to exactly 100.
   *            The display ratio is determined based on the values of all arrays.
   * - `color`: Color used for data display.
   */
  data: Array<{
    /**
     * It must be unique.
     */
    label: string
    /**
     * It doesn't have to add up to exactly 100.
     */
    value: number
    color: string
  }>
  /**
   * **optional** default: undefined
   *
   * The unit displayed after the numerical value of the indicator.
   */
  unit?: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MultiLineProgressComponent = ({
  isDark = false,
  weight = 6,
  color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  isLoading = false,
  data,
  unit
}: MultiLineProgressProps) => {
  const { ref: a, inView } = useInView()

  const { ref: b } = useCSSVariable({
    '--react-weight': `${weight}px`,
    '--react-color': isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
    '--react-background-color': isDark
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(0,0,0,0.15)',
    '--react-loading-color': color,
    '--react-loading-opacity': isLoading ? 1 : 0,
    '--react-not-loading-opacity': isLoading ? 0 : 1
  })

  const ref = useMergeRefs(a, b)

  const SUM_VALUE = data.reduce((sum, d) => sum + d.value, 0)

  const render = () => {
    const nodes: ReactNode[] = []
    let prevPercent = 0

    for (const d of data) {
      const currentPercent = (d.value / SUM_VALUE) * 100

      nodes.push(
        <div
          className={styles.progress}
          style={{
            backgroundColor: d.color,
            transform:
              `translateX(${inView ? prevPercent : 0}%)` +
              ' ' +
              `scaleX(${inView ? currentPercent : 0}%)`
          }}
        ></div>
      )

      prevPercent = prevPercent + currentPercent
    }

    return nodes
  }

  const renderLabel = () => {
    if (unit != null) {
      return data.map((d) => (
        <div>
          <div
            className={styles.marker}
            style={{ backgroundColor: d.color }}
          ></div>
          <span className={styles.value}>{`${d.value} [${unit}]`}</span>
        </div>
      ))
    } else {
      return data.map((d) => (
        <div>
          <div className={styles.marker}></div>
          <span className={styles.value}>{d.value}</span>
        </div>
      ))
    }
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles['progress-wrapper']}>
        {render()}
        <div className={styles.loading}></div>
      </div>
      <div className={styles.label}>{renderLabel()}</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const MultiLineProgress = React.memo(MultiLineProgressComponent, isEqual)
