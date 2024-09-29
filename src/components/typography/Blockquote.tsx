'use client'

import React, { ReactNode } from 'react'
import { LinkIcon } from '@heroicons/react/16/solid'
import { useInView } from 'react-intersection-observer'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './Blockquote.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BlockquoteProps {
  children: ReactNode
  /**
   * The URL of the source being quoted
   */
  cite?: string
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

const BlockquoteComponent = ({
  children,
  cite,
  isDark = false
}: BlockquoteProps) => {
  const { ref: a, inView } = useInView()

  const { ref: b } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    '--react-opacity': inView ? 1 : 0
  })

  const ref = useMergeRefs(a, b)

  return (
    <blockquote cite={cite} ref={ref} className={styles.wrapper}>
      <div className={styles.children}>{children}</div>
      {cite != null && (
        <div className={styles.cite}>
          <LinkIcon />
          <a href={cite} target='_blank' rel='noreferrer noopener'>
            {cite}
          </a>
        </div>
      )}
    </blockquote>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Blockquote = React.memo(BlockquoteComponent, isEqual)
