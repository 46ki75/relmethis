'use client'

import React, { ReactNode } from 'react'

import { rgba } from 'polished'
import isEqual from 'react-fast-compare'
import {
  ArrowsRightLeftIcon,
  ArrowTurnRightUpIcon
} from '@heroicons/react/16/solid'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './Kbd.module.scss'

// # --------------------------------------------------------------------------------
//
// keys
//
// # --------------------------------------------------------------------------------

export type KeyboardKey =
  | 'Enter'
  | 'Escape'
  | 'Tab'
  | 'Shift'
  | 'Control'
  | 'Alt'
  | 'CapsLock'
  | 'Space'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Backspace'
  | 'Delete'
  | 'Insert'
  | 'Home'
  | 'End'
  | 'PageUp'
  | 'PageDown'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface KbdProps {
  /**
   * The main key to display
   */
  mainKey: KeyboardKey
  /**
   * The sub key. For example, when the main key is '1', the sub key might be '!'
   */
  subKey?: KeyboardKey
  /**
   * Indicates whether the key is currently pressed
   */
  isPressed?: boolean
  /**
   * The color of the key when it is pressed
   */
  activeColor?: string
  /**
   * The size of the key. The height is fixed and the width is determined by `widthRatio`.
   */
  size?: number
  /**
   * The aspect ratio of the key. The width is `size` multiplied by `widthRatio`.
   */
  widthRatio?: number
  /**
   * Indicates whether to display the key in uppercase. Default is `true`.
   */
  toUpperCase?: boolean
  /**
   * Indicates whether to display the key in a larger size. The size of the key is based on `size`.
   */
  bigKey?: boolean
  /**
   * Represents the degree to which the key is pressed, expressed as a percentage with a maximum of 100.
   */
  progress?: number
  /**
   * Indicates whether to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const KbdComponent = ({
  mainKey,
  subKey,
  isPressed = false,
  size = 48,
  activeColor = '#6987b8',
  toUpperCase = true,
  widthRatio = 1,
  bigKey = false,
  progress,
  isDark = false
}: KbdProps) => {
  const icon = (): { p?: ReactNode; s?: ReactNode } => {
    switch (mainKey) {
      case 'Shift':
        return { s: <ArrowTurnRightUpIcon style={{ width: size / 2.75 }} /> }
      case 'Tab':
        return { s: <ArrowsRightLeftIcon style={{ width: size / 2.75 }} /> }
      default:
        return {}
    }
  }

  const { ref } = useCSSVariable({
    '--react-color': isPressed
      ? activeColor
      : isDark
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.7)',
    '--react-background-color': isPressed ? rgba(activeColor, 0.25) : 'none',
    '--react-border-color': isPressed
      ? activeColor
      : isDark
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.3)',
    '--react-font-size': `${
      subKey != null ? size / (bigKey ? 2.5 : 3.5) : size / (bigKey ? 1.5 : 2.5)
    }px`,
    '--react-size': `${size}px`,
    '--react-width-ratio': widthRatio,
    '--react-transform': `scaleY(${progress != null ? progress / 100 : 1})`
  })

  return (
    <kbd ref={ref} className={styles.kbd}>
      {subKey != null && (
        <span>{toUpperCase ? subKey.toUpperCase() : subKey}</span>
      )}
      <span>
        {icon().p}
        {toUpperCase ? mainKey.toUpperCase() : mainKey}
        {icon().s}
      </span>
    </kbd>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Kbd = React.memo(KbdComponent, isEqual)
