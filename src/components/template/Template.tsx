import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './Template.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TemplateProps {
  style: React.CSSProperties
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const TemplateComponent = ({ style }: TemplateProps) => {
  return (
    <span className={styles.wrapper} style={style}>
      Template
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Template = React.memo(TemplateComponent, isEqual)
