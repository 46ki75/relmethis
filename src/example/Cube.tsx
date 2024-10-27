import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './Cube.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface CubeProps {
  style?: React.CSSProperties
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CubeComponent = ({ style }: CubeProps) => {
  return (
    <div className={styles.cube} style={style}>
      <div className={styles.face + ' ' + styles.front}>Front</div>
      <div className={styles.face + ' ' + styles.back}>Back</div>
      <div className={styles.face + ' ' + styles.left}>Left</div>
      <div className={styles.face + ' ' + styles.right}>Right</div>
      <div className={styles.face + ' ' + styles.top}>Top</div>
      <div className={styles.face + ' ' + styles.bottom}>Bottom</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Cube = React.memo(CubeComponent, isEqual)
