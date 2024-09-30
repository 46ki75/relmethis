'use client'

import React, { ReactNode, useState } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Tabs.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { getLuminance, rgba } from 'polished'
import clsx from 'clsx'
import { type Property } from 'csstype'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TabsProps {
  style?: React.CSSProperties

  height?: Property.Height

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  color?: string

  tabs: Array<{
    header: ReactNode
    content: ReactNode
  }>
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const TabsComponent = ({
  style,
  height,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  color = '#59b57c',
  tabs
}: TabsProps) => {
  const [page, setPage] = useState(1)

  const { ref } = useCSSVariable({
    '--react-font-color': isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    '--react-font-color-selection':
      getLuminance(color) < 0.5 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    '--react-tab-color-primary': color,
    '--react-tab-color-secondary': rgba(color, 0.2),
    '--react-tab-color-tertiary': rgba(color, 0.1),
    '--react-content-width': `${100 * tabs.length}%`,
    '--react-translate': `translateX(${(-100 * (page - 1)) / tabs.length}%)`,
    '--react-content-height': height?.toString() ?? 'auto'
  })

  return (
    <div ref={ref} className={styles.tabs} style={style}>
      <div className={styles['tabs__header-container']}>
        {tabs.map((tab, index) => (
          <div
            className={clsx(styles['tabs__header'], {
              [styles['tabs__header--selected']]: index + 1 === page
            })}
            onClick={() => {
              setPage(index + 1)
            }}
          >
            {tab.header}
          </div>
        ))}
      </div>
      <div className={styles['tabs__content-container']}>
        {tabs.map((tab) => (
          <div className={styles['tabs__content']}>{tab.content}</div>
        ))}
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Tabs = React.memo(TabsComponent, isEqual)
