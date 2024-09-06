/** @jsxImportSource @emotion/react */

import React from 'react'
import { css, keyframes } from '@emotion/react'
import { rgba } from 'polished'
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = css`
  all: unset;
  display: inline;
  cursor: pointer;
  padding: 0 0.25rem;

  color: #6987b8;
  border-bottom: dashed 1px #6987b8;
  border-radius: 2px;
  transition:
    background-color 200ms,
    border-bottom 200ms;

  &:hover {
    background-color: ${rgba('#6987b8', 0.2)};
    border-bottom: dashed 0px rgba(0, 0, 0, 0);
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
  text: string
  href: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const InlineLinkComponent = ({ text, href }: InlineLinkProps) => {
  const currentHost = window.location.hostname
  const linkUrl = new URL(href, window.location.href)
  const isExternal = linkUrl.hostname !== currentHost

  return (
    <a
      href={href}
      css={style}
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

export const InlineLink = React.memo(InlineLinkComponent)
