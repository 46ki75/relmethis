import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './GridLoadingIcon.module.scss'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface GridLoadingIconProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  size?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const DURATION = 100

const GridLoadingIconComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  size = 64
}: GridLoadingIconProps) => {
  return (
    <>
      <div className={styles.wrapper} style={{ width: size, ...style }}>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 0}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${(DURATION * 1) / 2}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 2}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>

        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 8}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{ animationName: 'none' }}
        ></div>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 4}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>

        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 7}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 6}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>
        <div
          className={clsx(styles['wrapper__dot'], {
            [styles['wrapper__dot--light']]: !isDark,
            [styles['wrapper__dot--dark']]: isDark
          })}
          style={{
            animationDelay: `${DURATION * 5}ms`,
            animationDuration: `${DURATION * 7}ms`
          }}
        ></div>
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const GridLoadingIcon = React.memo(GridLoadingIconComponent, isEqual)
