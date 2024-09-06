/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// icons
import { HashtagIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useCopyToClipboard } from 'react-use'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
`

const iconStyle = css`
  box-sizing: border-box;
  padding: 2px;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  color: #6987b8;

  cursor: pointer;

  transition: background-color 200ms;

  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface FragmentIdentifierProps {
  identifier: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const FragmentIdentifierComponent = ({
  identifier
}: FragmentIdentifierProps) => {
  const [, copy] = useCopyToClipboard()

  const scrollToIdentifier = () => {
    const element = document.getElementById(identifier)
    if (element) {
      window.history.pushState(null, '', `#${identifier}`)
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCopy = () => {
    const fullUrl = `${window.location.href.split('#')[0]}#${identifier}`
    copy(fullUrl)
  }

  return (
    <div css={wrapperStyle}>
      <HashtagIcon css={iconStyle} onClick={scrollToIdentifier} />
      <LinkIcon css={iconStyle} onClick={handleCopy} />
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const FragmentIdentifier = React.memo(FragmentIdentifierComponent)
