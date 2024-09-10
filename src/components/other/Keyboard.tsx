/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { Kbd, KeyboardKey } from './Kbd'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = css`
  display: flex;
  gap: 0.25rem;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface KeyboardProps {
  text: string
  /**
   * Indicates whether to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const keys: KeyboardKey[] = ['2', '3', '4', '5', '6', '7', '8', '9', '0']

const KeyboardComponent = ({ text, isDark = false }: KeyboardProps) => {
  return (
    <>
      {text}
      <div css={style}>
        {keys.map((key) => (
          <Kbd key={key} mainKey={key} isDark={isDark} />
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
