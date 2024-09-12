import React from 'react'
import { FragmentIdentifier } from './FragmentIdentifier'
import { useScrollToHash } from '../../hooks/useScrollToHash'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './Heading3.module.scss'
import { useInView } from 'react-intersection-observer'
import { useMergeRefs } from '../../hooks/useMergeRefs'
import classNames from 'classnames'

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

export interface Heading3Props {
  /**
   * The text to be displayed
   */
  text: string
  /**
   * The ID to be assigned to the tag. Defaults to the value of `text` if not provided
   */
  identifier?: string
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

export const Heading3Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading3Props) => {
  useScrollToHash(identifier, 300)

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
    <section className={styles.section} id={identifier} ref={ref}>
      <h3
        className={classNames(styles['section__heading'], {
          [styles['section__heading--visible']]: inView
        })}
      >
        {text}
      </h3>
      <FragmentIdentifier identifier={identifier} isDark={isDark} />
    </section>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading3 = React.memo(Heading3Component, isEqual)
