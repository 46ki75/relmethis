/** @jsxImportSource @emotion/react */

import React, { ReactNode, Suspense, useState } from 'react'
import { css } from '@emotion/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BlockFallback } from '../fallback/BlockFallback'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = css`
  /* box-shadow: 0 0 4px rgba(128, 128, 128, 0.1); */
`

const summaryStyle = ({ isVisible }: { isVisible: boolean }) => css`
  display: flex;
  align-items: center;
  gap: 1rem;

  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border: solid 1px rgba(128, 128, 128, 0.4);
  border-radius: 0.25rem 0.25rem ${isVisible ? '0rem 0rem' : '0.25rem 0.25rem'};

  cursor: pointer;

  transition: border-radius 400ms;
`

const iconStyle = ({ isVisible }: { isVisible: boolean }) => css`
  width: 16px;
  height: 16px;
  color: #59b57c;

  transform: rotate(${isVisible ? 90 : 0}deg);
  transition: transform 100ms;
`

const foldedStyle = ({ isVisible }: { isVisible: boolean }) => css`
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  opacity: ${isVisible ? 1 : 0};

  border: solid 1px rgba(128, 128, 128, 0.4);
  border-top: none;
  border-radius: 0 0 0.25rem 0.25rem;

  height: ${isVisible ? '100%' : '0px'};
  transform: scaleY(${isVisible ? 1 : 0});
  transform-origin: top;

  transition:
    opacity 400ms,
    transform 400ms,
    height 400ms;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ToggleProps {
  children: ReactNode
  summary: string
}

// # --------------------------------------------------------------------------------
//
// components
//
// # --------------------------------------------------------------------------------

const ToggleComponent = ({ children, summary }: ToggleProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div css={wrapperStyle}>
      <div
        css={summaryStyle({ isVisible })}
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        <ChevronRightIcon css={iconStyle({ isVisible })} />
        <span>{summary}</span>
      </div>
      <div css={foldedStyle({ isVisible })}>
        <Suspense fallback={<BlockFallback />}>{children}</Suspense>
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Toggle = React.memo(ToggleComponent, isEqual)
