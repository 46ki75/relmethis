'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import { FragmentIdentifier } from './FragmentIdentifier'
import { useScrollToHash } from '../../hooks/useScrollToHash'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './Heading2.module.scss'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading2Props {
  /**
   * The text to be displayed
   */
  children: string

  /**
   * The ID to be assigned to the tag. Defaults to the value of `text` if not provided
   */
  identifier?: string
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  locale?: 'en-US' | 'ja-JP'
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const Heading2Component = ({
  children,
  identifier = children,
  isDark = false,
  locale = 'en-US'
}: Heading2Props) => {
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

  useScrollToHash(identifier, 200)

  return (
    <section ref={ref} id={identifier} className={styles.section}>
      <div
        className={clsx(styles['section__top'], {
          [styles['section__top--visible']]: inView
        })}
      >
        <div className={styles['section__top-first']}></div>
        <div className={styles['section__top-second']}></div>
      </div>
      <h2
        className={clsx(styles['section__heading'], {
          [styles['section__heading--visible']]: inView
        })}
      >
        {children}
      </h2>
      <div
        className={clsx(styles['section__bottom'], {
          [styles['section__bottom--visible']]: inView
        })}
      ></div>
      <FragmentIdentifier
        identifier={identifier}
        isDark={isDark}
        locale={locale}
      />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading2 = React.memo(Heading2Component, isEqual)
