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
  size?: number

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const CubeComponent = ({ style, size = 128, isDark = false }: CubeProps) => {
  const commonTranslateZ = `translateZ(${size / 2}px)`

  const faces = [
    { name: 'front', rotate: '' },
    { name: 'back', rotate: 'rotateY(180deg)' },
    { name: 'left', rotate: 'rotateY(-90deg)' },
    { name: 'right', rotate: 'rotateY(90deg)' },
    { name: 'top', rotate: 'rotateX(90deg)' },
    { name: 'bottom', rotate: 'rotateX(-90deg)' }
  ]

  return (
    <div
      className={styles.cube}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style
      }}
    >
      {faces.map((face) => (
        <div
          key={face.name}
          className={styles.face}
          style={{
            transform: `${face.rotate} ${commonTranslateZ}`,
            backgroundColor: isDark
              ? 'rgba(0,0,0,0.2)'
              : 'rgba(255,255,255,0.2)',
            borderColor: !isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'
          }}
        ></div>
      ))}
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Cube = React.memo(CubeComponent, isEqual)
