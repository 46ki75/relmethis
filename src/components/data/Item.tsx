'use client'

import React, { ReactNode } from 'react'

import { rgba } from 'polished'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './Item.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ItemProps {
  children: ReactNode
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  cooldown?: number
  progress?: number
  stackCount?: number
  focus?: boolean
  isLoading?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ItemComponent = ({
  children,
  isDark = false,
  cooldown = 0,
  progress = 0,
  stackCount = 0,
  focus = false,
  isLoading = false
}: ItemProps) => {
  const { ref } = useCSSVariable({
    '--react-border-color': rgba(
      isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
      focus ? 0.5 : 0.2
    ),
    '--react-cooldown': `scaleY(${cooldown}%)`,
    '--react-progress': `scaleX(${progress}%)`
  })

  return (
    <>
      <div ref={ref} className={styles.wrapper}>
        {isLoading ? (
          <>
            <DotLoadingIcon size={32} color='rgb(128,128,128)' />
          </>
        ) : (
          <>
            {children}
            {progress > 0 && (
              <div className={styles['progress-container']}>
                <div className={styles.progress}></div>
              </div>
            )}

            {stackCount > 0 && (
              <div className={styles['stack-count']}>{stackCount}</div>
            )}
          </>
        )}
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Item = React.memo(ItemComponent, isEqual)
