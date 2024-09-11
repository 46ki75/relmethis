/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { darken, rgba } from 'polished'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const wrapperStyle = ({
  isDark,
  cooldown,
  focus
}: {
  isDark: boolean
  cooldown: number
  focus: boolean
}) => css`
  overflow-x: hidden;
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  border: solid 2px
    ${rgba(
      isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
      focus ? 0.5 : 0.1
    )};

  transition: border-color 200ms;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.2);
    z-index: -3;
    transition: transform 200ms;
    transform: scaleY(${cooldown}%);
    transform-origin: 0 100%;
  }
`

const progressContainerStyle = css`
  position: absolute;
  overflow-x: hidden;
  box-sizing: border-box;
  bottom: 4px;
  width: calc(100% - 8px);
  height: 4px;
  background-color: ${rgba(darken(0.15, '#6987b8'), 0.3)};
`

const progressStyle = ({ progress }: { progress: number }) => css`
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #6987b8;
  transform: scaleX(${progress}%);
  transform-origin: 0 0;
  transition: transform 200ms;
`

const stackCountStyle = css`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(128, 128, 128, 1);
  user-select: none;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ItemProps {
  children: ReactNode
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  cooldown?: number
  progress?: number
  stackCount?: number
  focus?: boolean
  isLoading?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ItemComponent = ({
  children,
  isDark = false,
  cooldown = 0,
  progress = 0,
  stackCount = 0,
  focus = false,
  isLoading = false
}: ItemProps) => {
  return (
    <>
      <div css={wrapperStyle({ isDark, cooldown, focus })}>
        {isLoading ? (
          <>
            <DotLoadingIcon size={32} color='rgb(128,128,128)' />
          </>
        ) : (
          <>
            {children}
            {progress > 0 && (
              <div css={progressContainerStyle}>
                <div css={progressStyle({ progress })}></div>
              </div>
            )}

            {stackCount > 0 && <div css={stackCountStyle}>{stackCount}</div>}
          </>
        )}
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Item = React.memo(ItemComponent, isEqual)
