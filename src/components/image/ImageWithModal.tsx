import React, { useMemo, useState } from 'react'
import { RectangleWave } from '../fallback/RectangleWave'
import { SquareLoadingIcon } from '../icon/SquareLoadingIcon'
import { createPortal } from 'react-dom'
import { useKey } from 'react-use'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './ImageWithModal.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ImageWithModalProps {
  style?: React.CSSProperties

  src: string
  alt?: string
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
  /**
   * Manages the loading state of the image. For example,
   * set it to `true` while asynchronously fetching the image URL.
   */
  isLoading?: boolean
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  disableModal?: boolean
}

// # --------------------------------------------------------------------------------
//
// components
//
// # --------------------------------------------------------------------------------

const ImageWithModalComponent = ({
  style,
  src,
  alt = src,
  width = 1200,
  height = 630,
  lang = 'ja',
  isLoading = false,
  isDark = false,
  disableModal = false
}: ImageWithModalProps): JSX.Element => {
  const [isFetchingImage, setIsFetchingImage] = useState(true)
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

  const { ref: modalRef } = useCSSVariable({
    '--react-modal-z-index': isModalShow ? 50 : -10,
    '--react-modal-pointer-events': isModalShow ? 'all' : 'none',
    '--react-modal-opacity': isModalShow ? 1 : 0
  })

  const { ref: imageRef } = useCSSVariable<HTMLImageElement>({
    '--react-image-width': isLoading || isFetchingImage ? '0px' : '100%',
    '--react-image-height': isLoading || isFetchingImage ? '0px' : 'auto',
    '--react-image-opacity': isLoading || isFetchingImage ? 0 : 1,
    '--react-image-cursor': disableModal ? 'initial' : 'zoom-in'
  })

  return (
    <>
      {/* Loading */}
      {(isLoading || isFetchingImage) && (
        <div
          className={styles.fallback}
          style={{ aspectRatio: `${width} / ${height}`, ...style }}
        >
          <RectangleWave isDark={isDark} />
          <div>
            <SquareLoadingIcon isDark={isDark} />
          </div>
        </div>
      )}

      {/* Image */}
      <img
        ref={imageRef}
        className={styles.image}
        style={style}
        alt={alt}
        src={src}
        onLoad={() => {
          setIsFetchingImage(false)
        }}
        onClick={() => {
          if (!disableModal) setIsModalShow(true)
        }}
      />

      {/* Modal */}
      {createPortal(
        <div
          ref={modalRef}
          className={styles.modal}
          onClick={() => {
            setIsModalShow(false)
          }}
        >
          <img alt={alt} src={src} />
          <span>{guideText}</span>
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

export const ImageWithModal = React.memo(ImageWithModalComponent, isEqual)
