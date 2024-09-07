/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { FragmentIdentifier } from './FragmentIdentifier'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  font-size: 1.125rem;
  margin-top: 2rem;
  margin-bottom: 0;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface Heading6Props {
  /**
   * The text to be displayed
   */
  text: string
  /**
   * The ID to be assigned to the tag. Defaults to the value of `text` if not provided
   */
  identifier?: string
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

const Heading6Component = ({
  text,
  identifier = text,
  isDark = false
}: Heading6Props) => {
  return (
    <>
      <h6 id={identifier} css={style({ isDark })}>
        {text}
      </h6>
      <FragmentIdentifier identifier={identifier} />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Heading6 = React.memo(Heading6Component)
