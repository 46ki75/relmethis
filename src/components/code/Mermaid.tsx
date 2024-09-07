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
  /**
   * - `strict`: (default) HTML tags in the text are encoded and click functionality is disabled.
   * - `antiscript`: HTML tags in text are allowed (only script elements are removed)
   *                 and click functionality is enabled.
   * - `loose`: HTML tags in text are allowed and click functionality is enabled.
   * - `sandbox`: With this security level, all rendering takes place in a sandboxed iframe.
   *              This prevents any JavaScript from running in the context.
   *              This may hinder interactive functionality of the diagram,
   *              like scripts, popups in the sequence diagram, links to other tabs or targets, etc.
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
          securityLevel
        })

        await mermaid.run({ nodes: [ref.current] })

        setIsLoading(false)
      }
    })()
  }, [code, isDark, securityLevel])

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
