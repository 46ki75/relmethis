import React, { ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Button.module.scss'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ButtonProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  onClick?: React.MouseEventHandler<HTMLButtonElement>

  children: ReactNode

  isLoading?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ButtonComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  onClick,
  children,
  isLoading = false
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={(e) => {
          if (onClick != null && !isLoading) {
            onClick(e)
          }
        }}
        className={clsx(styles.button, {
          [styles['button--ready']]: !isLoading,
          [styles['button--loading']]: isLoading,
          [styles['button--light']]: !isDark,
          [styles['button--dark']]: isDark
        })}
        style={style}
      >
        {children}
      </button>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Button = React.memo(ButtonComponent, isEqual)
