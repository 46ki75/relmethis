import React, { Suspense, useMemo } from 'react'

import { remark } from 'remark'
import gfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import inlineStyleRemarkPlugin from './plugins/inlineStyleRemarkPlugin'

import type { Mdast as MdastType } from './Mdast'
import { BlockFallback } from '../fallback/BlockFallback'

const Mdast = React.lazy(() =>
  import('./Mdast').then((module) => ({
    default: module.Mdast
  }))
) as React.ComponentType<React.ComponentProps<typeof MdastType>>

import isEqual from 'react-fast-compare'

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
  const processor = remark()
    .use(gfm)
    .use(remarkMath)
    .use(remarkDirective)
    .use(inlineStyleRemarkPlugin)
    .parse(markdown)
  return processor
}

const MarkdownComponent = ({
  markdown,
  isDark,
  enableTableOfContents = true
}: MarkdownProps) => {
  const mdast = useMemo(() => parseMarkdownToMdast(markdown), [markdown])

  return (
    <Suspense fallback={<BlockFallback />}>
      <Mdast
        mdast={mdast.children}
        isDark={isDark}
        enableTableOfContents={enableTableOfContents}
      />
    </Suspense>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Markdown = React.memo(MarkdownComponent, isEqual)
