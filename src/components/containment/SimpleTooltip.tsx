'use client'

import React, { ReactNode } from 'react'

import { Tooltip } from './Tooltip'
import isEqual from 'react-fast-compare'

import styles from './SimpleTooltip.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

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
  const { ref } = useCSSVariable({
    '--react-color-fg': isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
    '--react-color-bg': isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
  })

  return (
    <Tooltip
      tooltipComponent={
        <div ref={ref} className={styles.tooltip}>
          {content}
        </div>
      }
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
