/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// icons
import { HashtagIcon, LinkIcon } from '@heroicons/react/24/outline'
import { SimpleTooltip } from '../containment/SimpleTooltip'

import { useCopy } from '../../hooks/useCopy'

import isEqual from 'react-fast-compare'

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

const copiedtextStyle = ({ isShow }: { isShow: boolean }) => css`
  color: #59b57c;
  opacity: ${isShow ? 1 : 0};
  transition: opacity 400ms;
  user-select: none;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface FragmentIdentifierProps {
  identifier: string

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

const FragmentIdentifierComponent = ({
  identifier,
  isDark = false
}: FragmentIdentifierProps) => {
  const scrollToIdentifier = () => {
    const element = document.getElementById(identifier)
    if (element) {
      window.history.pushState(null, '', `#${identifier}`)
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { copy, isCopied } = useCopy()

  return (
    <div css={wrapperStyle}>
      <span css={copiedtextStyle({ isShow: isCopied })}>
        Link has been copied!
      </span>
      <SimpleTooltip
        content='Jump to a link with a fragment modifier'
        place='bottom'
        isDark={isDark}
      >
        <HashtagIcon css={iconStyle} onClick={scrollToIdentifier} />
      </SimpleTooltip>
      <SimpleTooltip
        content='Copy a link with a fragment modifier'
        place='bottom'
        isDark={isDark}
      >
        <LinkIcon
          css={iconStyle}
          onClick={() => {
            copy(`${window.location.href.split('#')[0]}#${identifier}`)
          }}
        />
      </SimpleTooltip>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const FragmentIdentifier = React.memo(
  FragmentIdentifierComponent,
  isEqual
)
