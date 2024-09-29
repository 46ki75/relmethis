'use client'

import React from 'react'

import isEqual from 'react-fast-compare'

import styles from './Checkbox.module.scss'

import { useCSSVariable } from '../../hooks/useCSSVariable'
import { getLuminance } from 'polished'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface CheckboxProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  label: string
  color?: string
  isDisable?: boolean
  isChecked: boolean
  setIsChecked: (flag: boolean) => void
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const CheckboxComponent = ({
  isDark = false,
  label,
  color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  isDisable = false,
  isChecked = false,
  setIsChecked
}: CheckboxProps): JSX.Element => {
  const { ref } = useCSSVariable({
    '--react-stroke-color': isDisable ? 'gray' : color,
    '--react-fill-color': isChecked
      ? isDisable
        ? 'gray'
        : color
      : 'transparent',
    '--react-polyline-color': isChecked
      ? isDisable
        ? 'gray'
        : getLuminance(color) < 0.5
          ? 'rgba(255,255,255,0.7)'
          : 'rgba(0,0,0,0.7)'
      : 'transparent'
  })

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      onClick={() => {
        setIsChecked(!isChecked)
      }}
    >
      <div>
        <svg width='24' height='24'>
          <rect x='4' y='4' width='16' height='16' strokeWidth='0.8' />

          {isChecked && (
            <polyline
              points='5,12 10,17 19,8'
              strokeWidth='1.5'
              fill='transparent'
            />
          )}

          {isDisable && (
            <line
              x1='2'
              y1='22'
              x2='22'
              y2='2'
              strokeWidth='1'
              fill='transparent'
            />
          )}

          <line
            x1='0'
            y1='1'
            x2='4'
            y2='1'
            strokeWidth='2'
            fill='transparent'
          />

          <line
            x1='4'
            y1='0'
            x2='24'
            y2='0'
            strokeWidth='1'
            fill='transparent'
          />

          <line
            x1='0'
            y1='4'
            x2='0'
            y2='16'
            strokeWidth='1'
            fill='transparent'
          />

          <line
            x1='0'
            y1='18'
            x2='0'
            y2='20'
            strokeWidth='1'
            fill='transparent'
          />

          <line
            x1='0'
            y1='24'
            x2='20'
            y2='24'
            strokeWidth='1'
            fill='transparent'
          />

          <line
            x1='20'
            y1='23'
            x2='24'
            y2='23'
            strokeWidth='1.5'
            fill='transparent'
          />

          <line x1='24' y1='4' x2='24' y2='20' fill='transparent' />
        </svg>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Checkbox = React.memo(CheckboxComponent, isEqual)
