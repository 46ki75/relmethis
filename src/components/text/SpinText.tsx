/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React, { useMemo } from 'react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const containerStyle = css`
  display: flex;
  flex-direction: row;
`

const spin = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  
  70% {
    transform: rotateY(360deg);
  }
  
  100% {
    transform: rotateY(360deg);
  }
`

const style = (delay: number, duration: number) => css`
  display: block;
  animation-name: ${spin};
  animation-duration: ${duration}ms;
  animation-delay: ${delay}ms;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-direction: alternate-reverse;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------
export interface SpinTextProps {
  text: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const SpinTextComponent = ({ text }: SpinTextProps) => {
  const length = useMemo(() => text.length, [text])

  const renderedText = useMemo(
    () =>
      text.split('').map((char, index) => (
        <span css={style(index * 50, length * 50 + 200)} key={index}>
          {char === ' ' ? <>&nbsp;</> : char}
        </span>
      )),
    [text, length]
  )

  return <div css={containerStyle}>{renderedText}</div>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const SpinText = React.memo(SpinTextComponent)
