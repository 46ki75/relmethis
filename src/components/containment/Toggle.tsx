import React, { ReactNode, Suspense, useState } from 'react'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BlockFallback } from '../fallback/BlockFallback'

import isEqual from 'react-fast-compare'

import styles from './Toggle.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import { CSSTransition } from 'react-transition-group'
import { InlineText } from '../inline/InlineText'

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
    '--react-icon-trandform': `rotate(${isVisible ? 90 : 0}deg)`
  })

  return (
    <div className={styles.wrapper} ref={ref}>
      <div
        className={styles['wrapper__summary']}
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        <ChevronRightIcon className={styles['wrapper__summary-icon']} />
        <InlineText text={summary} />
      </div>

      <CSSTransition
        in={isVisible}
        timeout={400}
        classNames={{
          enterActive: styles['wrapper__details--enter-active'],
          enterDone: styles['wrapper__details--enter-done'],
          exitActive: styles['wrapper__details--exit-active']
        }}
        unmountOnExit
      >
        <div className={styles['wrapper__details']}>
          <Suspense fallback={<BlockFallback />}>{children}</Suspense>
        </div>
      </CSSTransition>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Toggle = React.memo(ToggleComponent, isEqual)
