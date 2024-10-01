import React from 'react'

import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './InlineLink.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface InlineLinkProps {
  /**
   * The text to be displayed
   */
  children: string
  /**
   * The URL to which the link points. Links within the same domain will open in the same tab,
   * while links to different domains will open in a new tab.
   */
  href: string
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

const InlineLinkComponent = ({
  children,
  href,
  isDark = false
}: InlineLinkProps) => {
  const currentHost = window.location.hostname
  const linkUrl = new URL(href, window.location.href)
  const isExternal = linkUrl.hostname !== currentHost

  const { ref } = useCSSVariable<HTMLAnchorElement>({
    '--react-color-fg': isDark
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    '--react-color-bg': isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'
  })

  return (
    <a
      className={styles.wrapper}
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span>{children}</span>
      {isExternal ? <ArrowTopRightOnSquareIcon /> : <ChevronRightIcon />}
    </a>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineLink = React.memo(InlineLinkComponent, isEqual)
