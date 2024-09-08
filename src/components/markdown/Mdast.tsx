/** @jsxImportSource @emotion/react */

import React, { ReactNode, useEffect, useState } from 'react'

import { Definition, RootContent } from 'mdast'

import { visit } from 'unist-util-visit'

// components
import { BlockFallback } from '../fallback/BlockFallback'

import { RenderMdast } from './RenderMdast'
import { TableOfContents } from '../navigation/TableOfContents'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MdastProps {
  mdast: RootContent[]
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Determines whether to display the table of contents
   */
  enableTableOfContents?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MdastComponent = ({
  mdast,
  isDark = false,
  enableTableOfContents = true
}: MdastProps) => {
  const [components, setComponents] = useState<ReactNode[]>([<BlockFallback />])

  useEffect(() => {
    const definitions: Definition[] = []

    for (const node of mdast) {
      visit(node, 'definition', (definition) => {
        definitions.push(definition)
      })
    }

    const { markdownComponent, headings } = RenderMdast({
      mdastNodes: mdast,
      definitions,
      isDark
    })

    setComponents(
      enableTableOfContents
        ? [
            <TableOfContents headings={headings} isDark={isDark} />,
            ...markdownComponent
          ]
        : markdownComponent
    )
  }, [enableTableOfContents, isDark, mdast])

  return <>{components}</>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Mdast = React.memo(MdastComponent)
