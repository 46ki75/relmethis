/** @jsxImportSource @emotion/react */

import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { css } from '@emotion/react'
import { createPortal } from 'react-dom'
import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const tooltipStyle = ({
  visible,
  margin,
  animationDuration
}: {
  visible: boolean
  margin: number
  animationDuration: number
}) => css`
  max-width: calc(100vw - ${margin * 2}px);
  max-height: calc(100vh - ${margin * 2}px);
  position: fixed;
  opacity: ${visible ? 1 : 0};
  transition: opacity ${animationDuration}ms ease 50ms;
  user-select: ${visible ? 'all' : 'none'};
  pointer-events: ${visible ? 'all' : 'none'};
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TooltipProps {
  /**
   * The element that will trigger the tooltip when hovered over.
   * This must be a DOM element and cannot be something
   * like a `React.Fragment` that doesn't have its own DOM representation.
   */
  children: ReactNode
  /**
   * The component to be displayed as a tooltip.
   * Since it has no unnecessary decorations, you can pass a styled component freely.
   */
  tooltipComponent: ReactNode
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
   * The duration [ms] for the tooltip's opacity transition.
   * This includes the time from hovering to the tooltip fully appearing,
   * and from mouse out to the tooltip disappearing.
   */
  animationDuration?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const TooltipComponent = ({
  children,
  tooltipComponent,
  place = 'top',
  margin = 8,
  animationDuration = 100
}: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    height: 0,
    width: 0,
    right: 0
  })

  const [adjustedLeftPosition, setAdjustedLeftPosition] = useState(0)

  useLayoutEffect(() => {
    if (ref.current && tooltipRef.current) {
      const { top, left, bottom, height, width, right } =
        ref.current.getBoundingClientRect()
      setPosition({ top, left, bottom, height, width, right })

      // Get the tooltip's width
      const tooltipWidth = tooltipRef.current.offsetWidth

      // Width of the viewable area (excluding the scrollbar)
      const clientWidth = document.documentElement.clientWidth

      // 1. Position the tooltip at the center of the hovered component
      const tooltipLeftPositionBasedOnHoverElement =
        position.left + position.width / 2 - tooltipWidth / 2

      // 2. Handle the case where the tooltip overflows to the left
      const overflowLeft = tooltipLeftPositionBasedOnHoverElement < margin

      // 3. Handle the case where the tooltip overflows to the right (considering the scrollbar)
      const overflowRight =
        tooltipLeftPositionBasedOnHoverElement + tooltipWidth >
        clientWidth - margin

      // Determine the final left position of the tooltip
      const finalLeftPosition = overflowRight
        ? // If it overflows to the right, align it with a margin from the right edge
          clientWidth - tooltipWidth - margin
        : overflowLeft
          ? // If it overflows to the left, apply the margin to the left edge
            margin
          : // Otherwise, center it
            tooltipLeftPositionBasedOnHoverElement

      setAdjustedLeftPosition(finalLeftPosition)
    }
  }, [children, margin, position.left, position.width, visible])

  useEffect(() => {
    const handleScroll = () => {
      setVisible(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const clonedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        ref,
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false)
      })
    : children

  // Calculate the position for the bottom placement
  const tooltipTopPositionForBottomPlacement =
    position.top + position.height + margin

  // Calculate the position for the top placement
  const tooltipTopPositionForTopPlacement =
    position.top - position.height - margin

  // Check if it fits within the screen when placed at the bottom
  const canTooltipFitInBottomPlacement =
    tooltipTopPositionForBottomPlacement + position.height <= window.innerHeight
  // Check if it fits within the screen when placed at the top
  const canTooltipFitInTopPlacement = tooltipTopPositionForTopPlacement >= 0

  // Determine the final top position for the tooltip
  let tooltipFinalTopPosition
  if (place === 'bottom') {
    tooltipFinalTopPosition = canTooltipFitInBottomPlacement
      ? tooltipTopPositionForBottomPlacement
      : tooltipTopPositionForTopPlacement
  } else {
    tooltipFinalTopPosition = canTooltipFitInTopPlacement
      ? tooltipTopPositionForTopPlacement
      : tooltipTopPositionForBottomPlacement
  }

  tooltipFinalTopPosition =
    tooltipFinalTopPosition < margin ? margin : tooltipFinalTopPosition
  tooltipFinalTopPosition =
    tooltipFinalTopPosition + position.height > window.innerHeight - margin
      ? window.innerHeight - position.height - margin
      : tooltipFinalTopPosition

  return (
    <>
      {clonedChildren}
      {createPortal(
        <div
          ref={tooltipRef}
          css={tooltipStyle({ visible, margin, animationDuration })}
          style={{
            position: 'fixed',
            top: tooltipFinalTopPosition,
            left: adjustedLeftPosition
          }}
        >
          {tooltipComponent}
        </div>,
        document.body
      )}
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Tooltip = React.memo(TooltipComponent, isEqual)
