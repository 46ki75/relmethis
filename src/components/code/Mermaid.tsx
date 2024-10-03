import React, { useEffect, useState } from 'react'

import mermaid from 'mermaid'

import { Image } from '../media/Image'
import { BlockFallback } from '../fallback/BlockFallback'

import isEqual from 'react-fast-compare'

import styles from './Mermaid.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { darken } from 'polished'

// # --------------------------------------------------------------------------------
//
// theme
//
// # --------------------------------------------------------------------------------

const THEME_GIT = (isDark?: boolean) => ({
  git0: '#b8a36e',
  git1: '#59b57c',
  git2: '#6987b8',
  git3: '#9771bd',
  git4: '#c9699e',
  git5: '#b36472',
  git6: '#bf7e71',
  git7: '#868e9c',
  gitBranchLabel0: 'rgba(255,255,255,0.7)',
  gitBranchLabel1: 'rgba(255,255,255,0.7)',
  gitBranchLabel2: 'rgba(255,255,255,0.7)',
  gitBranchLabel3: 'rgba(255,255,255,0.7)',
  gitBranchLabel4: 'rgba(255,255,255,0.7)',
  gitBranchLabel5: 'rgba(255,255,255,0.7)',
  gitBranchLabel6: 'rgba(255,255,255,0.7)',
  gitBranchLabel7: 'rgba(255,255,255,0.7)',
  gitBranchLabel8: 'rgba(255,255,255,0.7)',
  gitBranchLabel9: 'rgba(255,255,255,0.7)',
  commitLabelColor: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
  commitLabelBackground: 'transparent',
  tagLabelColor: 'rgba(0,0,0,0.7)',
  tagLabelBackground: 'rgba(255,255,255,0.7)',
  tagLabelBorder: 'rgba(0,0,0,0.7)',
  gitInv0: darken(0.1, '#b8a36e'),
  gitInv1: darken(0.1, '#59b57c'),
  gitInv2: darken(0.1, '#6987b8'),
  gitInv3: darken(0.1, '#9771bd'),
  gitInv4: darken(0.1, '#c9699e'),
  gitInv5: darken(0.1, '#b36472'),
  gitInv6: darken(0.1, '#bf7e71'),
  gitInv7: darken(0.1, '#868e9c')
})

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MermaidProps {
  /**
   * Code written in Mermaid syntax
   */
  code: string
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Security level for Mermaid
   */
  securityLevel?: 'loose' | 'strict' | 'antiscript' | 'sandbox' | undefined
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MermaidComponent = ({
  code,
  isDark,
  securityLevel = 'loose'
}: MermaidProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [svgBase64, setSvgBase64] = useState<string | null>(null)

  useEffect(() => {
    const renderChart = async () => {
      try {
        setIsLoading(true)

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel,
          themeVariables: {
            primaryTextColor: isDark
              ? 'rgba(255,255,255,0.6)'
              : 'rgba(0,0,0,0.6)',
            primaryColor: 'rgba(255,255,255,0.7)',
            ...THEME_GIT(isDark)
          }
        })

        const { svg } = await mermaid.render('mermaid-svg', code)

        const base64 = btoa(
          encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        )
        setSvgBase64(`data:image/svg+xml;base64,${base64}`)
        setIsLoading(false)
      } catch (error) {
        console.error('Error rendering Mermaid chart:', error)
        setIsLoading(false)
      }
    }

    renderChart()
  }, [code, isDark, securityLevel])

  const { ref } = useCSSVariable({ '--react-opacity': isLoading ? 0 : 1 })

  if (isLoading) {
    return <BlockFallback />
  }

  return svgBase64 ? (
    <div className={styles.mermaid} ref={ref}>
      <Image src={svgBase64} alt='Mermaid Chart' />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        color: 'rgba(128,128,128,0.5)'
      }}
    >
      <div style={{ margin: '2rem' }}>Preview not available</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Mermaid = React.memo(MermaidComponent, isEqual)
