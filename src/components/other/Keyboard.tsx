/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = css`
  display: flex;
  gap: 0.25rem;
`

const keyStyle = ({ fontSize = 16 }: { fontSize?: number }) => css`
  box-sizing: border-box;
  padding: 0.25rem;
  width: ${fontSize * 2}px;
  height: ${fontSize * 2}px;
  border: solid 1px rgb(128, 128, 128);
  font-size: ${fontSize}px;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface KeyboardProps {
  text: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const KeyboardComponent = ({ text }: KeyboardProps) => {
  const keys = [
    '',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '^',
    '\\',
    '←'
  ]

  return (
    <>
      {text}
      <div css={style}>
        {keys.map((key) => (
          <div css={keyStyle({})}>{key}</div>
        ))}
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Keyboard = React.memo(KeyboardComponent)
