'use client'

import React, { useMemo, useState } from 'react'
import { RectangleWave } from '../fallback/RectangleWave'
import { SquareLoadingIcon } from '../icon/SquareLoadingIcon'
import { useKey } from 'react-use'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './Image.module.scss'

import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ImageProps {
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
  locale?: 'en-US' | 'ja-JP'
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

const ImageComponent = ({
  style,
  src,
  alt = src,
  width = 1200,
  height = 630,
  locale = 'en-US',
  isLoading = false,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  disableModal = false
}: ImageProps): JSX.Element => {
  const [isFetchingImage, setIsFetchingImage] = useState(true)
  const [isModalShow, setIsModalShow] = useState(false)

  useKey('Escape', () => {
    setIsModalShow(false)
  })

  const guideText = useMemo(() => {
    switch (locale) {
      case 'en-US':
        return 'Press the Escape key to close the modal'
      case 'ja-JP':
        return 'Escape キー押下でモーダルを閉じる'
    }
  }, [locale])

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

      <div
        className={clsx(styles.modal, {
          [styles['modal--visible']]: isModalShow
        })}
        onClick={() => {
          setIsModalShow(false)
        }}
      >
        <img alt={alt} src={src} className={styles['modal__modal-image']} />
        <span className={styles['modal__modal-guide-text']}>{guideText}</span>
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Image = React.memo(ImageComponent, isEqual)
