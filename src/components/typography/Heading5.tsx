import React from 'react'

import { FragmentIdentifier } from './FragmentIdentifier'

import isEqual from 'react-fast-compare'

import { useInView } from 'react-intersection-observer'
import { useScrollToHash } from '../../hooks/useScrollToHash'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './Heading5.module.scss'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading5Props {
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

const Heading5Component = ({
  children,
  identifier = children,
  isDark = false,
  locale = 'en-US'
}: Heading5Props) => {
  useScrollToHash(identifier, 400)

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
    <section id={identifier} ref={ref} className={styles.section}>
      <h4
        className={clsx(styles['section__heading'], {
          [styles['section__heading--visible']]: inView
        })}
      >
        {children}
      </h4>
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

export const Heading5 = React.memo(Heading5Component, isEqual)
