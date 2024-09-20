import React, { ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Modal.module.scss'
import classNames from 'classnames'

import { createPortal } from 'react-dom'

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

  title?: string

  visible: boolean

  children: ReactNode
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ModalComponent = ({ style, title, visible, children }: ModalProps) => {
  return createPortal(
    <div
      className={classNames(styles.canvas, {
        [styles['canvas--hidden']]: !visible,
        [styles['canvas--visible']]: visible
      })}
    >
      <div className={styles['canvas__container']}>
        {title != null && (
          <div className={styles['canvas__title']}>
            <h2 className={styles['canvas__title-text']}>{title}</h2>
          </div>
        )}

        <div
          className={classNames(styles['canvas__modal'], {
            [styles['canvas__modal--hidden']]: !visible,
            [styles['canvas__modal--visible']]: visible
          })}
          style={style}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Modal = React.memo(ModalComponent, isEqual)
