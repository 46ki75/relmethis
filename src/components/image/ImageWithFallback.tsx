/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React, { useState } from 'react'
import { RectangleWave } from '../decoration/RectangleWave'
import { SquareLoadingIcon } from '../icon/SquareLoadingIcon'
import { SpinText } from '../text/SpinText'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const fallbackStyle = ({
  width,
  height
}: {
  width: number
  height: number
}) => css`
  position: relative;
  width: 100%;
  aspect-ratio: ${width} / ${height};

  border: dashed 1px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
`

const fallbackInnerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  user-select: none;
`

const imageStyle = (isLoading: boolean) => css`
  width: ${isLoading ? '0px' : '100%'};
  height: ${isLoading ? '0px' : 'auto'};

  transition: opacity 300ms;
  opacity: ${isLoading ? 0 : 1};

  user-select: none;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ImageWithFallbackProps {
  src: string
  alt: string
  /**
   * **optional?**
   *
   * Width of fallback image. Converted to aspect ratio for use.
   * ```ts
   * { aspectRatio: `${width} / ${height}` }
   * ```
   */
  width: number
  /**
   * **optional?**
   *
   * Height of fallback image. Converted to aspect ratio for use.
   * ```ts
   * { aspectRatio: `${width} / ${height}` }
   * ```
   */
  height: number
}

// # --------------------------------------------------------------------------------
//
// components
//
// # --------------------------------------------------------------------------------

const ImageWithFallbackComponent = ({
  src,
  width,
  height
}: ImageWithFallbackProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <div css={fallbackStyle({ width, height })}>
          <RectangleWave />
          <div css={fallbackInnerStyle}>
            <SquareLoadingIcon />
            <div>
              <SpinText text='LOADING IMAGE' />
            </div>
          </div>
        </div>
      )}
      <img
        css={imageStyle(isLoading)}
        alt=''
        src={src}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

ImageWithFallbackComponent.defaultProps = {
  width: 1200,
  height: 630
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ImageWithFallback = React.memo(ImageWithFallbackComponent)
