import React from 'react'

import { FragmentIdentifier } from './FragmentIdentifier'
import { useScrollToHash } from '../../hooks/useScrollToHash'

import isEqual from 'react-fast-compare'

import styles from './Heading1.module.scss'
import clsx from 'clsx'
import { useInViewById } from '../../hooks/useInViewById'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading1Props {
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

export const Heading1Component = ({
  children,
  identifier = children,
  isDark = false,
  locale = 'en-US'
}: Heading1Props) => {
  useScrollToHash(identifier, 100)

  const isInView = useInViewById(identifier)

  return (
    <section id={identifier} className={styles.section}>
      <h1
        className={clsx(styles['section__heading'], {
          [styles['section__heading--visible']]: isInView,
          [styles['section__heading--light']]: !isDark,
          [styles['section__heading--dark']]: isDark
        })}
      >
        {children}
      </h1>
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

export const Heading1 = React.memo(Heading1Component, isEqual)
