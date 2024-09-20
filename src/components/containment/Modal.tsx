import React, { ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Modal.module.scss'
import classNames from 'classnames'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ModalProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  visible: boolean

  children: ReactNode
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ModalComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  visible,
  children
}: ModalProps) => {
  const { ref } = useCSSVariable({
    // '--react-border-color': isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
    '--react-border-color': 'rgba(255,255,255,0.5)'
  })

  return (
    <div
      ref={ref}
      className={classNames(styles.canvas, {
        [styles['canvas--hidden']]: !visible,
        [styles['canvas--visible']]: visible
      })}
    >
      <div
        className={classNames(styles['canvas__modal'], {
          [styles['canvas__modal--hidden']]: !visible,
          [styles['canvas__modal--visible']]: visible
        })}
        style={style}
      >
        {children}
      </div>

      <div
        className={classNames(styles['canvas__wave-fast'], {
          [styles['canvas__wave-fast--hidden']]: !visible,
          [styles['canvas__wave-fast--visible']]: visible
        })}
      ></div>

      <div
        className={classNames(styles['canvas__wave-late'], {
          [styles['canvas__wave-late--hidden']]: !visible,
          [styles['canvas__wave-late--visible']]: visible
        })}
      ></div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Modal = React.memo(ModalComponent, isEqual)
