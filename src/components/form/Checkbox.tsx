/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React from 'react'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const containerStyle = css`
  width: fit-content;
  * {
    font-family: sans-serif;
    user-select: none;
  }

  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const rectStyle = ({
  isChecked,
  isDisable,
  color
}: {
  isChecked: boolean
  isDisable: boolean
  color: string
}) => css`
  transition: all 0.2s;
  stroke: ${isDisable ? 'gray' : color};
  fill: ${isChecked ? (isDisable ? 'gray' : color) : 'transparent'};
`

const polylineStyle = css`
  stroke-dasharray: 100%;
  animation: ${keyframes`
        0% {
          stroke-dashoffset: 100%;
        }
        100% {
          stroke-dashoffset: 0%;
        }
    `} 0.2s ease-in-out 0.1s both;
  transform-origin: center;
`

const lineStyle = ({
  isDisable,
  color
}: {
  isDisable: boolean
  color: string
}) => css`
  stroke: ${isDisable ? 'gray' : color};
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface CheckboxProps {
  label: string
  color: string
  isDisable: boolean
  isChecked: boolean
  setIsChecked: (flag: boolean) => void
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const CheckboxComponent = ({
  label,
  color,
  isDisable,
  isChecked,
  setIsChecked
}: CheckboxProps): JSX.Element => {
  return (
    <div
      css={containerStyle}
      onClick={() => {
        setIsChecked(!isChecked)
      }}
    >
      <div>
        <svg width='24' height='24'>
          <rect
            x='4'
            y='4'
            width='16'
            height='16'
            strokeWidth='0.8'
            css={rectStyle({ color, isChecked, isDisable })}
          />

          {isChecked && (
            <polyline
              css={polylineStyle}
              points='5,12 10,17 19,8'
              strokeWidth='1.5'
              style={{ stroke: 'white' }}
              fill='transparent'
            />
          )}

          {isDisable && (
            <line
              x1='2'
              y1='22'
              x2='22'
              y2='2'
              strokeWidth='1'
              fill='transparent'
              css={lineStyle({ isDisable, color })}
            />
          )}

          <line
            x1='0'
            y1='1'
            x2='4'
            y2='1'
            strokeWidth='2'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />

          <line
            x1='4'
            y1='0'
            x2='24'
            y2='0'
            strokeWidth='1'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />

          <line
            x1='0'
            y1='4'
            x2='0'
            y2='16'
            strokeWidth='1'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />

          <line
            x1='0'
            y1='18'
            x2='0'
            y2='20'
            strokeWidth='1'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />

          <line
            x1='0'
            y1='24'
            x2='20'
            y2='24'
            strokeWidth='1'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />

          <line
            x1='20'
            y1='23'
            x2='24'
            y2='23'
            strokeWidth='1.5'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />

          <line
            x1='24'
            y1='4'
            x2='24'
            y2='20'
            fill='transparent'
            css={lineStyle({ isDisable, color })}
          />
        </svg>
        <div>{label}</div>
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

CheckboxComponent.defaultProps = {
  isDisable: false,
  color: 'black'
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Checkbox = React.memo(CheckboxComponent, isEqual)
