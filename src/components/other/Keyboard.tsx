import React from 'react'
import { Kbd, KeyboardKey } from './Kbd'

import isEqual from 'react-fast-compare'

import styles from './Keyboard.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface KeyboardProps {
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

const keys: KeyboardKey[] = ['2', '3', '4', '5', '6', '7', '8', '9', '0']

const KeyboardComponent = ({ isDark = false }: KeyboardProps) => {
  return (
    <>
      <div className={styles.wrapper}>
        {keys.map((key) => (
          <Kbd key={key} mainKey={key} isDark={isDark} />
        ))}
      </div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Keyboard = React.memo(KeyboardComponent, isEqual)
