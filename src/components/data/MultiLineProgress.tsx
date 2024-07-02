/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import { rgba } from 'polished'
import React, { useMemo } from 'react'
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
  isLoading
}: {
  weight: number
  color: string
  isLoading: boolean
}) =>
  isLoading
    ? css`
        position: relative;
        width: 100%;
        height: ${weight}px;
        background-color: rgb(222, 222, 222);
        border-radius: 2px;

        &::after {
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
        }
      `
    : css`
        position: relative;
        width: 100%;
        height: ${weight}px;
        background: rgb(222, 222, 222);
        border-radius: 2px;

        display: flex;
        justify-content: center;
        align-items: center;

        overflow: hidden;
      `

const childStyle = ({
  weight,
  color,
  value
}: {
  weight: number
  color: string
  value: number
}) => css`
  height: ${weight}px;
  background-color: ${color};
  flex-grow: ${value};

  transition: flex-grow 8000ms;
  transition-timing-function: linear;
`

const indicatorContainerStyle = css`
  margin-top: 0.25rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.25rem;
`

const indicatorStyle = (color: string) => css`
  position: relative;
  padding: 0 0.75rem;
  color: ${color};
  font-size: 0.75rem;

  &:before {
    position: absolute;
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    top: 0.25rem;
    left: 0;
    background-color: ${color};
    border-radius: 50%;
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MultiLineProgressProps {
  /**
   * **optional** default: 6
   *
   * Specify the thickness of the progress bar in pixels.
   */
  weight: number
  /**
   * **optional** default: 'rgb(22, 22, 22)'
   *
   * The color specified here refers to the color of
   * the loading animation progress bar.
   * When specifying the color of the bar,
   * please use the color attribute of the data array.
   */
  color: string
  /**
   * **optional** default: false
   *
   * Boolean value indicating whether it is in the process of loading.
   * During loading, the progress bar animates.
   */
  isLoading: boolean
  /**
   * **required**
   *
   * This data consists of an array of objects.
   * - `label`: Label used for data display. It must be unique.
   * - `value`: Value used for data display.
   *            It doesn't have to add up to exactly 100.
   *            The display ratio is determined based on the values of all arrays.
   * - `color`: Color used for data display.
   */
  data: Array<{
    /**
     * It must be unique.
     */
    label: string
    /**
     * It doesn't have to add up to exactly 100.
     */
    value: number
    color: string
  }>
  /**
   * **optional** default: undefined
   *
   * The unit displayed after the numerical value of the indicator.
   */
  unit: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MultiLineProgressComponent = ({
  weight,
  color,
  isLoading,
  data,
  unit
}: MultiLineProgressProps) => {
  const { ref, inView } = useInView({
    threshold: 0
  })

  const renderProgress = useMemo(() => {
    return data.map((d) => {
      return (
        <div
          key={d.label}
          css={childStyle({
            weight,
            color: d.color,
            value: inView ? d.value : 1
          })}
        ></div>
      )
    })
  }, [data, inView, weight])

  const renderNumber = useMemo(() => {
    return data.map((d) => {
      return (
        <div css={indicatorStyle(d.color)}>
          {d.value}
          {unit}
        </div>
      )
    })
  }, [data, unit])

  return (
    <>
      <div
        ref={ref}
        css={lineStyle({
          weight,
          color,
          isLoading
        })}
      >
        {renderProgress}
      </div>
      {!isLoading && <div css={indicatorContainerStyle}>{renderNumber}</div>}
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

MultiLineProgressComponent.defaultProps = {
  weight: 6,
  color: 'rgb(22, 22, 22)',
  isLoading: false
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const MultiLineProgress = React.memo(MultiLineProgressComponent)
