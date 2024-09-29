'use client'

import React, { ReactNode, useState } from 'react'
import isEqual from 'react-fast-compare'
import styles from './Window.module.scss'
import { type Property } from 'csstype'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { getLuminance, rgba } from 'polished'

import {
  AcademicCapIcon,
  MinusIcon,
  Square2StackIcon,
  WindowIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface WindowProps {
  children: ReactNode

  title: string

  style: React.CSSProperties

  width?: Property.Width<string | number>

  height?: Property.Height<string | number>

  color?: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const WindowComponent = ({
  children,
  title,
  style,
  width = '500px',
  height = '250px',
  color = 'rgba(0,0,0,0.8)'
}: WindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false)

  const { ref } = useCSSVariable({
    '--react-window-width': width,
    '--react-window-height': height,
    '--react-window-border-color': rgba(color, 0.35),
    '--react-window-header-color': color,
    '--react-window-header-font-color':
      getLuminance(color) < 0.5 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    '--react-window-icon-color-bg':
      getLuminance(color) < 0.5 ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
  })

  const handleMaximize = () => {
    setIsMaximized(true)
  }

  const handleMiniimize = () => {
    setIsMaximized(false)
  }

  return (
    <div ref={ref} className={styles.wrapper} style={style}>
      <div className={styles.header}>
        <div className={styles['title-container']}>
          <div className={styles['title-icon-wrapper']}>
            <AcademicCapIcon className={styles['title-icon']} />
          </div>
          <span className={styles['title-text']}>{title}</span>
        </div>
        <div className={styles['icon-container']}>
          <div className={styles['icon-wrapper']}>
            <MinusIcon className={styles.icon} />
          </div>
          {isMaximized ? (
            <div className={styles['icon-wrapper']} onClick={handleMiniimize}>
              <WindowIcon className={styles.icon} />
            </div>
          ) : (
            <div className={styles['icon-wrapper']} onClick={handleMaximize}>
              <Square2StackIcon className={styles.icon} />
            </div>
          )}
          <div className={styles['icon-wrapper']}>
            <XMarkIcon className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Window = React.memo(WindowComponent, isEqual)
