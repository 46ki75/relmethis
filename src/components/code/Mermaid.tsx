/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import mermaid from 'mermaid'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const mermaidStyle = ({ isLoading }: { isLoading: boolean }) => css`
  opacity: ${isLoading ? 0 : 1};
  transition: opacity 200ms ease-in-out 100ms;
`

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
}
// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MermaidComponent = ({ code, isDark }: MermaidProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    void (async () => {
      if (ref.current != null) {
        setIsLoading(true)

        ref.current.innerHTML = code

        mermaid.initialize({
          startOnLoad: true,
          theme: isDark ? 'dark' : 'base',
          darkMode: isDark,
          securityLevel: 'loose'
        })

        await mermaid.run({ nodes: [ref.current] })

        setIsLoading(false)
      }
    })()
  }, [code, isDark])

  return (
    <div ref={ref} key={code + isDark} css={mermaidStyle({ isLoading })}></div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Mermaid = React.memo(MermaidComponent)
