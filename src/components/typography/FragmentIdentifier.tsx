/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// icons
import { HashtagIcon, LinkIcon } from '@heroicons/react/24/outline'

import { createPortal } from 'react-dom'
import { Tooltip } from 'react-tooltip'
import { darken, lighten } from 'polished'
import { useCopy } from '../../hooks/useCopy'

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
// inline styles
//
// # --------------------------------------------------------------------------------

const tooltipInlineStyle = ({
  isDark
}: {
  isDark: boolean
}): React.CSSProperties => ({
  background: isDark
    ? lighten(0.3, 'rgb(128,128,128)')
    : darken(0.3, 'rgb(128,128,128)'),
  color: isDark
    ? darken(0.3, 'rgb(128,128,128)')
    : lighten(0.3, 'rgb(128,128,128)')
})

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
      <HashtagIcon
        id={`FragmentIdentifier-HashtagIcon-${identifier}-${String(isDark)}`}
        css={iconStyle}
        onClick={scrollToIdentifier}
      />
      <LinkIcon
        id={`FragmentIdentifier-LinkIcon-${identifier}-${String(isDark)}`}
        css={iconStyle}
        onClick={() => {
          copy(`${window.location.href.split('#')[0]}#${identifier}`)
        }}
      />

      {createPortal(
        <>
          <Tooltip
            style={tooltipInlineStyle({ isDark })}
            anchorSelect={`#FragmentIdentifier-HashtagIcon-${identifier}-${String(isDark)}`}
            content={'Jump to a link with a fragment modifier'}
            place={'bottom-end'}
          />

          <Tooltip
            style={tooltipInlineStyle({ isDark })}
            anchorSelect={`#FragmentIdentifier-LinkIcon-${identifier}-${String(isDark)}`}
            content={'Copy a link with a fragment modifier'}
            place={'bottom-end'}
          />
        </>,
        document.body
      )}
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const FragmentIdentifier = React.memo(FragmentIdentifierComponent)
