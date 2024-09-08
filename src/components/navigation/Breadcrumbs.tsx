/** @jsxImportSource @emotion/react */

import React, { ReactNode, useMemo } from 'react'
import { css } from '@emotion/react'
import {
  ChevronRightIcon,
  DocumentIcon,
  FolderOpenIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { useInView } from 'react-intersection-observer'
import { rgba } from 'polished'
import { isEqual } from 'lodash'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = ({
  isDark,
  align
}: {
  isDark: boolean
  align?: 'center' | 'left' | 'right'
}) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};

  display: flex;
  justify-content: ${align === 'center'
    ? 'center'
    : align === 'left'
      ? 'flex-start'
      : 'flex-end'};
  align-items: center;
  gap: 0.5rem;
`

const linkStyle = ({
  inView,
  delay
}: {
  inView: boolean
  delay: string
}) => css`
  all: unset;

  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  opacity: ${inView ? 1 : 0};
  transition:
    opacity 400ms ease ${delay},
    background-color 300ms;

  &:hover {
    background-color: ${rgba('#6987b8', 0.2)};
  }
`

const iconStyle = ({ color }: { color: string }) => css`
  color: ${color};
  width: 16px;
  height: 16px;
`

const animationIconStyle = ({
  inView,
  delay
}: {
  inView: boolean
  delay: string
}) => css`
  color: rgba(128, 128, 128, 0.8);
  width: 16px;
  height: 16px;

  opacity: ${inView ? 1 : 0};
  transition: opacity 400ms ease ${delay};
`

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
  align = 'center'
}: BreadcrumbsProps) => {
  const { ref, inView } = useInView()

  const defaultColor = useMemo(
    () => (isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'),
    [isDark]
  )

  const Links = links.map((link, index) => (
    <>
      {/* linktext */}

      <a
        href={link.href}
        target={isExternal(link.href) ? '_blank' : undefined}
        rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
        key={link.label + link.href}
        css={linkStyle({ inView, delay: `${200 * index}ms` })}
      >
        {index === 0
          ? (link.icon ?? (
              <HomeIcon
                css={iconStyle({ color: link.color ?? defaultColor })}
              />
            ))
          : index + 1 !== links.length
            ? (link.icon ?? (
                <FolderOpenIcon
                  css={iconStyle({ color: link.color ?? defaultColor })}
                />
              ))
            : (link.icon ?? (
                <DocumentIcon
                  css={iconStyle({ color: link.color ?? defaultColor })}
                />
              ))}

        <span>{link.label}</span>
      </a>

      {/* chevron */}

      {index + 1 !== links.length && (
        <ChevronRightIcon
          css={animationIconStyle({
            inView,
            delay: `${200 * (index * 1) + 100}ms`
          })}
        />
      )}
    </>
  ))

  return (
    <div css={wrapperStyle({ isDark, align })} style={style} ref={ref}>
      {Links}
    </div>
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
      isEqual(prevProps.links, nextProps.links) &&
      isEqual(prevProps.style, nextProps.style)
    )
  }
)
