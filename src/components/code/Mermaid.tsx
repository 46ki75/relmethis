import React, { useEffect, useState } from 'react'

import mermaid from 'mermaid'

import { Image } from '../media/Image'
import { BlockFallback } from '../fallback/BlockFallback'

import isEqual from 'react-fast-compare'

import styles from './Mermaid.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

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
          securityLevel
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
