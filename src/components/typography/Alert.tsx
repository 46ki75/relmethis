'use client'

import {
  ChartBarSquareIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import isEqual from 'react-fast-compare'
import { darken, lighten, rgba } from 'polished'
import React, { useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './Alert.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution'

export interface AlertProps {
  /**
   * Child components
   */
  children: React.ReactNode
  /**
   * Type of alert
   */
  type?: AlertType
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

const colors: Record<AlertType, string> = {
  note: '#6987b8',
  tip: '#59b57c',
  important: '#9771bd',
  warning: '#b8a36e',
  caution: '#b36472'
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const AlertComponent = ({
  children,
  type = 'note',
  isDark = false
}: AlertProps) => {
  const color = useMemo(() => colors[type], [type])

  const icon = useMemo(() => {
    const style = { width: 20, height: 20 }
    switch (type) {
      case 'note':
        return <ChartBarSquareIcon style={style} />
      case 'tip':
        return <LightBulbIcon style={style} />
      case 'important':
        return <ShieldCheckIcon style={style} />
      case 'warning':
        return <ExclamationTriangleIcon style={style} />
      case 'caution':
      default:
        return <XCircleIcon style={style} />
    }
  }, [type])

  const { ref: a, inView } = useInView()

  const { ref: b } = useCSSVariable({
    '--react-background-color': lighten(0.15, rgba(color, 0.2)),
    '--react-border-color': darken(0.1, color),
    '--react-position': `${inView ? 0 : -100}%`,
    '--react-selection-color': isDark
      ? darken(0.3, color)
      : lighten(0.3, color),
    '--react-selection-background-color': isDark
      ? lighten(0.1, color)
      : darken(0.1, color)
  })

  const ref = useMergeRefs(a, b)

  return (
    <div className={styles.alert} ref={ref}>
      <div className={styles['alert__header']}>
        {icon}
        <div>{type.toUpperCase()}</div>
      </div>
      <div className={styles['alert__children']}>{children}</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Alert = React.memo(AlertComponent, isEqual)
