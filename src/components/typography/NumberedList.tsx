import React, { ReactNode } from 'react'

import { useInView } from 'react-intersection-observer'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './NumberedList.module.scss'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface NumberedListProps {
  children: ReactNode
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

const NumberedListComponent: React.FC<NumberedListProps> = ({
  children,
  isDark = false
}) => {
  const { ref: a, inView } = useInView()
  const { ref: b } = useCSSVariable({
    '--react-color-fg': isDark
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.7)',
    '--react-color-bg': isDark
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(255, 255, 255, 0.7)'
  })
  const ref = useMergeRefs(a, b)

  return (
    <ol
      className={clsx(styles['numberedlist'], {
        [styles['numberedlist--visible']]: inView
      })}
      ref={ref}
    >
      {React.Children.map(children, (child, index) => (
        <li key={index} className={styles['numberedlist__item']}>
          {child}
        </li>
      ))}
    </ol>
  )
}
// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const NumberedList = React.memo(NumberedListComponent, isEqual)
