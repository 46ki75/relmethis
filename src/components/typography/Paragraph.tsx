'use client'

import React, { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './Paragraph.module.scss'
import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ParagraphProps {
  children: ReactNode
  style?: React.CSSProperties
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

const ParagraphComponent = ({
  children,
  style,
  isDark = false
}: ParagraphProps) => {
  const { ref: a, inView } = useInView()
  const { ref: b } = useCSSVariable({
    '--react-color-fg': isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)',
    '--react-color-bg': isDark
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.8)'
  })
  const ref = useMergeRefs(a, b)

  return (
    <p
      style={style}
      className={classNames(styles.paragraph, {
        [styles['paragraph--visible']]: inView
      })}
      ref={ref}
    >
      {children}
    </p>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Paragraph = React.memo(
  ParagraphComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isDark === nextProps.isDark &&
      isEqual(prevProps.style, nextProps.style) &&
      isEqual(prevProps.children, nextProps.children)
    )
  }
)
