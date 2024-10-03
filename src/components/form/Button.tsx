import React, { ReactNode, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Button.module.scss'
import clsx from 'clsx'
import { RainbowFrame } from '../animation/RainbowFrame'
import { DotLoadingIcon } from '../icon/DotLoadingIcon'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

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
  const prevIsLoading = useRef(isLoading)

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    let id: number
    if (prevIsLoading.current && !isLoading) {
      setIsSuccess(true)
      id = window.setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    }
    prevIsLoading.current = isLoading

    return () => clearTimeout(id)
  }, [isLoading])

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
        {isLoading ? (
          <DotLoadingIcon isDark={isDark} size={24} />
        ) : isSuccess ? (
          <div key={'success'} className={styles['button__success']}>
            <CheckCircleIcon
              style={{
                width: 24,
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
              }}
            />
            <RainbowFrame opacity={0.3} strokeWidth={2} />
          </div>
        ) : (
          <div key={'children'} className={styles['button__children']}>
            {children}
          </div>
        )}
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
