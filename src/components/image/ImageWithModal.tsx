/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React, { useMemo, useState } from 'react'
import { RectangleWave } from '../fallback/RectangleWave'
import { SquareLoadingIcon } from '../icon/SquareLoadingIcon'
import { SpinText } from '../text/SpinText'
import { createPortal } from 'react-dom'
import { useKey } from 'react-use'

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

const imageStyle = ({
  isLoading,
  isModalShow
}: {
  isLoading: boolean
  isModalShow: boolean
}) => css`
  width: ${isLoading ? '0px' : '100%'};
  height: ${isLoading ? '0px' : 'auto'};

  transition: opacity 300ms;
  opacity: ${isLoading ? 0 : 1};

  cursor: zoom-in;
  user-select: none;

  pointer-events: ${isModalShow ? 'all' : 'none'};
`

const modalStyle = ({ isModalShow }: { isModalShow: boolean }) => css`
  position: fixed;
  z-index: ${isModalShow ? 50 : -10};
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);

  opacity: ${isModalShow ? 1 : 0};
  pointer-events: ${isModalShow ? 'all' : 'none'};
  user-select: none;
  cursor: zoom-out;

  transition: all 300ms;

  * {
    pointer-events: ${isModalShow ? 'all' : 'none'};
  }
`

const modalImageStyle = css`
  max-width: 100%;
  max-height: 100%;
  transition: all 0.2s;
`

const guideTextStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ImageWithModalProps {
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
  width?: number
  /**
   * **optional?**
   *
   * Height of fallback image. Converted to aspect ratio for use.
   * ```ts
   * { aspectRatio: `${width} / ${height}` }
   * ```
   */
  height?: number
  /**
   * **optional**
   *
   * Language for displaying flavor text or guide text
   */
  lang?: 'en' | 'ja'
}

// # --------------------------------------------------------------------------------
//
// components
//
// # --------------------------------------------------------------------------------

const ImageWithModalComponent = ({
  src,
  width = 1200,
  height = 630,
  lang = 'ja'
}: ImageWithModalProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalShow, setIsModalShow] = useState(false)

  useKey('Escape', () => {
    setIsModalShow(false)
  })

  const guideText = useMemo(() => {
    switch (lang) {
      case 'en':
        return 'Press the Escape key to close the modal'
      case 'ja':
        return 'Escape キー押下でモーダルを閉じる'
    }
  }, [lang])

  return (
    <>
      {/* Modal */}
      {createPortal(
        <div
          css={modalStyle({ isModalShow })}
          onClick={() => {
            setIsModalShow(false)
          }}
        >
          <img css={modalImageStyle} alt='' src={src} />
          <span css={guideTextStyle}>{guideText}</span>
        </div>,
        document.body
      )}

      {/* Loading */}
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

      {/* Image */}
      <img
        css={imageStyle({ isLoading, isModalShow })}
        alt=''
        src={src}
        onLoad={() => {
          setIsLoading(false)
        }}
        onClick={() => {
          setIsModalShow(true)
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

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ImageWithModal = React.memo(ImageWithModalComponent)
