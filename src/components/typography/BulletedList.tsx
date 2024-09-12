import React, { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

import isEqual from 'react-fast-compare'

import reactElementToJSXString from 'react-element-to-jsx-string'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useMergeRefs } from '../../hooks/useMergeRefs'

import styles from './BulletedList.module.scss'

function svgToBase64(svg: string): string {
  const base64 = btoa(svg)
  return `data:image/svg+xml;base64,${base64}`
}

const bulletedListIcon1 = svgToBase64(
  reactElementToJSXString(
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      width='12px'
      height='12px'
    >
      <path
        fill='#449763'
        opacity='0.8'
        d='M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z'
      />
    </svg>
  )
)

const bulletedListIcon2 = svgToBase64(
  reactElementToJSXString(
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='12px'
      height='12px'
      stroke='#449763'
      fill='transparent'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
      />
    </svg>
  )
)

const bulletedListIcon3 = svgToBase64(
  reactElementToJSXString(
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      width='12px'
      height='12px'
      stroke='#449763'
      fill='#449763'
    >
      <path
        fillRule='evenodd'
        d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
        clipRule='evenodd'
      />
    </svg>
  )
)

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BulletedListProps {
  children: ReactNode
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

const BulletedListComponent: React.FC<BulletedListProps> = ({
  children,
  isDark = false
}) => {
  const { ref: a, inView } = useInView()
  const { ref: b } = useCSSVariable({
    '--react-color-fg': isDark
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.7)',
    '--react-color-bg': isDark
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(255, 255, 255, 0.7)',
    '--react-color': inView ? 1 : 0,
    '--react-marker-1': `url('${bulletedListIcon1}')`,
    '--react-marker-2': `url('${bulletedListIcon2}')`,
    '--react-marker-3': `url('${bulletedListIcon3}')`
  })
  const ref = useMergeRefs(a, b)

  return (
    <ul className={styles.wrapper} ref={ref}>
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const BulletedList = React.memo(BulletedListComponent, isEqual)
