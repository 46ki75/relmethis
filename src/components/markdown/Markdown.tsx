/** @jsxImportSource @emotion/react */

import React, { useMemo } from 'react'

import { remark } from 'remark'
import gfm from 'remark-gfm'
import { Mdast } from './Mdast'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MarkdownProps {
  markdown: string
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

const parseMarkdownToMdast = (markdown: string) => {
  const processor = remark().use(gfm).parse(markdown)
  return processor
}

const MarkdownComponent = ({
  markdown,
  isDark,
  enableTableOfContents = true
}: MarkdownProps) => {
  const mdast = useMemo(() => parseMarkdownToMdast(markdown), [markdown])

  return (
    <>
      <Mdast
        mdast={mdast.children}
        isDark={isDark}
        enableTableOfContents={enableTableOfContents}
      />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Markdown = React.memo(MarkdownComponent)
