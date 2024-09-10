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
import { isEqual } from 'lodash'

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
  transition: opacity ${animationDuration}ms;
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

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    height: 0,
    width: 0,
    right: 0
  })

  useLayoutEffect(() => {
    if (ref.current) {
      const { top, left, bottom, height, width, right } =
        ref.current.getBoundingClientRect()
      setPosition({ top, left, bottom, height, width, right })
    }
  }, [children, visible])

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

  // Calculate the left position for the Tooltip
  const tooltipLeftPositionBasedOnHoverElement =
    position.left - position.width / 2

  const adjustedLeftPosition =
    tooltipLeftPositionBasedOnHoverElement < 0
      ? 0
      : tooltipLeftPositionBasedOnHoverElement + margin

  const adjustedRightPosition =
    tooltipLeftPositionBasedOnHoverElement + position.width > window.innerWidth
      ? window.innerWidth - position.width
      : adjustedLeftPosition + margin // Adjust to fit within the screen if it overflows on the right

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
    // If it doesn't fit at the bottom, fallback to the top
    tooltipFinalTopPosition = canTooltipFitInBottomPlacement
      ? tooltipTopPositionForBottomPlacement
      : tooltipTopPositionForTopPlacement
  } else {
    // If it doesn't fit at the top, fallback to the bottom
    tooltipFinalTopPosition = canTooltipFitInTopPlacement
      ? tooltipTopPositionForTopPlacement
      : tooltipTopPositionForBottomPlacement
  }

  // Handle edge cases where the fallback still doesn't fit within the screen
  tooltipFinalTopPosition =
    tooltipFinalTopPosition < 0 ? margin : tooltipFinalTopPosition
  tooltipFinalTopPosition =
    tooltipFinalTopPosition + position.height > window.innerHeight
      ? window.innerHeight - position.height - margin
      : tooltipFinalTopPosition

  return (
    <>
      {clonedChildren}
      {createPortal(
        <div
          css={tooltipStyle({ visible, margin, animationDuration })}
          style={{
            position: 'fixed',
            top: tooltipFinalTopPosition,
            left: adjustedRightPosition
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
