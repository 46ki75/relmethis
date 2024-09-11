import React from 'react'
import { useInView } from 'react-intersection-observer'
import isEqual from 'react-fast-compare'

import styles from './LineProgress.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface LineProgressProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * **optional** default: 6
   *
   * Specify the thickness of the progress bar in pixels.
   */
  weight?: number
  /**
   * **optional** default: 'rgb(22, 22, 22)'
   *
   * Specify the color of the progress bar.
   * The color of the buffer will be calculated and diluted.
   */
  color?: string
  /**
   * **requred**
   *
   * The progress of the progress bar is represented in percentage.
   */
  percent: number
  /**
   * **optional** default: false
   *
   * Boolean value indicating whether it is in the process of loading.
   * During loading, the progress bar animates.
   */
  isLoading?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const LineProgressComponent = ({
  isDark = false,
  weight = 6,
  color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  percent,
  isLoading = false
}: LineProgressProps) => {
  const { ref: a, inView } = useInView({
    threshold: 0
  })

  const { ref: b } = useCSSVariable({
    '--react-weight': `${weight}px`,
    '--react-percent': `scaleX(${inView && !isLoading ? percent : 0}%)`,
    '--react-color': color,
    '--react-opacity': isLoading ? 1 : 0,
    '--react-transition-duration': `${isLoading ? 400 : 1600}ms`
  })

  const ref = useMergeRefs(a, b)

  return (
    <>
      <div
        className={styles.wrapper}
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        ref={ref}
      >
        <div className={styles.progress}></div>

        <div className={styles.buffer}></div>

        <div className={styles.loading}></div>
      </div>
      <progress max={100} value={percent} style={{ display: 'none' }} />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const LineProgress = React.memo(LineProgressComponent, isEqual)
