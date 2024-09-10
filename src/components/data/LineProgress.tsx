/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import { isEqual } from 'lodash'
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

const lineStyle = ({ weight }: { weight: number }) => css`
  position: relative;
  width: 100%;
  height: ${weight}px;
  background-color: rgb(222, 222, 222);
  border-radius: ${weight / 2}px;
`

const progressStyle = ({
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
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: ${weight}px;
  background: ${color};
  border-radius: ${weight / 2}px;

  transition: transform ${isLoading ? 400 : 1600}ms;

  transform-origin: 0 0;
  transform: scaleX(${percent}%);
`

const bufferStyle = ({
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
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: ${weight}px;
  border-radius: ${weight / 2}px;
  background: ${color};
  opacity: 0.25;
  transition: transform ${isLoading ? 400 : 400}ms;
  transform-origin: 0 0;
  transform: scaleX(${percent}%);
`

const loadingStyle = ({
  weight,
  color,
  isLoading
}: {
  weight: number
  color: string
  isLoading: boolean
}) => css`
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: ${weight}px;
  border-radius: ${weight / 2}px;
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

  opacity: ${isLoading ? 1 : 0};
  transition: opacity 800ms ease 400ms;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface LineProgressProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
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
  isDark = false,
  weight = 6,
  color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  percent,
  isLoading = false
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
        aria-valuenow={percent}
        ref={ref}
        css={lineStyle({ weight })}
      >
        <div
          css={progressStyle({
            color,
            percent: inView && !isLoading ? percent : 0,
            weight,
            isLoading
          })}
        ></div>

        <div
          css={bufferStyle({
            color,
            percent: inView && !isLoading ? percent : 0,
            weight,
            isLoading
          })}
        ></div>

        <div css={loadingStyle({ color, weight, isLoading })}></div>
      </div>
      <progress max={100} value={percent} style={{ display: 'none' }} />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const LineProgress = React.memo(LineProgressComponent, isEqual)
