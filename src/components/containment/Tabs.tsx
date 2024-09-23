import React, { ReactNode, useState } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Tabs.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { rgba } from 'polished'
import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TabsProps {
  style?: React.CSSProperties

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
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  color = '#59b57c',
  tabs
}: TabsProps) => {
  const [page, setPage] = useState(1)

  const { ref } = useCSSVariable({
    '--react-tab-color-primary': color,
    '--react-tab-color-secondary': rgba(color, 0.2),
    '--react-tab-color-tertiary': rgba(color, 0.1)
  })

  return (
    <div ref={ref} className={styles.tabs} style={style}>
      <div className={styles['tabs__header-container']}>
        {tabs.map((tab, index) => (
          <div
            className={classNames(styles['tabs__header'], {
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
      <div className={styles['tabs__content']}>{tabs[page - 1].content}</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Tabs = React.memo(TabsComponent, isEqual)
