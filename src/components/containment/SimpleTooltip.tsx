/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { Tooltip } from './Tooltip'
import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'};
  background-color: ${isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'};
  box-sizing: border-box;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`

// # --------------------------------------------------------------------------------
//
// props
//content
// # --------------------------------------------------------------------------------

export interface SimpleTooltipProps {
  /**
   * The element that will trigger the tooltip when hovered over.
   * This must be a DOM element and cannot be something
   * like a `React.Fragment` that doesn't have its own DOM representation.
   */
  children: ReactNode
  /**
   * The text content that will be displayed inside the tooltip.
   */
  content: string
  /**
   * The position where the tooltip will be displayed.
   * If the specified position is outside the viewport, it will fallback to the opposite side.
   */
  place?: 'bottom' | 'top'
  /**
   * The margin between the tooltip and the target element.
   */
  margin?: number
  /**
   * Whether or not to use the dark theme.
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const SimpleTooltipComponent = ({
  children,
  content,
  place = 'top',
  margin = 8,
  isDark = false
}: SimpleTooltipProps) => {
  return (
    <Tooltip
      tooltipComponent={<div css={style({ isDark })}>{content}</div>}
      place={place}
      margin={margin}
    >
      {children}
    </Tooltip>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const SimpleTooltip = React.memo(SimpleTooltipComponent, isEqual)
