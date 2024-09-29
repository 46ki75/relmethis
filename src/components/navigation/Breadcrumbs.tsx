'use client'

import React, { ReactNode, useMemo } from 'react'

import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  DocumentIcon,
  FolderOpenIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { useInView } from 'react-intersection-observer'

import isEqual from 'react-fast-compare'

import type { Property } from 'csstype'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './Breadcrumbs.module.scss'

// # --------------------------------------------------------------------------------
//
// utils
//
// # --------------------------------------------------------------------------------

const isExternal = (href: string) => {
  const currentHost = window.location.hostname
  const linkUrl = new URL(href, window.location.href)
  const isExternal = linkUrl.hostname !== currentHost
  return isExternal
}

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BreadcrumbsProps {
  style?: React.CSSProperties
  /**
   * Array of link information
   */
  links: Array<{
    /**
     * Text to be displayed
     */
    label: string
    /**
     * Destination URL
     */
    href: string
    /**
     * Custom icon that can be passed as a ReactNode
     */
    icon?: ReactNode
    /**
     * Color of the icon
     */
    color?: string
  }>
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Position of the breadcrumb. Default is `center`.
   */
  align?: 'center' | 'left' | 'right'
  /**
   * Time for the breadcrumb list to be fully displayed [ms]
   */
  animationDuration?: number
  /**
   * Spacing between items in the breadcrumb list
   */
  gap?: Property.Gap<string | number>
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BreadcrumbsComponent = ({
  style,
  links,
  isDark = false,
  align = 'center',
  animationDuration = 1000,
  gap = '0.25rem'
}: BreadcrumbsProps) => {
  const { ref: a, inView } = useInView()

  const defaultColor = useMemo(
    () => (isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'),
    [isDark]
  )

  const ANIMATION_SPEED = ((animationDuration / 3) * 2) / links.length

  const { ref: b } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    '--react-opacity': inView ? 1 : 0,
    '--react-align':
      align === 'center'
        ? 'center'
        : align === 'left'
          ? 'flex-start'
          : 'flex-end',
    '--react-gap': gap
  })

  const ref = useMergeRefs(a, b)

  const Links = links.map((link, index) => (
    <React.Fragment key={`${index}-${link.label}-${link.href}`}>
      {/* linktext */}

      <a
        href={link.href}
        target={isExternal(link.href) ? '_blank' : undefined}
        rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
        style={{
          transition: `opacity 400ms ease ${ANIMATION_SPEED * index}ms, background-color 300ms`
        }}
      >
        {index === 0
          ? (link.icon ?? (
              <HomeIcon style={{ color: link.color ?? defaultColor }} />
            ))
          : index + 1 !== links.length
            ? (link.icon ?? (
                <FolderOpenIcon style={{ color: link.color ?? defaultColor }} />
              ))
            : (link.icon ?? (
                <DocumentIcon style={{ color: link.color ?? defaultColor }} />
              ))}

        <span>{link.label}</span>
        {isExternal(link.href) && (
          <ArrowTopRightOnSquareIcon
            style={{ color: link.color ?? defaultColor }}
          />
        )}
      </a>

      {/* chevron */}

      {index + 1 !== links.length && (
        <ChevronRightIcon
          style={{
            transition: `opacity 400ms ease ${ANIMATION_SPEED * (index * 1) + ANIMATION_SPEED / 2}ms`
          }}
        />
      )}
    </React.Fragment>
  ))

  return (
    <nav style={style} ref={ref} className={styles.wrapper}>
      {Links}
    </nav>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Breadcrumbs = React.memo(
  BreadcrumbsComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isDark === nextProps.isDark &&
      prevProps.align === nextProps.align &&
      prevProps.animationDuration === nextProps.animationDuration &&
      isEqual(prevProps.gap, nextProps.gap) &&
      isEqual(prevProps.links, nextProps.links) &&
      isEqual(prevProps.style, nextProps.style)
    )
  }
)
