import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './Parallax.module.scss'
import { useWindowScroll } from 'react-use'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ParallaxProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  imageUrl1: string

  imageUrl2: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ParallaxComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  imageUrl1,
  imageUrl2
}: ParallaxProps) => {
  const { y } = useWindowScroll()
  const opacity = isDark ? 0.08 : 0.5
  return (
    <>
      <div
        className={styles.parallax}
        style={{
          backgroundImage: `url(${imageUrl1})`,
          transform: `scale(1.2) translateY(${y / 400}%)`,
          transformOrigin: 'bottom',
          opacity,
          ...style
        }}
      ></div>
      <div
        className={styles.parallax}
        style={{
          backgroundImage: `url(${imageUrl2})`,
          transform: `scale(1.2) translateY(${y / 900}%)`,
          transformOrigin: 'bottom',
          opacity
        }}
      ></div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Parallax = React.memo(ParallaxComponent, isEqual)
