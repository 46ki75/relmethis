import React, { ReactNode, Suspense, useState } from 'react'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BlockFallback } from '../fallback/BlockFallback'

import isEqual from 'react-fast-compare'

import styles from './Toggle.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ToggleProps {
  children: ReactNode
  summary: string
}

// # --------------------------------------------------------------------------------
//
// components
//
// # --------------------------------------------------------------------------------

const ToggleComponent = ({ children, summary }: ToggleProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const { ref } = useCSSVariable({
    '--react-border-radius': `0.25rem 0.25rem ${isVisible ? '0rem 0rem' : '0.25rem 0.25rem'}`,
    '--react-icon-trandform': `rotate(${isVisible ? 90 : 0}deg)`,
    '--react-details-opacity': isVisible ? 1 : 0,
    '--react-details-height': isVisible ? '100%' : '0px',
    '--react-details-transform': `scaleY(${isVisible ? 1 : 0})`
  })

  return (
    <div className={styles.wrapper} ref={ref}>
      <div
        className={styles.summary}
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        <ChevronRightIcon className={styles.icon} />
        <span>{summary}</span>
      </div>
      <div className={styles.details}>
        <Suspense fallback={<BlockFallback />}>{children}</Suspense>
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Toggle = React.memo(ToggleComponent, isEqual)
