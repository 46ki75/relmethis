'use client'

import React from 'react'

import { DotLoadingIcon } from '../icon/DotLoadingIcon'

import isEqual from 'react-fast-compare'

import styles from './BlockFallback.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BlockFallbackProps {
  style?: React.CSSProperties
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BlockFallbackComponent = ({ style }: BlockFallbackProps) => {
  return (
    <div style={style} className={styles.wrapper}>
      <DotLoadingIcon size={32} color='rgba(128,128,128,0.5)' />
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const BlockFallback = React.memo(BlockFallbackComponent, isEqual)
