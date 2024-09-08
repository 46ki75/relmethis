/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { LinkIcon } from '@heroicons/react/16/solid'
import { rgba } from 'polished'
import { useInView } from 'react-intersection-observer'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  margin: auto 0;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  border-left: solid 4px rgba(128, 128, 128, 0.5);
  background-color: rgba(128, 128, 128, 0.05);
`

const childrenStyle = ({ inView }: { inView: boolean }) => css`
  opacity: ${inView ? 1 : 0};
  transition: opacity 1000ms;
`

const citeBlockStyle = ({ inView }: { inView: boolean }) => css`
  opacity: ${inView ? 1 : 0};
  transition: opacity 1000ms;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
`

const iconStyle = css`
  color: #4c6da2;
  width: 16px;
  height: 16px;
`

const linkStyle = css`
  all: unset;
  color: #6987b8;
  font-size: 0.85rem;
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  cursor: pointer;

  transition: background-color 200ms;

  &:hover {
    background-color: ${rgba('#6987b8', 0.1)};
  }

  &:visited {
    color: #9771bd;

    &:hover {
      background-color: ${rgba('#9771bd', 0.1)};
    }
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BlockquoteProps {
  children: ReactNode
  /**
   * The URL of the source being quoted
   */
  cite?: string
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

const BlockquoteComponent = ({
  children,
  cite,
  isDark = false
}: BlockquoteProps) => {
  const { ref, inView } = useInView()

  return (
    <blockquote cite={cite} css={style({ isDark })} ref={ref}>
      <div css={childrenStyle({ inView })}>{children}</div>
      {cite != null && (
        <div css={citeBlockStyle({ inView })}>
          <LinkIcon css={iconStyle} />
          <a
            href={cite}
            target='_blank'
            rel='noreferrer noopener'
            css={linkStyle}
          >
            {cite}
          </a>
        </div>
      )}
    </blockquote>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Blockquote = React.memo(BlockquoteComponent)
