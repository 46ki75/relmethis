/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import { rgba } from 'polished'
import React from 'react'
import { useInView } from 'react-intersection-observer'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const loadingAnimation = keyframes`
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: -200% 0;
  }
`

const lineStyle = ({
  weight,
  color,
  percent,
  isLoading
}: {
  weight: number
  color: string
  percent: number
  isLoading: boolean
}) => css`
  position: relative;
  width: 100%;
  height: ${weight}px;
  background-color: rgb(222, 222, 222);
  border-radius: ${weight / 2}px;

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: ${weight}px;
    border-radius: ${weight / 2}px;
  }

  ${isLoading
    ? css`
        &::after {
          background: linear-gradient(
            to right,
            ${color} 0% 50%,
            ${rgba(color, 0.25)} 50% 100%
          );
          background-size: 200% 100%;
          animation-name: ${loadingAnimation};
          animation-duration: 1200ms;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }
      `
    : css`
        &::after {
          background: ${color};
          opacity: 0.25;
          transition: transform 400ms;
          transform-origin: 0 0;
          transform: scaleX(${percent}%);
        }

        /* PERCENT */
        &::before {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          width: 100%;
          height: ${weight}px;
          background: ${color};
          border-radius: ${weight / 2}px;

          transition: transform 1600ms;

          transform-origin: 0 0;
          transform: scaleX(${percent}%);
        }
      `}
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface LineProgressProps {
  /**
   * **optional** default: 6
   *
   * Specify the thickness of the progress bar in pixels.
   */
  weight: number
  /**
   * **optional** default: 'rgb(22, 22, 22)'
   *
   * Specify the color of the progress bar.
   * The color of the buffer will be calculated and diluted.
   */
  color: string
  /**
   * **requred**
   *
   * The progress of the progress bar is represented in percentage.
   */
  percent: number
  /**
   * **optional** default: false
   *
   * Boolean value indicating whether it is in the process of loading.
   * During loading, the progress bar animates.
   */
  isLoading: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const LineProgressComponent = ({
  weight,
  color,
  percent,
  isLoading
}: LineProgressProps) => {
  const { ref, inView } = useInView({
    threshold: 0
  })
  return (
    <>
      <div
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={inView ? percent : 0}
        ref={ref}
        css={lineStyle({
          weight,
          color,
          percent: inView ? percent : 0,
          isLoading
        })}
      />
      <progress max={100} value={percent} style={{ display: 'none' }} />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

LineProgressComponent.defaultProps = {
  weight: 6,
  color: 'rgb(22, 22, 22)',
  isLoading: false
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const LineProgress = React.memo(LineProgressComponent)
