import React from 'react'
import { Helmet } from 'react-helmet'

import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import css from './RectangleWave.css?inline'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface RectangleWaveProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  color?: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const RectangleWaveComponent = ({
  isDark = false,
  color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
}: RectangleWaveProps): JSX.Element => {
  const CLASSNAME = 'com-46ki75-react-relmethis-rectangle-wave'

  const { ref } = useCSSVariable({ '--react-color': color })

  return (
    <>
      <Helmet>
        <style key={CLASSNAME}>{css}</style>
      </Helmet>
      <div ref={ref} className={CLASSNAME}></div>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const RectangleWave = React.memo(RectangleWaveComponent, isEqual)
