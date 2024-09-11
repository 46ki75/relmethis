import React, { ReactNode, useEffect, useState } from 'react'

import { Definition, RootContent } from 'mdast'

import { visit } from 'unist-util-visit'

// components
import { BlockFallback } from '../fallback/BlockFallback'

import { RenderMdast } from './RenderMdast'
import { TableOfContents } from '../navigation/TableOfContents'
import { Divider } from '../typography/Divider'
import isEqual from 'react-fast-compare'

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

    const { markdownComponent, headings, footnoteComponent } = RenderMdast({
      mdastNodes: mdast,
      definitions,
      isDark,
      footnoteComponent: []
    })

    setComponents(
      enableTableOfContents
        ? [
            <TableOfContents headings={headings} isDark={isDark} />,
            markdownComponent,
            footnoteComponent.length > 0 ? <Divider /> : <></>,
            footnoteComponent
          ]
        : [
            markdownComponent,
            footnoteComponent.length > 0 ? <Divider /> : <></>,
            footnoteComponent
          ]
    )
  }, [enableTableOfContents, isDark, mdast])

  return <article>{components}</article>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Mdast = React.memo(MdastComponent, isEqual)
