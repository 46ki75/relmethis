/** @jsxImportSource @emotion/react */

import React from 'react'
import { css, keyframes } from '@emotion/react'
import { darken, lighten, rgba } from 'polished'
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  all: unset;
  display: inline;
  cursor: pointer;
  padding: 0 0.25rem;

  color: ${isDark ? lighten(0.1, '#6987b8') : darken(0.1, '#6987b8')};
  border-bottom: dashed 1px #6987b8;
  border-radius: 2px;
  transition:
    background-color 200ms,
    border-bottom 200ms;

  &:hover {
    background-color: ${rgba(
      isDark ? lighten(0.1, '#6987b8') : darken(0.1, '#6987b8'),
      0.2
    )};
    border-bottom: dashed 0px rgba(0, 0, 0, 0);
  }

  &:visited {
    color: ${isDark ? lighten(0.1, '#9771bd') : darken(0.1, '#9771bd')};
    &:hover {
      background-color: ${rgba(
        isDark ? lighten(0.1, '#9771bd') : darken(0.1, '#9771bd'),
        0.2
      )};
    }
  }

  span::selection {
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
`

const blink = keyframes`
    from { opacity: 1; }
    to { opacity: 0.1; }
`

const iconStyle = css`
  width: 16px;
  height: 16px;
  margin-left: 0.25rem;
  animation-name: ${blink};
  animation-direction: alternate;
  animation-duration: 2s;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface InlineLinkProps {
  /**
   * The text to be displayed
   */
  text: string
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
  text,
  href,
  isDark = false
}: InlineLinkProps) => {
  const currentHost = window.location.hostname
  const linkUrl = new URL(href, window.location.href)
  const isExternal = linkUrl.hostname !== currentHost

  return (
    <a
      href={href}
      css={style({ isDark })}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span>{text}</span>
      {isExternal ? (
        <ArrowTopRightOnSquareIcon css={iconStyle} />
      ) : (
        <ChevronRightIcon css={iconStyle} />
      )}
    </a>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineLink = React.memo(InlineLinkComponent, isEqual)
